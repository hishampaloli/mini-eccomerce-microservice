import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  currentUser,
  requireAuth,
  isAdmin,
} from "@hpshops/common";
import { natsWrapper } from "../nats-wrapper";
import { Product } from "../models/products";

const router = express.Router();

router.get(
  "/api/admin/product/:productId",

  currentUser,
  requireAuth,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const product = await Product.findById(productId);

      if (!product) throw new NotFoundError();

      res.json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export { router as getProductRouter };
