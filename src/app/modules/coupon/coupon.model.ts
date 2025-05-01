import { model, Schema } from "mongoose";
import { TCoupon } from "./coupon.interface";

const couponSchema = new Schema<TCoupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discountPercentage: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const couponModel = model<TCoupon>("Coupon", couponSchema);
