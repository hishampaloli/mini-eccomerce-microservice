import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  protect,
  NotFoundError,
  isOwner,
  isAdmin,
} from "@hpshops/common";
import { natsWrapper } from "../nats-wrapper";
import { Product } from "../models/products";

const router = express.Router();

router.get(
  "/api/admin/product/:productId",
 
  protect,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const product = await Product.findById(productId);


    //   await product.save();

      res.json(product);
    } catch (error) {}
  }
);

export { router as getProductRouter };
