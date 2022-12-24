import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { addActivityController, getAllActivitiesController, getAllProviderActivitiesController, deleteActivityController, updateActivityController, saveActivityController, unsaveActivityController, } from "../controllers/activityControllers.js";
import { jwtAuth } from "../middleware/jwtAuth.js";
export const router = express.Router();
router.post("/activity", jwtAuth, upload.single("file"), addActivityController);
router.get("/activities", getAllActivitiesController);
router.get("/activities/:id", jwtAuth, getAllProviderActivitiesController);
router.delete("/activity/:id", jwtAuth, deleteActivityController);
router.patch("/activity/:id", jwtAuth, upload.single("file"), updateActivityController);
router.patch("/activity/:activityId/save", jwtAuth, saveActivityController);
router.patch("/activity/:activityId/unsave", jwtAuth, unsaveActivityController);
//# sourceMappingURL=activityRoutes.js.map