import { Router } from "express";

import { validateToken } from "../middlewares/tokenMiddleware.js";
import transactionController from "../controllers/transactionController.js";

const transactionRouter = Router();

transactionRouter.use(validateToken);
transactionRouter.get("/balance/", transactionController.checkBalance);

export default transactionRouter;