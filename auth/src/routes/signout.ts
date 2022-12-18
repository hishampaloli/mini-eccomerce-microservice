import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/auth/signout", (req: Request, res: Response) => {
  req.session = null;
  res.status(200).send({ status: "signedOut" });
});

export { router as signOutRouter };
