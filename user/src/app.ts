import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import {
  NotAuthorizedError,
  NotFoundError,
  errorHandler,
} from "@hpshops/common/build";
import { GetProfileRouter } from "./routers/getProfile";

const app = express();

const router = express.Router();

app.set("trust proxy", true);
app.use(json());

app.use(GetProfileRouter);

app.all("*", async (req, res) => {
  console.log('kkkkkkkkkkkkkkk');
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
