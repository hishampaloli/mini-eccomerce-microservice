import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import {
  NotAuthorizedError,
  NotFoundError,
  errorHandler,
} from "@hpshops/common/build";
import { GetUsersRouter } from "./router/getUsers";

const app = express();

const router = express.Router();

app.set("trust proxy", true);
app.use(json());

app.use(GetUsersRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
