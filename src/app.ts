import express, { Application, Request, Response } from "express";
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

// Then apply the CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🔍 Incoming Origin:", origin);
      if (!origin) return callback(null, true); // Allow server-to-server requests

      const normalizedOrigin = origin.replace(/\/$/, ""); // remove any trailing slash

      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS Rejected Origin:", normalizedOrigin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use("/api/uploads", express.static(path.join(cwd(), "uploads")));
app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Bus is running too fast !! and giving bauli 🚌");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);
export default app;
