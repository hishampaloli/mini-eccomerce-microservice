import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import {
  NotAuthorizedError,
  NotFoundError,
  errorHandler,
} from "@hpshops/common/build";
import { GetUsersRouter } from "./router/getUsers";
import { BlockUserRouter } from "./router/blockUser";
import { addProductRouter } from "./router/addProducts";
import { getProductRouter } from "./router/getProducts";

const app = express();

const router = express.Router();

app.set("trust proxy", true);
app.use(json());

app.use(GetUsersRouter);
app.use(BlockUserRouter);
app.use(addProductRouter);
app.use(getProductRouter);


app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
