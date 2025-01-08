import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TicketServices } from "./tickets.services";

const getTicket = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await TicketServices.getTicketFromDb(query);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Tickets retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Ticket not found",
      data: null,
    });
  }
});

export const TicketController = {
  getTicket,
};
