import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import {
  NotAuthorizedError,
  NotFoundError,
  errorHandler,
} from "@hpshops/common";
import { GetProfileRouter } from "./routers/getProfile";
import { UpdateProfileRouter } from "./routers/updateProfile";
import cookieSession from "cookie-session";

const app = express();

const router = express.Router();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);



app.use(GetProfileRouter);
app.use(UpdateProfileRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
