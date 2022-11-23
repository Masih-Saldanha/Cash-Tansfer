import { Request, Response } from "express";

import { TokenData } from "../middlewares/tokenMiddleware.js";
import { TransferData } from "../schemas/transactionSchema.js";
import transactionService from "../services/transactionService.js";

async function checkBalance(req: Request, res: Response) {
    const tokenData: TokenData = res.locals.userDataFromToken;

    const balance = await transactionService.checkBalance(tokenData);

    res.status(200).send({ balance });
};

async function cashTransfer(req: Request, res: Response) {
    const tokenData: TokenData = res.locals.userDataFromToken;
    const transferData: TransferData = req.body;

    await transactionService.cashTransfer(tokenData, transferData);

    res.sendStatus(200);
};

const transactionController = {
    checkBalance,
    cashTransfer,
};

export default transactionController;