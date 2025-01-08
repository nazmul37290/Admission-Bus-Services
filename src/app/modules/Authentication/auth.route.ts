import express from "express";
import { AuthController } from "./auth.controller";
import verifyToken from "../../middlewares/verifyToken";

const router = express.Router();

router.post("/login", AuthController.checkUser);

router.post("/check", verifyToken, AuthController.verify);

export const authRoutes = router;
