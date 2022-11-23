import { Router } from "express";

import testController from "../controllers/testController.js";

const testRouter = Router();

testRouter.get("/", testController.test);

export default testRouter;