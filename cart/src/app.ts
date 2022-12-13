import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import {
  NotAuthorizedError,
  NotFoundError,
  errorHandler,
} from "@hpshops/common/build";
import { addToCartRouter } from "./router/addToCart";
import { myCartRouter } from "./router/myCart";


const app = express();

const router = express.Router();

app.set("trust proxy", true);
app.use(json());

app.use(addToCartRouter)
app.use(myCartRouter)


app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
