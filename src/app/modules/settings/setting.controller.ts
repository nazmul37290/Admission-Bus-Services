import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { settingServices } from "./setting.services";

const createSetting = catchAsync(async (req: Request, res: Response) => {
  const settingData = req.body;
  const file = req.file;
  if (file) {
    settingData.siteLogo = `${file?.path}`;
  }
  const result = await settingServices.createSettingsIntoDb(settingData);
  res.status(200).json({
    success: true,
    message: "Settings created successfully",
    data: result,
  });
});
const getAllSettings = catchAsync(async (req: Request, res: Response) => {
  const result = await settingServices.getSettingsFromDb();
  if (result) {
    res.status(200).json({
      success: true,
      message: "Settings retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No settings found",
      data: null,
    });
  }
});

const updateSettings = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  const file = req.file;
  if (file) {
    updatedData.siteLogo = `${file?.path}`;
  }
  const result = await settingServices.updateSettingsIntoDb(updatedData);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Setting not found",
      data: null,
    });
  }
});

export const SettingsController = {
  createSetting,
  getAllSettings,
  updateSettings,
};
