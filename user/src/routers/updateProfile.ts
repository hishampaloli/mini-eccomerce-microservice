import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { protect, NotFoundError, isOwner } from "@hpshops/common";
import { User } from "../models/user";
import { ProfileUpdatedPublisher } from "../events/publisher/profile-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/user/:userId",
  protect,
  isOwner,
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { address, image } = req.body;

    const user = await User.findById(userId);

    if (user) {
      if (address) {
        user.address = address;
      }
      if (image) {
        user.image = image;
      }

      await user.save();

      await new ProfileUpdatedPublisher(natsWrapper.client).publish({
        userId: user.id,
        address: user.address,
        image: user.image,
      });

      res.json(user);
    } else {
      throw new NotFoundError();
    }
  }
);

export { router as UpdateProfileRouter };
