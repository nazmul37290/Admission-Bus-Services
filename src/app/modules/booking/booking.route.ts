import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post(
  "/create-booking",
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingController.createBooking
);
router.get("/", BookingController.getAllBookings);
router.get("/seat-plan/:busId", BookingController.getAllBookingsByBusId);
router.get("/get-revenue", BookingController.getRevenue);
router.get("/:bookingId", BookingController.getSingleBooking);
router.patch(
  "/:bookingId",
  validateRequest(BookingValidations.updateBookingValidationSchema),
  BookingController.updateBooking
);
router.delete("/:bookingId", BookingController.deleteBooking);

export const BookingRoutes = router;
