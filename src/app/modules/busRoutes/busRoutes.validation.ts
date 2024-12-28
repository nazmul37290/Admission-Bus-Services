import { z } from "zod";

const createBusRouteValidationSchema = z.object({
  body: z.object({
    examName: z.string({
      invalid_type_error: "Exam Name should be a string",
      required_error: "Exam name is required",
    }),
    examCenterName: z.string({
      invalid_type_error: "Exam center Name should be a string",
      required_error: "Exam center name is required",
    }),
    destinationImage: z
      .string({
        invalid_type_error: "Exam center Name should be a string",
        required_error: "Exam center name is required",
      })
      .optional(),
  }),
});

export const BusRouteValidations = {
  createBusRouteValidationSchema,
};