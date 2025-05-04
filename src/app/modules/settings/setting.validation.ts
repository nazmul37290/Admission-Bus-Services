import { z } from "zod";

export const settingValidationSchema = z.object({
  body: z.object({
    siteName: z.string().optional(),
    siteLogo: z.string().url("Invalid logo URL").optional(),
    showSiteNameAndLogo: z.boolean().optional(),

    socialLinks: z
      .object({
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        instagram: z.string().optional(),
        youtube: z.string().optional(),
      })
      .optional(),

    contactInfo: z
      .object({
        email: z.array(z.string().email("Invalid email")).optional(),
        phone: z.array(z.string()).optional(),
        address: z.array(z.string()).optional(),
      })
      .optional(),

    aboutUs: z.string().optional(),
    termsAndConditions: z.string().optional(),
    privacyPolicy: z.string().optional(),
    helpLine: z.array(z.string()).optional(),

    bannerSection: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().url("Invalid image URL").optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        showButton: z.boolean().optional(),
      })
      .optional(),
  }),
});

export const settingValidations = {
  settingValidationSchema,
};
