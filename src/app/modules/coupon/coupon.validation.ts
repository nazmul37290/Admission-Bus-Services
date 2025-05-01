import { z } from "zod";

const createCouponValidationSchema = z.object({
  body: z.object({
    code: z.string({
      invalid_type_error: "Code should be a string",
      required_error: "Code is required",
    }),
    discountPercentage: z.string({
      invalid_type_error: "Discount Percentage should be a string",
      required_error: "Discount Percentage is required",
    }),
  }),
});

export const couponValidation = {
  createCouponValidationSchema,
};
