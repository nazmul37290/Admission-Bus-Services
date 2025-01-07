import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";
import { AppError } from "../../errors/AppError";
import { generatePnrNumber } from "./booking.utils";
import { busModel } from "../Bus/bus.model";

const bookingSchema = new Schema<TBooking>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    pnrNumber: {
      type: String,
      unique: true,
    },
    busId: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    seats: {
      type: [String],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

bookingSchema.pre("save", async function (next) {
  const data = await busModel.findOne({ _id: this.busId });
  console.log(data);
  console.log(this);
  const result = this.seats.some((seat) => data?.bookedSeats.includes(seat));
  console.log(result);
  if (result) {
    throw new AppError(400, "Selected seats are already booked");
  }
  const isDuplicateTransactionId = await bookingModel.findOne({
    transactionId: this?.transactionId,
  });
  if (isDuplicateTransactionId) {
    throw new AppError(409, "Duplicate transaction Id");
  }

  let isDuplicatePnr: boolean = true;
  while (isDuplicatePnr) {
    this.pnrNumber = generatePnrNumber(this.contactNumber, this.transactionId);
    const duplicatePnrDoc = await bookingModel.findOne({
      pnrNumber: this?.pnrNumber,
    });
    if (!duplicatePnrDoc) {
      isDuplicatePnr = false;
      break;
    }
  }
  next();
});

export const bookingModel = model<TBooking>("booking", bookingSchema);
