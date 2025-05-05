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
  const existingSettings = await settingServices.getSettingsFromDb();
  if (!existingSettings) {
    res.status(404).json({
      success: false,
      message: "Settings not found",
      data: null,
    });
    return;
  }

  // Start with existing data
  const updatedData = existingSettings.toObject();

  // Handle non-file fields from req.body
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { siteLogo, bannerSection, ...restBody } = req.body;
  Object.assign(updatedData, restBody);

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // Handle logo update
  if (files?.siteLogo) {
    updatedData.siteLogo = files.siteLogo[0].path;
  }

  // Handle banner update
  if (files?.bannerImage) {
    updatedData.bannerSection = {
      ...existingSettings.bannerSection,
      ...req.body.bannerSection,
      image: files.bannerImage[0].path,
    };
  } else if (req.body.bannerSection) {
    updatedData.bannerSection = {
      ...existingSettings.bannerSection,
      ...req.body.bannerSection,
    };
  }

  const result = await settingServices.updateSettingsIntoDb(updatedData);
  res.status(200).json({
    success: true,
    message: "Settings updated successfully",
    data: result,
  });
  return;
});

export const SettingsController = {
  createSetting,
  getAllSettings,
  updateSettings,
};
