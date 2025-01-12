import { AppError } from "../../errors/AppError";
import { userModel } from "../user/user.model";
import { TAuthUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../../config";
const checkUserFromDb = async (userData: TAuthUser) => {
  const { email, password } = userData;
  const user = await userModel.findOne({ email: email, isDeleted: false });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(401, "Invalid credentials");
  }

  const token = jwt.sign({ email }, config.jwt_token_secret as string, {
    expiresIn: "12h",
  });
  return { user, token };
};

export const authServices = {
  checkUserFromDb,
};
