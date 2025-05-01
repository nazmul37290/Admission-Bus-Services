import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CouponServices } from "./coupon.services";

const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const couponData = req.body;

  const result = await CouponServices.createCouponIntoDb(couponData);
  res.status(200).json({
    success: true,
    message: "Coupon created successfully",
    data: result,
  });
});
const getAllCoupons = catchAsync(async (req: Request, res: Response) => {
  const result = await CouponServices.getAllCouponsFromDb();
  if (result?.length) {
    res.status(200).json({
      success: true,
      message: "Coupons retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No Coupons found",
      data: null,
    });
  }
});

const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CouponServices.deleteCouponFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Coupon not found",
      data: null,
    });
  }
});

export const CouponController = {
  createCoupon,
  getAllCoupons,

  deleteCoupon,
};
