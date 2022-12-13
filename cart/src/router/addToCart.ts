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

router.get("/api/cart/:id", protect, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) throw new NotFoundError();

    const user = await User.findById(req.currentUser?.id.id);

    if (!user) throw new NotFoundError();

    let flag = 0;
    user.cart.forEach((el: any) => {
      if (el.product + 1 === id + 1) {
        el.count++;
        flag = 1;
      }
    });

    if (flag === 0) {
      user.cart.push({ count: 1, product: id });
    }

    await user?.save();

    res.json(user);
  } catch (error) {}
});

export { router as addToCartRouter };
