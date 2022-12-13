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

const router = express.Router();

router.get(
  "/api/product/allProducts",
  async (req: Request, res: Response) => {
    const user = await Product.find({});
    res.json(user);
  }
);

export { router as getAllProductsRouter };
