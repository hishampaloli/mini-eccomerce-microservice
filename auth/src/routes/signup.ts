import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@hpshops/common";
import generateToken from "../utils/jsonwebtoken";
import { User } from "../models/users";
import { UserRegisteredPublisher } from "../events/publishers/user-registered-publisher";
import { natsWrapper } from "../nats-wrapper";


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
  async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new BadRequestError("Email already in use !");
    }

    const user = User.build({ email, password, name });
    await user.save();
    const token: any = generateToken(user);

    await new UserRegisteredPublisher(natsWrapper.client).publish({
        userId: user.id,
        email: user.email,
        name: user.name,
        version: 233
      });

      console.log("REG PUBLISHED");
      

    res.status(201).json({
      email,
      password,
      name,
      token,
    });
  }
);

export { router as SignUpRouter };
