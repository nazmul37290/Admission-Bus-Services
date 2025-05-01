import { HttpStatusCode } from "axios";
import { AppError } from "../../errors/AppError";
import { TCoupon } from "./coupon.interface";
import { couponModel } from "./coupon.model";

const createCouponIntoDb = async (couponData: TCoupon) => {
  const isExist = await couponModel.findOne({ code: couponData.code });
  if (isExist) {
    throw new AppError(HttpStatusCode.Conflict, "Coupon code already exist");
  }
  const result = await couponModel.create(couponData);
  return result;
};

const getAllCouponsFromDb = async () => {
  const result = await couponModel.find({ isDeleted: false });
  return result;
};

const deleteCouponFromDb = async (id: string) => {
  const result = await couponModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const CouponServices = {
  createCouponIntoDb,
  getAllCouponsFromDb,

  deleteCouponFromDb,
};
