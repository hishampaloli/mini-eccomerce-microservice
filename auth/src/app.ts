import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { SignUpRouter } from "./routes/signup";
import {
  NotAuthorizedError,
  NotFoundError,
  errorHandler,
} from "@hpshops/common/build";

const app = express();

const router = express.Router();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);
console.log(23);

router.get('/hi', (req: Request, res: Response) => {
    console.log(34343434343);
    
    res.send('hi')
})


// app.use(SignUpRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
