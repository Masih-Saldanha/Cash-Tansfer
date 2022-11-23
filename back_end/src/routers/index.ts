import { Router } from "express";
import authRouter from "./authRouter.js";

import testRouter from "./testRouter.js";

const router = Router();

router.use(testRouter);
router.use("/auth/", authRouter);

export default router;