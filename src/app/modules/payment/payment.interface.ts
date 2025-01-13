import { Types } from "mongoose";

export type TPayment = {
  id: string;
  bookingId: Types.ObjectId;
  paymentMethod: "bkash" | "cash";
};
