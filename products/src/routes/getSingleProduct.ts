import express, { Request, Response } from "express";
import { body, validationResult, param } from "express-validator";
import {
  validateRequest,
  protect,
  NotFoundError,
  isOwner,
  isAdmin,
} from "@hpshops/common";
import { Product } from "../models/products";

const router = express.Router();

router.get(
  "/api/product/:id",
  [param("id").isMongoId().withMessage("Invalid URL")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) throw new NotFoundError();

    res.json(product);
  }
);

export { router as getSingleProductsRouter };
