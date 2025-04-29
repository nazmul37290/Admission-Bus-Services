import { z } from "zod";

const createGalleryItemSchema = z.object({
  body: z.object({
    image: z
      .string({
        invalid_type_error: "image should be a string",
      })
      .optional(),
    date: z.string({
      invalid_type_error: "Date  should be a string",
      required_error: "Date  is required",
    }),
    title: z.string({
      invalid_type_error: "Title should be a string",
      required_error: "Title is required",
    }),
    shortDescription: z.string({
      invalid_type_error: "Short Description should be a string",
      required_error: "Short Description is required",
    }),
  }),
});
const updateGalleryItemSchema = z.object({
  body: z.object({
    image: z
      .string({
        invalid_type_error: "image should be a string",
      })
      .optional(),
    date: z
      .string({
        invalid_type_error: "Date  should be a string",
        required_error: "Date  is required",
      })
      .optional(),
    title: z
      .string({
        invalid_type_error: "Title should be a string",
        required_error: "Title is required",
      })
      .optional(),
    shortDescription: z
      .string({
        invalid_type_error: "Short Description should be a string",
        required_error: "Short Description is required",
      })
      .optional(),
  }),
});

export const GalleryItemsValidations = {
  createGalleryItemSchema,
  updateGalleryItemSchema,
};
