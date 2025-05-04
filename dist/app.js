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
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://bus-services-client.vercel.app",
    "https://digital-bus.ryzan.co",
    "http://digital-bus.ryzan.co",
];
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Then apply the CORS middleware
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // Allow server-to-server requests
        const normalizedOrigin = origin.replace(/\/$/, ""); // remove any trailing slash
        if (allowedOrigins.includes(normalizedOrigin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));
app.use("/api/uploads", express_1.default.static(path_1.default.join((0, process_1.cwd)(), "uploads")));
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Bus is running too fast !! and giving bauli 🚌");
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
