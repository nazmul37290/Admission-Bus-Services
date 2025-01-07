import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.services";

const checkUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await authServices.checkUserFromDb(user);

  res.status(200).json({
    success: true,
    message: "User authenticated successfully",
    data: result,
  });
});

const verify = (req: Request, res: Response) => {
  res.status(200).json({ message: "Protected data accessed!" });
};
export const AuthController = {
  checkUser,
  verify,
};
