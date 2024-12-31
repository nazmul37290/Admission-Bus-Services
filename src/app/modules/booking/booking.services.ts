/* eslint-disable @typescript-eslint/no-unused-vars */
import { generateUniqueId } from "../../utils/generateUniqueId";
import { TBooking } from "./booking.interface";
import { bookingModel } from "./booking.model";

const createBookingIntoDb = async (bookingData: TBooking) => {
  bookingData.id = await generateUniqueId(bookingModel);
  const result = bookingModel.create(bookingData);
  return result;
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
