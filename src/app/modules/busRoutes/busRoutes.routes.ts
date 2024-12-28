import express from "express";
import { BusRouteController } from "./busRoutes.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BusRouteValidations } from "./busRoutes.validation";

const router = express.Router();

router.post(
  "/create-bus-route",
  validateRequest(BusRouteValidations.createBusRouteValidationSchema),
  BusRouteController.createBusRoutes
);

export const BusRouteRouter = router;
