import bcrypt from "bcrypt";

import authRepository, { UserData } from "../repositories/authRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function registerUser(userData: UserData) {
    const userExist = await authRepository.findUserByUsername(userData.username);
    throwError(!!userExist, "Conflict", `The user: "${userData.username}" is already registered, try another one`);

    userData.password = bcrypt.hashSync(userData.password, +process.env.BCRYPT_SALT);

    await authRepository.registerUser(userData.username, userData.password);
};

const authService = {
    registerUser,
};

export default authService;