import { generateUniqueId } from "../../utils/generateUniqueId";
import { TBusRoutes } from "./busRoutes.interface";
import { busRoutesModel } from "./busRoutes.model";

const createBusRoutesIntoDb = async (busRouteData: TBusRoutes) => {
  busRouteData.id = await generateUniqueId(busRoutesModel);
  const result = busRoutesModel.create(busRouteData);
  return result;
};

export const BusRouteServices = {
  createBusRoutesIntoDb,
};
