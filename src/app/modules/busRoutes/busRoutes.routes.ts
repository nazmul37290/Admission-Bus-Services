import express from "express";
import { BusRouteController } from "./busRoutes.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BusRouteValidations } from "./busRoutes.validation";
import { upload } from "../../utils/uploadFile";

const router = express.Router();

router.post(
  "/create-bus-route",
  upload.single("image"),
  validateRequest(BusRouteValidations.createBusRouteValidationSchema),
  BusRouteController.createBusRoutes
);
router.get("/", BusRouteController.getAllBusRoutes);
router.get("/:routeId", BusRouteController.getSingleBusRoute);
router.patch(
  "/:routeId",
  validateRequest(BusRouteValidations.updateBusRouteValidationSchema),
  BusRouteController.updateBusRoute
);
router.delete("/:routeId", BusRouteController.deleteBusRoute);

export const BusRouteRouter = router;
