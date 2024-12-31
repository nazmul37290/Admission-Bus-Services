import { Types } from "mongoose";

export type TBooking = {
  id: string;
  name: string;
  contactNumber: string;
  email?: string;
  gender: "male" | "female" | "other";
  transactionId: string;
  pnrNumber: string;
  busId: Types.ObjectId;
  seats: Array<string>;
  totalPrice: number;
  status: "booked" | "cancelled";
  isDeleted: boolean;
};
