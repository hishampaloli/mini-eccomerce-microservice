import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  protect,
  NotFoundError,
  isOwner,
  isAdmin,
} from "@hpshops/common";
import { User } from "../models/user";

const router = express.Router();

router.get(
  "/api/admin/allusers",
  protect,
  isAdmin,
  async (req: Request, res: Response) => {
    const user = await User.find({});
    res.json(user);
  }
);

export { router as GetUsersRouter };
