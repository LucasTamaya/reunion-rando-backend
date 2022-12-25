import express from "express";
import { registerController, loginController, logoutController, } from "../controllers/authControllers.js";
export const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
//# sourceMappingURL=authRoutes.js.map