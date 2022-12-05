import express, { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

import {
  addActivityController,
  getAllActivitiesController,
} from "../controllers/activityControllers";
import { jwtAuth } from "../middleware/jwtAuth";

export const router: Router = express.Router();

router.post("/activity", jwtAuth, upload.single("file"), addActivityController);
router.get("/activities", getAllActivitiesController);
