import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UserValidations.createUserValidationSchema),
  UserController.createUser
);
router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getSingleUser);
router.patch(
  "/:userId",
  validateRequest(UserValidations.updateUserValidationSchema),
  UserController.updateUser
);
router.delete("/:userId", UserController.deleteUser);

export const UserRoutes = router;
