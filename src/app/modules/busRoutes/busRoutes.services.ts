import { generateUniqueId } from "../../utils/generateUniqueId";
import { TBusRoutes } from "./busRoutes.interface";
import { busRoutesModel } from "./busRoutes.model";

const createBusRoutesIntoDb = async (busRouteData: TBusRoutes) => {
  busRouteData.id = await generateUniqueId(busRoutesModel);
  const result = busRoutesModel.create(busRouteData);
  return result;
};

const getAllBusRoutesFromDb = async () => {
  const result = await busRoutesModel.find({ isDeleted: false });
  return result;
};

const getSingleBusRouteFromDb = async (id: string) => {
  const result = await busRoutesModel.findOne({ id });
  return result;
};

const updateBusRouteIntoDb = async (
  id: string,
  payload: Partial<TBusRoutes>
) => {
  const result = await busRoutesModel.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

const deleteBusRouteFromDb = async (id: string) => {
  const result = await busRoutesModel.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const BusRouteServices = {
  createBusRoutesIntoDb,
  getAllBusRoutesFromDb,
  getSingleBusRouteFromDb,
  updateBusRouteIntoDb,
  deleteBusRouteFromDb,
};
