import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const UserData = req.body;
  const result = await UserServices.createUserIntoDb(UserData);
  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDb();
  res.status(200).json({
    success: true,
    message: "All Users retrieved successfully",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.userId;
  const result = await UserServices.getSingleUserFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
      data: null,
    });
  }
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.userId;
  const updatedData = req.body;
  const result = await UserServices.updateUserIntoDb(id, updatedData);
  if (result) {
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
      data: null,
    });
  }
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.userId;
  const result = await UserServices.deleteUserFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
      data: null,
    });
  }
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
