import express from "express";
import { PaymentController } from "./payment.controller";
import bkashGrantTokenAuth from "../../middlewares/bkashGrantTokenAuth";

const router = express.Router();

router.post("/create-payment", PaymentController.createPaymentToDbController);
router.get("/", PaymentController.getAllPayments);
router.post(
  "/bkash/create",
  bkashGrantTokenAuth,
  PaymentController.createPaymentController
);
router.get("/bkash/callback", PaymentController.callBackController);

export const PaymentRoutes = router;
