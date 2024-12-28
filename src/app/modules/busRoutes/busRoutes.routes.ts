import express from "express";
import { BusRouteController } from "./busRoutes.controller";

const router = express.Router();

router.post("/create-bus-routes", BusRouteController.createBusRoutes);

export const BusRouteRouter = router;
