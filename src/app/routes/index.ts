import express from "express";
import { BusRouteRouter } from "../modules/busRoutes/busRoutes.routes";
import { UnitRouter } from "../modules/unit/unit.route";
import { BusRouter } from "../modules/Bus/bus.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/bus-routes",
    routes: BusRouteRouter,
  },
  {
    path: "/units",
    routes: UnitRouter,
  },
  {
    path: "/buses",
    routes: BusRouter,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.routes));

export default router;
