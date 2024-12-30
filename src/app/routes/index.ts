import express from "express";
import { BusRouteRouter } from "../modules/busRoutes/busRoutes.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/bus-routes",
    routes: BusRouteRouter,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.routes));

export default router;
