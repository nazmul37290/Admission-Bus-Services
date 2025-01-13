import axios from "axios";
import config from "../../config";
import { generateUniqueNumber } from "../../utils/generateUniqueNumber";
import { getToken } from "../../utils/paymentTokenManager";
import { TPayment } from "./payment.interface";
import { PaymentModel } from "./payment.model";

const createPaymentIntoDb = async (paymentDetails: TPayment) => {
  const result = await PaymentModel.create(paymentDetails);
  return result;
};
const getAllPaymentsFromDb = async () => {
  const result = await PaymentModel.find().populate("bookingId");
  return result;
};

const createPayment = async (amount: string) => {
  const id_token = getToken();
  const invoice = generateUniqueNumber();
  const result = await axios.post(
    `https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create`,
    {
      mode: "0011",
      payerReference: "1234",
      callbackURL: `${config.web_url}/payment/bkash/callback`,
      amount: amount,
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: `INV-${invoice}`,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: id_token,
        "X-App-Key": config.bkash_app_key,
      },
    }
  );
  return result.data;
};

const callback = async (paymentData: Record<string, unknown>) => {
  return paymentData;
};

export const paymentServices = {
  getAllPaymentsFromDb,
  createPaymentIntoDb,
  createPayment,
  callback,
};
