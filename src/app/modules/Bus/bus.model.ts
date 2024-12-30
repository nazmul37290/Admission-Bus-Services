import { model, Schema } from "mongoose";
import { TBus } from "./Bus.interface";

const busSchema = new Schema<TBus>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    busType: {
      type: String,
      enum: ["AC", "Non AC"],
      required: true,
    },
    busName: {
      type: String,
      required: true,
    },
    tripName: {
      type: String,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: [String],
      default: [],
    },
    routeId: {
      type: Schema.Types.ObjectId,
      ref: "Bus-Route",
      required: true,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    startingPoint: {
      type: String,
      required: true,
    },
    endingPoint: {
      type: String,
      required: true,
    },
    seatPrice: {
      type: Number,
      required: true,
    },
    departureDate: {
      type: String,
      required: true,
    },
    returnDate: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    returnTime: {
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
  { timestamps: true }
);

export const busModel = model<TBus>("Bus", busSchema);
