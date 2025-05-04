import mongoose from "mongoose";
import { TSetting } from "./setting.interface";
import { SettingModel } from "./setting.model";

const createUnitIntoDb = async (unitData: TSetting) => {
  const result = await SettingModel.create(unitData);
  return result;
};

const getAllUnitsFromDb = async (query: Record<string, unknown>) => {
  let queryObj;
  if (query) {
    queryObj = query;
  }

  const result = await SettingModel.aggregate([
    {
      $lookup: {
        from: "bus-routes", // The name of the Unit collection
        localField: "routeId", // Field in the Bus collection
        foreignField: "_id", // Field in the Unit collection
        as: "routeDetails", // Alias for the joined data
      },
    },
    {
      $unwind: "$routeDetails", // Flatten the array from $lookup
    },
    {
      $match: {
        ...(queryObj?.route
          ? {
              "routeDetails._id": new mongoose.Types.ObjectId(
                queryObj.route as string
              ),
            }
          : {}),
        isDeleted: false, // Match the unitId.id field
      },
    },
  ]);
  // const result = await unitModel.find({ isDeleted: false }).populate("routeId");
  return result;
};

const getSingleUnitFromDb = async (id: string) => {
  const result = await SettingModel.findOne({ id }).populate("routeId");
  return result;
};

const updateUnitIntoDb = async (id: string, payload: Partial<TSetting>) => {
  const result = await SettingModel.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

const deleteUnitFromDb = async (id: string) => {
  const result = await SettingModel.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const UnitServices = {
  createUnitIntoDb,
  getAllUnitsFromDb,
  getSingleUnitFromDb,
  updateUnitIntoDb,
  deleteUnitFromDb,
};
