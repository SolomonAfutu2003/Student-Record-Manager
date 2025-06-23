import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import studentsRoute from "./routes/student.routes.js";
import { connectToDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); //this middleware is for parsing JSON body: res.body
app.use(rateLimiter);

//custom middleware
// app.use((req, res, next) => {
//   console.log(`Req is a ${req.method} and Req URL is ${req.url}`);
//   next();
// });

app.use("/api/students", studentsRoute);

// app.get("/", (req, res) => {
//   res.status(200).send("Hello");
// });

// app.post("/api", (req, res) => {
//   res.status(201).json({message:"Hello"});
// });
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is live");
  });
});
