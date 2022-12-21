import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  currentUser,
  requireAuth,
  NotFoundError,
  isOwner,
  isAdmin,
} from "@hpshops/common/build";
import { Product } from "../models/products";
import { User } from "../models/user";

const router = express.Router();

router.delete(
  "/api/cart/:id",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
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

      const userCart = await User.findById(req.currentUser?.id.id)
        .select("-cart._id")
        .populate("cart.product");

      if (userCart) {
        res.json(userCart.cart);
      }
    } catch (error) {}
  }
);

export { router as deleteFromCartRouter };
