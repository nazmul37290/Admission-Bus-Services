/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { BusRouteServices } from "./busRoutes.services";

const createBusRoutes = async (req: Request, res: Response) => {
  try {
    const busRouteData = req.body;
    const result = await BusRouteServices.createBusRoutesIntoDb(busRouteData);
    res.status(200).json({
      success: true,
      message: "Bus route created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const BusRouteController = {
  createBusRoutes,
};
