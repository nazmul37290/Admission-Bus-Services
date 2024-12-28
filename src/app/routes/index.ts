import express from "express";
import { BusRouteRouter } from "../modules/busRoutes/busRoutes.routes";
const router = express.Router();

router.use("/bus-routes", BusRouteRouter);

export default router;
