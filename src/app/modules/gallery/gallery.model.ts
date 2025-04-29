import { model, Schema } from "mongoose";
import { TGalleryItem } from "./gallery.interface";

const gallerySchema = new Schema<TGalleryItem>(
  {
    image: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
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

export const galleryModel = model<TGalleryItem>("GalleryItem", gallerySchema);
