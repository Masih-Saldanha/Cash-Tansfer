import { Router } from "express";

import testRouter from "./testRouter.js";
import authRouter from "./authRouter.js";
import transactionRouter from "./transactionRouter.js";

const router = Router();

router.use(testRouter);
router.use("/auth/", authRouter);
router.use("/transaction/", transactionRouter);

export default router;