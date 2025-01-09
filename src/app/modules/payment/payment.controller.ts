/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";
import axios from "axios";
import config from "../../config";
import { getToken } from "../../utils/paymentTokenManager";

const createPaymentController = catchAsync(
  async (req: Request, res: Response) => {
    const { amount } = req.body;

    const result = await paymentServices.createPayment(amount);
    res.status(200).json({
      success: true,
      message: "Payment created successfully",
      data: result,
    });
  }
);

const callBackController = async (req: Request, res: Response) => {
  const id_token = getToken();
  const result = req.query;

  if (result?.status === "success") {
    try {
      const data = await axios.post(
        `${config.bkash_base_url}/execute`,

        { paymentID: result.paymentID },

        {
          headers: {
            Accept: "application/json",
            Authorization: id_token,
            "X-app-key": config.bkash_app_key,
          },
        }
      );
      if (data && data?.data?.statusCode === "0000") {
        res.redirect(
          `${config.client_url}/payment/success?trxID=${data?.data?.trxID}&message=${data?.data?.statusMessage}`
        );
      } else {
        res.redirect(
          `${config.client_url}/payment/error?message=${data?.data?.statusMessage}`
        );
      }
    } catch (error: any) {
      res.redirect(
        `${config.client_url}/payment/error?message=${error.message}`
      );
    }
  } else {
    res.redirect(`${config.client_url}/payment/error?message=${result.status}`);
  }
};

export const PaymentController = {
  createPaymentController,
  callBackController,
};
