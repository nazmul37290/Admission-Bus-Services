import { Request, Response } from "express";
import { BusRouteServices } from "./busRoutes.services";
import catchAsync from "../../utils/catchAsync";

const createBusRoutes = catchAsync(async (req: Request, res: Response) => {
  const busRouteData = req.body;
  const result = await BusRouteServices.createBusRoutesIntoDb(busRouteData);
  res.status(200).json({
    success: true,
    message: "Bus route created successfully",
    data: result,
  });
});

const getAllBusRoutes = catchAsync(async (req: Request, res: Response) => {
  const result = await BusRouteServices.getAllBusRoutesFromDb();
  res.status(200).json({
    success: true,
    message: "Bus routes retrieved successfully",
    data: result,
  });
});
const getSingleBusRoute = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.routeId;
  const result = await BusRouteServices.getSingleBusRouteFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Bus route retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Bus route not found",
      data: null,
    });
  }
});

const updateBusRoute = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.routeId;
  const updatedData = req.body;
  const result = await BusRouteServices.updateBusRouteIntoDb(id, updatedData);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Bus route updated successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Bus route not found",
      data: null,
    });
  }
});
const deleteBusRoute = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.routeId;
  const result = await BusRouteServices.deleteBusRouteFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Bus route deleted successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Bus route not found",
      data: null,
    });
  }
});

export const BusRouteController = {
  createBusRoutes,
  getAllBusRoutes,
  getSingleBusRoute,
  updateBusRoute,
  deleteBusRoute,
};
