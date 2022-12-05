import express, { Router } from "express";

import {
  getUserRoleController,
  getAllProviderUsersController,
  getUserDataController,
} from "../controllers/userControllers";
import { jwtAuth } from "../middleware/jwtAuth";

export const router: Router = express.Router();

router.get("/user/role", jwtAuth, getUserRoleController);
router.get("/user/:id", jwtAuth, getUserDataController);
router.get("/users/prestataire", getAllProviderUsersController);
