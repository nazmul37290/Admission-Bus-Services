import express from "express";
import { BusRouteRouter } from "../modules/busRoutes/busRoutes.routes";
import { UnitRouter } from "../modules/unit/unit.route";
import { BusRouter } from "../modules/Bus/bus.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { BookingRoutes } from "../modules/booking/booking.route";
import { DuaRoutes } from "../modules/duas/dua.routes";
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
  {
    path: "/users",
    routes: UserRoutes,
  },
  {
    path: "/bookings",
    routes: BookingRoutes,
  },
  {
    path: "/duas",
    routes: DuaRoutes,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.routes));

export default router;
