import { AppError } from "../../errors/AppError";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { TUser } from "./user.interface";
import { userModel } from "./user.model";

const createUserIntoDb = async (userData: TUser) => {
  const isAlreadyExists = await userModel.findOne({
    email: userData?.email,
    isDeleted: false,
  });
  if (isAlreadyExists) {
    throw new AppError(409, "User email already exists");
  }
  userData.id = await generateUniqueId(userModel);
  const result = await userModel.create(userData);
  return result;
};

const getAllUsersFromDb = async () => {
  const result = await userModel.find({ isDeleted: false });
  return result;
};

const getSingleUserFromDb = async (id: string) => {
  const result = await userModel.findOne({ id });
  return result;
};

const updateUserIntoDb = async (id: string, payload: Partial<TUser>) => {
  const result = await userModel.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

const deleteUserFromDb = async (id: string) => {
  const result = await userModel.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const UserServices = {
  createUserIntoDb,
  updateUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  deleteUserFromDb,
};
