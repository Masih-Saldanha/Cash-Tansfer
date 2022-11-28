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
    const transferData = req.body;

    await transactionService.cashTransfer(tokenData, transferData);

    res.sendStatus(200);
};

async function checkHistory(req: Request, res: Response) {
    const onlyCredited = String(req.query.onlyCredited);
    const onlyDebited = String(req.query.onlyDebited);
    const dateOrdered = String(req.query.dateOrdered);
    const tokenData: TokenData = res.locals.userDataFromToken;

    const history = await transactionService.checkHistory(tokenData.accountId, onlyCredited, onlyDebited, dateOrdered);

    res.status(200).send(history);
};

const transactionController = {
    checkBalance,
    cashTransfer,
    checkHistory,
};

export default transactionController;