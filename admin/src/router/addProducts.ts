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

router.post(
  "/api/admin/product",
  [
    body("title").trim().notEmpty().withMessage("Please provide a title"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Please provide a Description"),
    body("stock")
      .isNumeric()
      .trim()
      .notEmpty()
      .withMessage("Please provide a valid stock"),
    body("price")
      .isNumeric()
      .trim()
      .notEmpty()
      .withMessage("Please provide a valid price"),
    body("image")
      .trim()
      .notEmpty()
      .withMessage("Please provide a valid Image URL"),
  ],
  validateRequest,
  protect,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const { title, description, stock, price, image } = req.body;

      const product = Product.build({
        title,
        description,
        stock,
        price,
        image,
      });

      await product.save();

      res.json(product);
    } catch (error) {}
  }
);

export { router as addProductRouter };
