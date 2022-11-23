import { Request, Response } from "express";

import { UserData } from "../repositories/authRepository.js";
import authService from "../services/authService.js";

async function signUp(req: Request, res: Response) {
    const userData: UserData = req.body

    await authService.registerUser(userData);

    res.sendStatus(201);
};

const authController = {
    signUp,
};

export default authController;