import express, { Request, Response } from "express";
import {
  validateRequest,
  // protect,
  currentUser,
  requireAuth,
} from "@hpshops/common";

const router = express.Router();

router.get(
  "/api/auth/currentuser",
  currentUser,
  requireAuth,
  async (req, res) => {
    res.json(req.currentUser);
  }
);

export { router as currentUserRoute };
