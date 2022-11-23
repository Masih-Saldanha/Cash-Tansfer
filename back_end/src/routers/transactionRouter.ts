import { Router } from "express";

import { validateToken } from "../middlewares/tokenMiddleware.js";
import transactionController from "../controllers/transactionController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import transactionSchema from "../schemas/transactionSchema.js";

const transactionRouter = Router();

transactionRouter.use(validateToken);
transactionRouter.get("/balance/", transactionController.checkBalance);
transactionRouter.post("/transfer/", validateSchema(transactionSchema.transaction), transactionController.cashTransfer);

export default transactionRouter;