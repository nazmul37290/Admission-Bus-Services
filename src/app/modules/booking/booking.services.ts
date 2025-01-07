/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { TBooking } from "./booking.interface";
import { bookingModel } from "./booking.model";
import { AppError } from "../../errors/AppError";
import { busModel } from "../Bus/bus.model";

const createBookingIntoDb = async (bookingData: TBooking) => {
  bookingData.id = await generateUniqueId(bookingModel);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const booking = await bookingModel.create([bookingData], { session });
    if (!booking.length) {
      throw new AppError(400, "Cannot book tickets");
    }

    const bookedSeatsCount = bookingData?.seats.length;
    const bookedSeatNumbers = bookingData?.seats;
    const updateBusDetails = await busModel.findByIdAndUpdate(
      bookingData?.busId,
      {
        // $inc: { totalSeats: -bookedSeatsCount },
        $addToSet: { bookedSeats: { $each: bookedSeatNumbers } },
      }
    );
    if (!updateBusDetails) {
      throw new AppError(500, "Failed to update bus details");
    }

    await session.commitTransaction();
    await session.endSession();
    return booking;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, "Failed to create booking");
  }
  // return result;
};

const getAllBookingsFromDb = async (query: Record<string, unknown>) => {
  //   let queryObj;
  //   if (query) {
  //     queryObj = query;
  //   }

  const result = await bookingModel.aggregate([
    {
      $lookup: {
        from: "buses", // The name of the buses collection
        localField: "busId", // Field in the Bus collection
        foreignField: "_id", // Field in the bus collection
        as: "busDetails", // Alias for the joined data
      },
    },
    {
      $unwind: "$busDetails", // Flatten the array from $lookup
    },
    {
      $match: {
        // ...(queryObj?.unit ? { "unitDetails.id": queryObj?.unit } : {}),
        isDeleted: false, // Match the unitId.id field
      },
    },
  ]);
  return result;
};

const getSingleBookingFromDb = async (id: string) => {
  const result = await bookingModel.aggregate([
    {
      $lookup: {
        from: "buses", // The name of the buses collection
        localField: "busId", // Field in the Bus collection
        foreignField: "_id", // Field in the bus collection
        as: "busDetails", // Alias for the joined data
      },
    },
    {
      $unwind: "$busDetails", // Flatten the array from $lookup
    },
    {
      $match: {
        id: id,
        // ...(queryObj?.unit ? { "unitDetails.id": queryObj?.unit } : {}),
        isDeleted: false, // Match the unitId.id field
      },
    },
  ]);
  return result;
};

const updateBookingIntoDb = async (id: string, payload: Partial<TBooking>) => {
  const result = await bookingModel.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};

const deleteBookingFromDb = async (id: string) => {
  const result = await bookingModel.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const BookingServices = {
  createBookingIntoDb,
  getAllBookingsFromDb,
  getSingleBookingFromDb,
  updateBookingIntoDb,
  deleteBookingFromDb,
};
