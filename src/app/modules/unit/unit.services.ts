import { generateUniqueId } from "../../utils/generateUniqueId";
import { TUnit } from "./unit.interface";
import { unitModel } from "./unit.model";

const createUnitIntoDb = async (unitData: TUnit) => {
  unitData.id = await generateUniqueId(unitModel);
  const result = unitModel.create(unitData);
  return result;
};

const getAllUnitsFromDb = async () => {
  const result = await unitModel.find({ isDeleted: false }).populate("routeId");
  return result;
};

const getSingleUnitFromDb = async (id: string) => {
  const result = await unitModel.findOne({ id });
  return result;
};

const updateUnitIntoDb = async (id: string, payload: Partial<TUnit>) => {
  const result = await unitModel.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

const deleteUnitFromDb = async (id: string) => {
  const result = await unitModel.findOneAndUpdate(
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
