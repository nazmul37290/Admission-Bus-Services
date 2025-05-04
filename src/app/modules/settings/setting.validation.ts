import { z } from "zod";

const createUnitValidationSchema = z.object({
  body: z.object({
    routeId: z.string({
      invalid_type_error: "Route id should be a string",
      required_error: "Route id is required",
    }),
    dateOfExam: z.string({
      invalid_type_error: "Date of exam should be a string",
      required_error: "Date of exam is required",
    }),
    groupName: z.string({
      invalid_type_error: "Group name should be a string",
      required_error: "Group name is required",
    }),
  }),
});
const updateUnitValidationSchema = z.object({
  body: z.object({
    routeId: z
      .string({
        invalid_type_error: "Route id should be a string",
        required_error: "Route id is required",
      })
      .optional(),
    dateOfExam: z
      .string({
        invalid_type_error: "Date of exam should be a string",
        required_error: "Date of exam is required",
      })
      .optional(),
    groupName: z
      .string({
        invalid_type_error: "Group name should be a string",
        required_error: "Group name is required",
      })
      .optional(),
  }),
});

export const UnitValidations = {
  createUnitValidationSchema,
  updateUnitValidationSchema,
};
