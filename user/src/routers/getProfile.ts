import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  
  protect,
  NotFoundError,
  isOwner,
} from "@hpshops/common";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/user/:userId", protect, isOwner, async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (user) {
    res.json(user);
  } else {
    throw new NotFoundError();
  }
});

export { router as GetProfileRouter };
