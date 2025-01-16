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
  "https://bus-services-client.vercel.app",
];
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    // allowedHeaders: [
    //   "Content-Type",
    //   "Authorization",
    //   "Origin",
    //   "Accept",
    //   "X-Requested-With",
    // ],
  })
);

app.use("/api/uploads", express.static(path.join(cwd(), "uploads")));
app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Bus is running too fast!! 🚌");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);
export default app;
