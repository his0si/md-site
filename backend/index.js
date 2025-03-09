import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/test.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/test", testRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
