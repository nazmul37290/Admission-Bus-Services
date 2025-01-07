import { Types } from "mongoose";

export type TBus = {
  id: string;
  busType: "AC" | "Non-AC";
  busName: string;
  tripName: string;
  totalSeats: number;
  bookedSeats: string[];
  routeId: Types.ObjectId;
  unitId: Types.ObjectId;
  startingPoint: string;
  endingPoint: string;
  seatPrice: number;
  departureDate: string;
  returnDate: string;
  departureTime: string;
  returnTime: string;
  status: "active" | "disable";
  isDeleted: boolean;
};
