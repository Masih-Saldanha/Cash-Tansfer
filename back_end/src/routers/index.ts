import { Router } from "express";

import testRouter from "./testRouter.js";

const router = Router();

router.use(testRouter);

export default router;