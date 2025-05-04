import express from "express";
import { UnitController } from "./setting.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UnitValidations } from "./setting.validation";

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
