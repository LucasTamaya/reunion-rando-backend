import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { getUserRoleController, getAllProviderUsersController, getUserDataController, updateUserDataController, getSavedActivitiesController, } from "../controllers/userControllers.js";
import { jwtAuth } from "../middleware/jwtAuth.js";
export const router = express.Router();
router.get("/user/role", jwtAuth, getUserRoleController);
router.get("/user/:id", jwtAuth, getUserDataController);
router.get("/users/prestataire", getAllProviderUsersController);
router.patch("/user/:id", jwtAuth, upload.single("avatar"), updateUserDataController);
router.get("/users/:userId/saved-activities", jwtAuth, getSavedActivitiesController);
//# sourceMappingURL=userRoutes.js.map