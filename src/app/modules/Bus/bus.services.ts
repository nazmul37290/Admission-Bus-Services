import { generateUniqueId } from "../../utils/generateUniqueId";
import { TBus } from "./Bus.interface";
import { busModel } from "./bus.model";

const createBusIntoDb = async (busData: TBus) => {
  busData.id = await generateUniqueId(busModel);
  const result = busModel.create(busData);
  return result;
};

const getAllBusesFromDb = async () => {
  const result = await busModel.find({ isDeleted: false });
  return result;
};

const getSingleBusFromDb = async (id: string) => {
  const result = await busModel.findOne({ id }).populate("unitId");
  return result;
};

const updateBusIntoDb = async (id: string, payload: Partial<TBus>) => {
  const result = await busModel.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

const deleteBusFromDb = async (id: string) => {
  const result = await busModel.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const BusServices = {
  createBusIntoDb,
  getAllBusesFromDb,
  getSingleBusFromDb,
  updateBusIntoDb,
  deleteBusFromDb,
};
