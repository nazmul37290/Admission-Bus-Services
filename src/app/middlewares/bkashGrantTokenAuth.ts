/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import { setToken } from "../utils/paymentTokenManager";

const bkashGrantTokenAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const res = await axios.post(
      `${config.bkash_base_url}/token/grant`,
      {
        app_key: config.bkash_app_key,
        app_secret: config.bkash_app_secret,
      },
      {
        headers: {
          "Content-Type": "application/json",
          username: config.bkash_username,
          password: config.bkash_password,
        },
      }
    );
    setToken(res.data.id_token);
    next();
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get Bkash token",
      error: error.response.message,
    });
  }
};

export default bkashGrantTokenAuth;
