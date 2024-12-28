import { model, Schema } from "mongoose";
import { TBusRoutes } from "./busRoutes.interface";

const busRoutesSchema = new Schema<TBusRoutes>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    examName: {
      type: String,
      required: true,
    },
    examCenterName: {
      type: String,
      required: true,
    },
    destinationImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "disable"],
      default: "active",
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

export const busRoutesModel = model<TBusRoutes>("Bus-Route", busRoutesSchema);
