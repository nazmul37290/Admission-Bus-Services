import { bookingModel } from "../booking/booking.model";

const getTicketFromDb = async (query: Record<string, unknown>) => {
  const { pnr, phone } = query;
  const result = await bookingModel
    .findOne({
      pnrNumber: pnr,
      contactNumber: phone,
    })
    .populate("busId");
  return result;
};

export const TicketServices = {
  getTicketFromDb,
};
