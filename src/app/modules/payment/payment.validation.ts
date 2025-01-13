import { z } from "zod";

const createPaymentValidationSchema = z.object({
  body: z.object({
    bookingId: z.string({
      required_error: "Booking Id is required",
      invalid_type_error: "Booking Id must be a string",
    }),
    paymentMethod: z.enum(["bkash", "cash"]),
  }),
});

export const PaymentValidations = {
  createPaymentValidationSchema,
};
