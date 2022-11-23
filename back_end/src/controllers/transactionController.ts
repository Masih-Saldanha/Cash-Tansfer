import { Request, Response } from "express";

import { TokenData } from "../middlewares/tokenMiddleware.js";
import transactionService from "../services/transactionService.js";

async function checkBalance(req: Request, res: Response) {
    const tokenData: TokenData = res.locals.userDataFromToken;

    const balance = await transactionService.checkBalance(tokenData);

    res.status(200).send({ balance });
};

const transactionController = {
    checkBalance,
};

export default transactionController;