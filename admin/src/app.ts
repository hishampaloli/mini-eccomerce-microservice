import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  NotAuthorizedError,
  NotFoundError,
  errorHandler,
} from "@hpshops/common/build";
import { GetUsersRouter } from "./router/getUsers";
import { BlockUserRouter } from "./router/blockUser";
import { addProductRouter } from "./router/addProducts";
import { getProductRouter } from "./router/getProducts";
import { updateProductRouter } from "./router/updateProducts";
import { deleteProductRouter } from "./router/deleteProducts";

const app = express();

const router = express.Router();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.use(GetUsersRouter);
app.use(BlockUserRouter);
app.use(addProductRouter);
app.use(getProductRouter);
app.use(updateProductRouter)
app.use(deleteProductRouter)


app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
