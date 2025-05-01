import express from "express";
import { CouponController } from "./coupon.controller";
import validateRequest from "../../middlewares/validateRequest";
import { couponValidation } from "./coupon.validation";

const router = express.Router();

router.post(
  "/create-coupon",
  validateRequest(couponValidation.createCouponValidationSchema),
  CouponController.createCoupon
);
router.get("/", CouponController.getAllCoupons);

router.delete("/:id", CouponController.deleteCoupon);

export const CouponRouter = router;
