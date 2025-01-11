"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "https://bus-services-client.vercel.app",
];
app.use(express_1.default.json());
app.use((0, cors_1.default)({
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
}));
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Bus is running too fast!! 🚌");
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
