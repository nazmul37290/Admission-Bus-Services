/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.services";
import { AuthRequest } from "../../middlewares/verifyToken";
import { userModel } from "../user/user.model";
import crypto from "crypto";
import config from "../../config";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

const checkUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await authServices.checkUserFromDb(user);

  res.status(200).json({
    success: true,
    message: "User authenticated successfully",
    data: result,
  });
});

const verify = (req: AuthRequest, res: Response) => {
  res.status(200).json({
    success: true,
    message: "User is logged in !",
    data: req.user,
  });
};
const createForgetToken = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Email not found" });
    return;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 3600000; // 1 hour

  user.resetToken = token;
  user.resetTokenExpires = new Date(expires);
  await user.save();

  // 4. Create reset link
  const resetLink = `${config.client_url}/reset-password?token=${token}`;
  // const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  // 5. Mailgun transporter
  const mailgunAuth = {
    auth: {
      domain: config.mailgun_domain as string, // example: "sandbox123.mailgun.org"
      api_key: config.mailgun_api_key as string, // your Mailgun API key
    },
  };

  const transporter = nodemailer.createTransport(mg(mailgunAuth));

  // 6. Compose email
  const mailOptions = {
    from: `"Course App 👨‍🏫" <no-reply@${config.mailgun_domain}>`,
    to: email,
    subject: "Password Reset Request",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0d9488;">Password Reset Request</h2>
          <p style="font-size: 16px;">You requested to reset your password for your Course App account.</p>
          <p style="font-size: 16px;">Click the button below to reset your password:</p>
  
          <a href="${resetLink}" 
            style="display: inline-block; margin: 25px 0; padding: 12px 24px; 
                  background-color: #0d9488; color: white; text-decoration: none; 
                  border-radius: 4px; font-weight: bold; font-size: 16px;">
            Reset Password
          </a>
  
          <p style="font-size: 14px; color: #6b7280;">
            If you didn't request this password reset, please ignore this email or contact support.
          </p>
          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            This link will expire in 5 minutes for security reasons.
          </p>
        </div>
      `,
  };

  // 7. Send the email
  try {
    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Reset link sent to your email.",
      data: info.messageId,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error sending email",
      error: error.message,
    });
  }
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await userModel.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }
  user.password = password;

  user.resetToken = null;
  user.resetTokenExpires = null;
  const result = await user.save();

  res.status(200).json({
    success: true,
    data: result,
    message: "Password updated successfully",
  });
});
export const AuthController = {
  checkUser,
  verify,
  createForgetToken,
  resetPassword,
};
