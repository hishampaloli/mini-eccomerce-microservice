import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, protect } from "@hpshops/common";
import generateToken from "../utils/jsonwebtoken";
import { User } from "../models/users";

const router = express.Router();

router.get("/api/auth/currentuser", protect, async (req, res) => {
  res.json(req.currentUser);
});

export { router as currentUserRoute };
