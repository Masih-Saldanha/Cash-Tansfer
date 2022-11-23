import { Router } from "express";

import authController from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import authSchema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup/", validateSchema(authSchema.userData), authController.signUp);
authRouter.post("/signin/", validateSchema(authSchema.userData), authController.signIn);

export default authRouter;