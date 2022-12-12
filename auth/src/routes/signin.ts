import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@hpshops/common";
import generateToken from "../utils/jsonwebtoken";
import { User } from "../models/users";
import { Password } from "../utils/password";

const router = express.Router();

router.post(
  "/api/auth/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must provide a passwors"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }

    const passwordsMatch = await Password.compare(
        existingUser.password,
        password
      );
  
      if (!passwordsMatch) {
        throw new BadRequestError("Invalid Credentials");
      }

      let token = generateToken(existingUser)

      res.json({
        existingUser,
        token
      })
  }
);

export {router as SignInRouter}
