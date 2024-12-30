import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { BusValidations } from "./bus.validation";
import { BusController } from "./bus.controller";

const router = express.Router();

router.post(
  "/create-bus",
  validateRequest(BusValidations.createBusValidationSchema),
  BusController.createBus
);
router.get("/", BusController.getAllBuses);
router.get("/:routeId", BusController.getSingleBus);
router.patch(
  "/:routeId",
  validateRequest(BusValidations.updateBusValidationSchema),
  BusController.updateBus
);
router.delete("/:routeId", BusController.deleteBus);

export const BusRouter = router;
