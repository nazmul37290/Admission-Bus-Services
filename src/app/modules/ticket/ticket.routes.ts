import express from "express";
import { TicketController } from "./tickets.controller";

const router = express.Router();

router.get("/", TicketController.getTicket);

export const ticketRoutes = router;
