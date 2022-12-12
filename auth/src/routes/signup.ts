import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log(34343434343);
    
    res.send('hi')
})

export {router as SignUpRouter}