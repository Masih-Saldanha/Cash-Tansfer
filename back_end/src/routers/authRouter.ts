import { Router } from "express";

import authController from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import authSchema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup/", validateSchema(authSchema.signUp), authController.signUp);

export default authRouter;