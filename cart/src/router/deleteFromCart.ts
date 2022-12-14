import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  protect,
  NotFoundError,
  isOwner,
  isAdmin,
} from "@hpshops/common/build";
import { Product } from "../models/products";
import { User } from "../models/user";

const router = express.Router();

router.delete("/api/cart/:id", protect, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) throw new NotFoundError();

    const user = await User.findById(req.currentUser?.id.id);

    if (!user) throw new NotFoundError();

    const arr = user.cart.filter((el: any) => {
      return el.product + 1 !== id + 1;
    });

    user.cart = arr;
    await user?.save();

    res.json(user);
  } catch (error) {}
});

export { router as deleteFromCartRouter };
