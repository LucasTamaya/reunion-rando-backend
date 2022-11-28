import express, { Router } from "express";

import { addActivityController } from "../controllers/activityControllers";
import { jwtAuth } from "../middleware/jwtAuth";

export const router: Router = express.Router();

router.post("/activity", jwtAuth, addActivityController);
