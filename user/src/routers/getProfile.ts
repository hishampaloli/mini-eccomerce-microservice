import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validateRequest, protect } from "@hpshops/common";

const router = express.Router();

router.get('/api/user/hi', async(req, res) => {
console.log(23434);

    res.json({hi: 'sdf'})
})


export {router as GetProfileRouter}