import express, { Request, Response } from "express";
import { validateRequest, protect } from "@hpshops/common";

const router = express.Router();

router.get("/api/auth/currentuser", protect, async (req, res) => {
  res.json(req.currentUser);
});

export { router as currentUserRoute };
