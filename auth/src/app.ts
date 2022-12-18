import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { SignUpRouter } from "./routes/signup";
import { SignInRouter } from "./routes/signin";
import { currentUserRoute } from "./routes/currentuser";
import {
  NotAuthorizedError,
  NotFoundError,
  errorHandler,
} from "@hpshops/common/build";
import { signOutRouter } from "./routes/signout";

const app = express();

const router = express.Router();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.use(SignUpRouter);
app.use(SignInRouter);
app.use(signOutRouter)
app.use(currentUserRoute);

app.all("*", async (req, res) => {
  console.log(777777777777777);
  
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
