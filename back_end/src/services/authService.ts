import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authRepository, { UserData } from "../repositories/authRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function signUp(userData: UserData) {
    const userExist = await authRepository.findUserByUsername(userData.username);
    throwError(!!userExist, "Conflict", `The user: "${userData.username}" is already registered, try another one`);

    userData.password = bcrypt.hashSync(userData.password, +process.env.BCRYPT_SALT);

    await authRepository.registerUser(userData.username, userData.password);
};

async function signIn(userData: UserData) {
    const userExist = await authRepository.findUserByUsername(userData.username);
    throwError(!userExist, "Not Found", `The user: "${userData.username}", ins't registered yet`);

    const isPasswordRight = bcrypt.compareSync(userData.password, userExist.password);
    throwError(!isPasswordRight, "Not Acceptable", `The password sent doesn't match with username: "${userData.username}", try again`);

    const tokenData = {
        id: userExist.id,
        username: userExist.username,
        accountId: userExist.accounts.id,
        balance: userExist.accounts.balance,
    };
    const secretKey = process.env.JWT_TOKEN;
    const SECONDS = 60;
    const MINUTES = 60;
    const HOURS = 24;
    const DAYS = 1;
    const config = { expiresIn: SECONDS * MINUTES * HOURS * DAYS };
    const token = jwt.sign(tokenData, secretKey, config);

    console.log("secretKey: ", secretKey);
    console.log("SECONDS: ", SECONDS);
    console.log("MINUTES: ", MINUTES);
    console.log("HOURS: ", HOURS);
    console.log("DAYS: ", DAYS);
    console.log("config: ", config);
    console.log("token: ", token);

    return token;
};

const authService = {
    signUp,
    signIn,
};

export default authService;