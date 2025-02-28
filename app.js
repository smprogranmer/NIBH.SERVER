import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
// import apiErrorHandler from "./middlewares/apiErrorHandler.js";
import cors from "cors";

// import coursesRouter from "./routes/Courses.route.js";

config({
  path: "./.env",
});
// const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

// cors config 
const corsOptions = {
  origin: ["http://localhost:5173","http://localhost:4173","https://www.newiraniborkahouse.com",process.env.CLIENT_URL],
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser())


app.get("/", (req, res) => {
  res.send("HI FROM BACKEND");
});


// routes import
import productRouter from "./routes/Product.routes.js";
import orderRouter from "./routes/Order.routes.js";
import userRouter from "./routes/User.routes.js";
import { ApiError } from "./utils/ApiError.js";

// routes declaration
app.use("/api/v1/products",productRouter);
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/user",userRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

// error middleware 
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
      res.status(err.statusCode).json({
          success: err.success,
          message: err.message,
          errors: err.errors,
      });
  } else {
      res.status(500).json({
          success: false,
          message: "Internal Server Error",
      });
  }
});

// app.use("/api/v1/", coursesRouter);

// app.use(apiErrorHandler);



export {app}