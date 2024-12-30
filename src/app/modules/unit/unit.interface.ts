import { Types } from "mongoose";

export type TUnit = {
  id: string;
  routeId: Types.ObjectId;
  dateOfExam: string;
  groupName: string;
  status: "active" | "disable";
  isDeleted: boolean;
};
