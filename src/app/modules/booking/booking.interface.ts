import { Types } from "mongoose";

export type TMatchCondition = {
  isDeleted: boolean;
  createdAt?: {
    $gte?: Date;
    $lte?: Date;
    $gt?: Date;
    $lt?: Date;
  };
};

export type TBooking = {
  id: string;
  name: string;
  contactNumber: string;
  email?: string;
  gender: "male" | "female" | "other";
  transactionId?: string;
  pnrNumber: string;
  busId: Types.ObjectId;
  seats: Array<string>;
  paymentMethod: "bkash" | "cash";
  totalPrice: number;
  status: "booked" | "cancelled";
  isDeleted: boolean;
};
