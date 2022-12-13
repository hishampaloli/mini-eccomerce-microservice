import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  protect,
  NotFoundError,
  isOwner,
  isAdmin,
} from "@hpshops/common";
import { Product } from "../models/products";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/cart/", protect, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.currentUser?.id.id).select("-cart._id").populate('cart.product');

    res.json(user);
  } catch (error) {}
});

export { router as myCartRouter };
