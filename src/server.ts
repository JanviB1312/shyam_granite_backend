import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import * as crypto from 'crypto';
import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import dotenv from 'dotenv';
import { newsAndAnnouncementRouter } from "./api/news/newsAndAnnouncementRouter";
import { productRouter } from "./api/products/productRouter";
import { orderRouter } from "./api/order/orderRouter";

const logger = pino({ name: "server start" });
const app: Express = express();
dotenv.config();

const secretKey = crypto.randomBytes(32).toString("hex");
//console.log("Secret key",secretKey);

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
//app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
