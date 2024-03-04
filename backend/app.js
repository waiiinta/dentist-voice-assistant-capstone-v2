import express from "express";
import morgan from "morgan";
import cors from "cors";
import AppError from "./utils/appError.js";
import ErrorMiddleware from "./middleware/error.middleware.js";
import userRouter from "./routes/userRoutes.js";
import recordRouter from "./routes/recordRoutes.js";
import dotenv from "dotenv"


const corsOptions = {
  // origin: [
  //   `${process.env.NODE_ENV === "production" ? "https" : "http"}://${process.env.FRONTEND_IP}:${process.env.PORT}`,
  //   `${process.env.NODE_ENV === "production" ? "https" : "http"}://${process.env.BACKEND_WEB_RTC_IP}:${process.env.BACKEND_WEB_RTC_PORT}`,
  // ],
  origin : '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
dotenv.config()
console.log(process.env.FRONTEND_IP, process.env.FRONTEND_PORT)

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

app.use(express.json({ limit: "25kb" }));

// app.use(express.urlencoded({extended:true}))

app.use("/user", userRouter);
app.use("/record", recordRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorMiddleware);

export default app
