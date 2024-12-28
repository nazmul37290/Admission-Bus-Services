export type TBusRoutes = {
  id: string;
  examName: string;
  examCenterName: string;
  destinationImage?: string;
  status: "active" | "disable";
  isDeleted: boolean;
};
