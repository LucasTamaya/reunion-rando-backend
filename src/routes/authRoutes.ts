import express, { Router } from "express";

import {
  registerController,
  loginController,
} from "../controllers/authControllers";

export const router: Router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
