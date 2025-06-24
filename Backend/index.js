import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import studentsRoute from "./routes/student.routes.js";
import { connectToDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); //this middleware is for parsing JSON body: res.body
app.use(rateLimiter);

//custom middleware
// app.use((req, res, next) => {
//   console.log(`Req is a ${req.method} and Req URL is ${req.url}`);
//   next();
// });

app.use("/api/students", studentsRoute);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../Frontend/SRM/dist");

  // Serve static files
  app.use(express.static(frontendPath));

  // Fallback route (safe for Express 5)
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}


connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is live http://localhost:${PORT}`);
  });
});
