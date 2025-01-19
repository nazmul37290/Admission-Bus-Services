"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    web_url: process.env.WEB_URL,
    client_url: process.env.VITE_BASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_token_secret: process.env.JWT_TOKEN_SECRET,
    bkash_base_url: process.env.BKASH_BASE_URL,
    bkash_username: process.env.BKASH_USERNAME,
    bkash_password: process.env.BKASH_PASSWORD,
    bkash_app_key: process.env.BKASH_APP_KEY,
    bkash_app_secret: process.env.BKASH_APP_SECRET,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
