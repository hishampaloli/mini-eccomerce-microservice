import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  protect,
  NotFoundError,
  isOwner,
  isAdmin,
  BadRequestError,
} from "@hpshops/common";
import { natsWrapper } from "../nats-wrapper";
import { Product } from "../models/products";

const router = express.Router();

router.put(
  "/api/admin/product/:productId",

  protect,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const { title, description, price, stock, image } = req.body;

      const product = await Product.findById(productId);
      console.log(product);

      if (!product) {        
        throw new NotFoundError();
      }

      if (title) product.title = title;
      if (description) product.description = description;
      if (price && !isNaN(price)) product.price = price;
      if (stock) product.stock = stock;
      if (image) product.image = image;

      await product.save();

      res.json(product);
    } catch (error) {
        res.json(error)
    }
  }
);

export { router as updateProductRouter };
