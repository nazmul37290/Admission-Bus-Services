import { model, Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const paymentSchema = new Schema<TPayment>(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "booking",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Bkash", "cash"],
      required: true,
    },
  },
  { timestamps: true }
);

export const PaymentModel = model<TPayment>("Payment", paymentSchema);
