import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import { BusServices } from "./bus.services";

const createBus = catchAsync(async (req: Request, res: Response) => {
  const busData = req.body;
  const result = await BusServices.createBusIntoDb(busData);
  res.status(200).json({
    success: true,
    message: "Bus created successfully",
    data: result,
  });
});

const getAllBuses = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await BusServices.getAllBusesFromDb(query);
  if (result?.length) {
    res.status(200).json({
      success: true,
      message: "Buses retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No buses found",
      data: null,
    });
  }
});
const getSingleBus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.busId;
  const result = await BusServices.getSingleBusFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Bus retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Bus not found",
      data: null,
    });
  }
});

const updateBus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.busId;
  const updatedData = req.body;
  const result = await BusServices.updateBusIntoDb(id, updatedData);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Bus updated successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Bus not found",
      data: null,
    });
  }
});
const deleteBus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.busId;
  const result = await BusServices.deleteBusFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Bus deleted successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Bus not found",
      data: null,
    });
  }
});

export const BusController = {
  createBus,
  getAllBuses,
  getSingleBus,
  updateBus,
  deleteBus,
};
