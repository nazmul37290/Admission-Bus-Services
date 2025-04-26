import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFound";

import path from "path";
import { cwd } from "process";
const app: Application = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://bus-services-client.vercel.app",
  "https://digital-bus.ryzan.co",
  "http://digital-bus.ryzan.co",
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handle preflight requests first
app.options("*", cors());

// Then apply the CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🔍 Origin request received from:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("🔍 Origin rejected from:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Set CORS headers unconditionally for every response
  res.setHeader("Access-Control-Allow-Origin", "https://digital-bus.ryzan.co");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  console.log(res, "response end", req);
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
};

app.use(corsMiddleware);

app.use("/api/uploads", express.static(path.join(cwd(), "uploads")));
app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Bus is running too fast!! 🚌");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);
export default app;
