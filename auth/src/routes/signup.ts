import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest } from "@hpshops/common";

const router = express.Router();

router.post(
  "/api/auth/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must provide a passwors"),
    body("name").trim().notEmpty().withMessage("You must provide a name"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    
    res.send({ email, password, name });
  }
);

export { router as SignUpRouter };
