import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFound";
const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://bus-services-client.vercel.app"],
    credentials: true,
  })
);
// commented
app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Bus is running too fast!! 🚌");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);
export default app;
