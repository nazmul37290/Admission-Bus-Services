import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";
import { AppError } from "../../errors/AppError";
import { generatePnrNumber } from "./booking.utils";

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
      ref: "busModel",
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
