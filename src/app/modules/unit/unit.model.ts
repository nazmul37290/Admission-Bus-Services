import { model, Schema } from "mongoose";
import { TUnit } from "./unit.interface";

const unitSchema = new Schema<TUnit>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    routeId: {
      type: Schema.Types.ObjectId,
      ref: "busRoutesModel",
      required: true,
    },
    dateOfExam: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
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

export const unitModel = model<TUnit>("Unit", unitSchema);
