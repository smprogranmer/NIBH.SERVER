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
  origin: ["http://localhost:5173","http://localhost:4173",process.env.CLIENT_URL],
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

// routes declaration
app.use("/api/v1/products",productRouter);
app.use("/api/v1/orders",orderRouter);

app.get("/", (req, res) => {
  res.send("hello");
});


// app.use("/api/v1/", coursesRouter);

// app.use(apiErrorHandler);



export {app}