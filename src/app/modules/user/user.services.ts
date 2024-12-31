import { generateUniqueId } from "../../utils/generateUniqueId";
import { TUser } from "./user.interface";
import { userModel } from "./user.model";

const createUserIntoDb = async (userData: TUser) => {
  userData.id = await generateUniqueId(userModel);
  const result = userModel.create(userData);
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
