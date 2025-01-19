/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { TBooking, TMatchCondition } from "./booking.interface";
import { bookingModel } from "./booking.model";
import { AppError } from "../../errors/AppError";
import { busModel } from "../Bus/bus.model";
import { PaymentModel } from "../payment/payment.model";

const createBookingIntoDb = async (bookingData: TBooking) => {
  bookingData.id = await generateUniqueId(bookingModel);
  // const result = await bookingModel.create(bookingData);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const booking = await bookingModel.create([bookingData], { session });
    if (!booking.length) {
      throw new AppError(400, "Cannot book tickets");
    }
    const bookedSeatNumbers = bookingData?.seats;
    const updateBusDetails = await busModel.findByIdAndUpdate(
      bookingData?.busId,
      {
        $addToSet: { bookedSeats: { $each: bookedSeatNumbers } },
      },
      { session }
    );
    if (!updateBusDetails) {
      throw new AppError(500, "Failed to update bus details");
    }

    const addPaymentData = await PaymentModel.create(
      [
        {
          bookingId: booking[0]._id,
          paymentMethod: booking[0].paymentMethod,
        },
      ],
      { session }
    );
    if (!addPaymentData) {
      throw new AppError(500, "Failed to create payment details");
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

const getRevenueFromBookings = async (dayCount: number | undefined) => {
  const matchCondition: TMatchCondition = {
    isDeleted: false,
  };
  if (dayCount)
    matchCondition.createdAt = {
      $gte: new Date(new Date().setDate(new Date().getDate() - dayCount)),
    };
  const result = await bookingModel.aggregate([
    {
      $match: matchCondition,
    },
    {
      $facet: {
        revenueByPaymentMethod: [
          {
            $match: {
              status: "booked",
            },
          },
          {
            $group: {
              _id: {
                date: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                paymentMethod: "$paymentMethod",
              },
              totalRevenue: { $sum: "$totalPrice" },
              totalBookings: { $sum: 1 },
            },
          },
          {
            $sort: {
              date: 1,
            },
          },
        ],
        totalRevenue: [
          {
            $match: {
              status: "booked",
            },
          },
          {
            $group: {
              _id: null, // No grouping, compute total revenue for all records
              totalRevenue: { $sum: "$totalPrice" }, // Sum total price
              totalBookings: { $sum: 1 }, // Count all bookings
              // Count all bookings
            },
          },
        ],
        cancelCount: [
          {
            $match: {
              status: "cancelled",
            },
          },
          {
            $group: {
              _id: null,
              cancelledCount: {
                $sum: 1,
              },
            },
          },
          {
            $project: {
              _id: 0,
            },
          },
        ],
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
  getRevenueFromBookings,
  updateBookingIntoDb,
  deleteBookingFromDb,
};
