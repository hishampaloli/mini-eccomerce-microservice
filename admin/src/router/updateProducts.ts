import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  currentUser,
  requireAuth,
  isAdmin,
  BadRequestError,
} from "@hpshops/common";
import { natsWrapper } from "../nats-wrapper";
import { Product } from "../models/products";
import { ProductUpdatedPublisher } from "../events/publisher.ts/product-updated-event";

const router = express.Router();

router.put(
  "/api/admin/product/:productId",
  currentUser,
  requireAuth,
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

      await new ProductUpdatedPublisher(natsWrapper.client).publish({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        id: product.id,
      });

      res.json(product);
    } catch (error) {
      res.json(error);
    }
  }
);

export { router as updateProductRouter };
