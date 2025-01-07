import { z } from "zod";

const createBusValidationSchema = z.object({
  body: z.object({
    busType: z.enum(["AC", "Non-AC"]),
    busName: z.string({
      required_error: "Bus Name is required",
      invalid_type_error: "Bus name must be a string",
    }),
    tripName: z.string({
      required_error: "Trip Name is required",
      invalid_type_error: "Bus Name must be a string",
    }),
    totalSeats: z.number({
      required_error: "Total Seats is required",
      invalid_type_error: "Total Seats must be a number",
    }),
    routeId: z.string({
      required_error: "Route ID is required",
      invalid_type_error: "Route ID must be a string",
    }),
    unitId: z.string({
      required_error: "Unit ID is required",
      invalid_type_error: "Unit ID must be a string",
    }),
    startingPoint: z.string({
      required_error: "Starting Point is required",
      invalid_type_error: "Starting Point must be a string",
    }),
    endingPoint: z.string({
      required_error: "Ending Point is required",
      invalid_type_error: "Ending Point must be a string",
    }),
    seatPrice: z.number({
      required_error: "Seat Price is required",
      invalid_type_error: "Seat Price must be a number",
    }),
    departureDate: z.string({
      required_error: "Departure Date is required",
      invalid_type_error: "Departure Date must be a string",
    }),
    returnDate: z.string({
      required_error: "Return Date is required",
      invalid_type_error: "Return Date must be a string",
    }),
    departureTime: z.string({
      required_error: "Departure Time is required",
      invalid_type_error: "Departure Time must be a string",
    }),
    returnTime: z.string({
      required_error: "Return Time is required",
      invalid_type_error: "Return Time must be a string",
    }),
  }),
});

const updateBusValidationSchema = z.object({
  body: z.object({
    busType: z.enum(["AC", "Non-AC"]).optional(),
    busName: z
      .string({
        required_error: "Bus Name is required",
        invalid_type_error: "Bus name must be a string",
      })
      .optional(),
    tripName: z
      .string({
        required_error: "Trip Name is required",
        invalid_type_error: "Bus Name must be a string",
      })
      .optional(),
    totalSeats: z
      .number({
        required_error: "Total Seats is required",
        invalid_type_error: "Total Seats must be a number",
      })
      .optional(),
    bookedSeats: z.array(z.string()).optional(),
    routeId: z
      .string({
        required_error: "Route ID is required",
        invalid_type_error: "Route ID must be a string",
      })
      .optional(),
    unitId: z
      .string({
        required_error: "Unit ID is required",
        invalid_type_error: "Unit ID must be a string",
      })
      .optional(),
    startingPoint: z
      .string({
        required_error: "Starting Point is required",
        invalid_type_error: "Starting Point must be a string",
      })
      .optional(),
    endingPoint: z
      .string({
        required_error: "Ending Point is required",
        invalid_type_error: "Ending Point must be a string",
      })
      .optional(),
    seatPrice: z
      .number({
        required_error: "Seat Price is required",
        invalid_type_error: "Seat Price must be a number",
      })
      .optional(),
    departureDate: z
      .string({
        required_error: "Departure Date is required",
        invalid_type_error: "Departure Date must be a string",
      })
      .optional(),
    returnDate: z
      .string({
        required_error: "Return Date is required",
        invalid_type_error: "Return Date must be a string",
      })
      .optional(),
    departureTime: z
      .string({
        required_error: "Departure Time is required",
        invalid_type_error: "Departure Time must be a string",
      })
      .optional(),
    returnTime: z
      .string({
        required_error: "Return Time is required",
        invalid_type_error: "Return Time must be a string",
      })
      .optional(),
  }),
});

export const BusValidations = {
  createBusValidationSchema,
  updateBusValidationSchema,
};
