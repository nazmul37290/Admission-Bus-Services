import { Schema, model } from "mongoose";
import { TSetting } from "./setting.interface";

const settingSchema = new Schema<TSetting>(
  {
    siteName: { type: String },
    siteLogo: { type: String },
    showSiteNameAndLogo: { type: Boolean, default: true },

    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      youtube: { type: String },
    },

    contactInfo: {
      email: [{ type: String }],
      phone: [{ type: String }],
      address: [{ type: String }],
    },

    aboutUs: { type: String },
    termsAndConditions: { type: String },
    privacyPolicy: { type: String },
    helpLine: [{ type: String }],

    bannerSection: {
      title: { type: String },
      description: { type: String },
      image: { type: String },
      buttonText: { type: String },
      buttonLink: { type: String },
      showButton: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

export const SettingModel = model<TSetting>("Setting", settingSchema);
