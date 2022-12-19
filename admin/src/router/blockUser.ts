import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  currentUser,
  requireAuth,
  isAdmin,
} from "@hpshops/common";
import { User } from "../models/user";
import { UserBlockPublisher } from "../events/publisher.ts/user-block-event";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.patch(
  "/api/admin/block/:id",
  currentUser,
  requireAuth,
  isAdmin,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (user) {
        user.isBlocked = !user.isBlocked;
        await user.save();

        await new UserBlockPublisher(natsWrapper.client).publish({
          userId: user.id,
          isBlocked: user.isBlocked,
        });
      } else {
        throw new NotFoundError();
      }

      res.json(user);
    } catch (error) {
      res.status(501).json(error);
    }
  }
);

export { router as BlockUserRouter };
