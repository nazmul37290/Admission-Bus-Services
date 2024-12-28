/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from "mongoose";

const findLastCreatedId = async (model: any) => {
  const lastDoc = await model.findOne().sort({ createdAt: -1 }).lean();
  return lastDoc || null;
};

export const generateUniqueId = async <T>(model: Model<T>) => {
  let id = 0;
  const lastDoc = await findLastCreatedId(model);
  if (lastDoc) {
    id = Number(lastDoc?.id);
  }
  const uniqueId = id + 1;
  return uniqueId.toString();
};
