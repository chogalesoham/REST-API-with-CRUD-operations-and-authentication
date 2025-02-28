import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
import { connectDB } from "./src/config/db.js";
import userRoute from "./src/Routes/userRoute.js";
import booksRoute from "./src/Routes/booksRoute.js";

connectDB();

//meddleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

//routes
app.use("/api/users", userRoute);
app.use("/api/books", booksRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
