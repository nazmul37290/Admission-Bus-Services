import { TSetting } from "./setting.interface";
import { SettingModel } from "./setting.model";

const createSettingsIntoDb = async (settingsData: TSetting) => {
  const result = await SettingModel.create(settingsData);
  return result;
};

const getSettingsFromDb = async () => {
  const settings = await SettingModel.findOne();

  return settings;
};

const updateSettingsIntoDb = async (payload: Partial<TSetting>) => {
  const settings = await SettingModel.findOneAndUpdate(
    {}, // Update first document since we only have one
    payload,
    {
      new: true,
      upsert: true, // Create if doesn't exist
    }
  );
  return settings;
};

export const settingServices = {
  createSettingsIntoDb,
  getSettingsFromDb,
  updateSettingsIntoDb,
};
