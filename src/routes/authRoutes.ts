import express, { Router } from "express";

import {
  RegisterController,
  LoginController,
} from "../controllers/authControllers";

export const router: Router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
