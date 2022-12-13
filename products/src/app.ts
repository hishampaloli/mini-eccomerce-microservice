import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import {
  NotAuthorizedError,
  NotFoundError,
  errorHandler,
} from "@hpshops/common/build";
import { getAllProductsRouter } from "./routes/getAllProducts";
import { getSingleProductsRouter } from "./routes/getSingleProduct";


const app = express();

const router = express.Router();

app.set("trust proxy", true);
app.use(json());

app.use(getAllProductsRouter)
app.use(getSingleProductsRouter)

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
