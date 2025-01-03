/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.services";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;
  const result = await BookingServices.createBookingIntoDb(bookingData);
  res.status(200).json({
    success: true,
    message: "Seats booked successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await BookingServices.getAllBookingsFromDb(query);
  if (result?.length) {
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No booking found",
      data: null,
    });
  }
});
const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bookingId;
  const result = await BookingServices.getSingleBookingFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Booking not found",
      data: null,
    });
  }
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bookingId;
  const updatedData = req.body;
  const result = await BookingServices.updateBookingIntoDb(id, updatedData);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Booking not found",
      data: null,
    });
  }
});
const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bookingId;
  const result = await BookingServices.deleteBookingFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Booking not found",
      data: null,
    });
  }
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
