import { Router } from "express";

import authController from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import authSchema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup/", validateSchema(authSchema.userDataSchema), authController.signUp);
authRouter.post("/signin/", validateSchema(authSchema.userDataSchema), authController.signIn);

export default authRouter;