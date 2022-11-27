import { Request, Response } from "express";

import { UserData } from "../repositories/authRepository.js";
import authService from "../services/authService.js";

async function signUp(req: Request, res: Response) {
    const userData: UserData = req.body

    await authService.signUp(userData);

    res.sendStatus(201);
};

async function signIn(req: Request, res: Response) {
    const userData: UserData = req.body;

    const token = await authService.signIn(userData);

    res.status(200).send(token);
};

const authController = {
    signUp,
    signIn,
};

export default authController;