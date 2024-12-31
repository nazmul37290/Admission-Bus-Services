import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UnitServices } from "./unit.services";

const createUnit = catchAsync(async (req: Request, res: Response) => {
  const unitData = req.body;
  const result = await UnitServices.createUnitIntoDb(unitData);
  res.status(200).json({
    success: true,
    message: "Unit created successfully",
    data: result,
  });
});
const getAllUnits = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await UnitServices.getAllUnitsFromDb(query);
  if (result?.length) {
    res.status(200).json({
      success: true,
      message: "All Units retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No Units found",
      data: null,
    });
  }
});
const getSingleUnit = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.unitId;
  const result = await UnitServices.getSingleUnitFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Unit retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Unit not found",
      data: null,
    });
  }
});

const updateUnit = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.unitId;
  const updatedData = req.body;
  const result = await UnitServices.updateUnitIntoDb(id, updatedData);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Unit updated successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Unit not found",
      data: null,
    });
  }
});
const deleteUnit = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.unitId;
  const result = await UnitServices.deleteUnitFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Unit deleted successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Unit not found",
      data: null,
    });
  }
});

export const UnitController = {
  createUnit,
  getAllUnits,
  getSingleUnit,
  updateUnit,
  deleteUnit,
};
