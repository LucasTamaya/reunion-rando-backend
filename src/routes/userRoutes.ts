import express, { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

import {
  getUserRoleController,
  getAllProviderUsersController,
  getUserDataController,
  updateUserDataController,
} from "../controllers/userControllers";
import { jwtAuth } from "../middleware/jwtAuth";

export const router: Router = express.Router();

router.get("/user/role", jwtAuth, getUserRoleController);
router.get("/user/:id", jwtAuth, getUserDataController);
router.get("/users/prestataire", getAllProviderUsersController);
router.patch(
  "/user/:id",
  jwtAuth,
  upload.single("avatar"),
  updateUserDataController
);
