import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.services";
import { AuthRequest } from "../../middlewares/verifyToken";

const checkUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await authServices.checkUserFromDb(user);

  res.status(200).json({
    success: true,
    message: "User authenticated successfully",
    data: result,
  });
});

const verify = (req: AuthRequest, res: Response) => {
  console.log(req.user);
  res.status(200).json({
    success: true,
    message: "User is logged in !",
    data: req.user,
  });
};
export const AuthController = {
  checkUser,
  verify,
};
