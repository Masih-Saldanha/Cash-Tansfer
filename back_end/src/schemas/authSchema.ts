import Joi from "joi";

import { UserData } from "../repositories/authRepository.js";

const passwordRegex = /^(?=.*[1-9])(?=.*[A-Z])/;

const userData = Joi.object<UserData>({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).pattern(passwordRegex).required()
});

const authSchema = {
    userData,
};

export default authSchema;