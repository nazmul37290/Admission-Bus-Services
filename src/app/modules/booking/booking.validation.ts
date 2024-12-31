import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Passenger Name should be a string",
      required_error: "Passenger Name is required",
    }),
    contactNumber: z.string({
      invalid_type_error: "Passenger contact number should be a string",
      required_error: "Passenger contack number is required",
    }),
    email: z
      .string({
        invalid_type_error: "Passenger Email should be a string",
      })
      .optional(),
    gender: z.enum(["male", "female", "other"]),
    transactionId: z.string({
      required_error: "Transaction ID is required",
      invalid_type_error: "Transaction ID should be a string",
    }),
    busId: z.string({
      required_error: "Bus ID is required",
      invalid_type_error: "Bus ID should be a string",
    }),
    seats: z.array(z.string()),
    totalPrice: z.number({
      required_error: "Total Price is required",
      invalid_type_error: "Total Price should be a number",
    }),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Passenger Name should be a string",
        required_error: "Passenger Name is required",
      })
      .optional(),
    contactNumber: z
      .string({
        invalid_type_error: "Passenger contact number should be a string",
        required_error: "Passenger contack number is required",
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: "Passenger Email should be a string",
      })
      .optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    transactionId: z
      .string({
        required_error: "Transaction ID is required",
        invalid_type_error: "Transaction ID should be a string",
      })
      .optional(),
    busId: z
      .string({
        required_error: "Bus ID is required",
        invalid_type_error: "Bus ID should be a string",
      })
      .optional(),
    seats: z.array(z.string()).optional(),
    totalPrice: z
      .number({
        required_error: "Total Price is required",
        invalid_type_error: "Total Price should be a number",
      })
      .optional(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
