import express from "express";
import { AuthController } from "./auth.controller";
import verifyToken from "../../middlewares/verifyToken";

const router = express.Router();

router.post("/login", AuthController.checkUser);

router.post("/check", verifyToken, AuthController.verify);
router.post("/forget-password", AuthController.createForgetToken);
router.post("/reset-password/:token", AuthController.resetPassword);
export const authRoutes = router;
