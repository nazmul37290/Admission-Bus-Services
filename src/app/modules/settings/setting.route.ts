import express from "express";
import { SettingsController } from "./setting.controller";
import validateRequest from "../../middlewares/validateRequest";
import { settingValidations } from "./setting.validation";
import { upload } from "../../utils/uploadFile";

const router = express.Router();

router.post(
  "/create-setting",
  upload.fields([{ name: "siteLogo" }, { name: "bannerImage" }]),
  validateRequest(settingValidations.settingValidationSchema),
  SettingsController.createSetting
);
router.get("/", SettingsController.getAllSettings);
router.patch(
  "/update-setting",
  upload.fields([{ name: "siteLogo" }, { name: "bannerImage" }]),
  validateRequest(settingValidations.settingValidationSchema),
  SettingsController.updateSettings
);

export const SettingRouter = router;
