import express from "express";
import { UnitController } from "./unit.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UnitValidations } from "./unit.validation";

const router = express.Router();

router.post(
  "/create-unit",
  validateRequest(UnitValidations.createUnitValidationSchema),
  UnitController.createUnit
);
router.get("/", UnitController.getAllUnits);
router.get("/:unitId", UnitController.getSingleUnit);
router.patch(
  "/:unitId",
  validateRequest(UnitValidations.updateUnitValidationSchema),
  UnitController.updateUnit
);
router.delete("/:unitId", UnitController.deleteUnit);

export const UnitRouter = router;
