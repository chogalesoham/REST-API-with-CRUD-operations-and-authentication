import express from "express";
import { registerUser, loginUser } from "../Controllers/userControllers.js";
const userRoute = express.Router();

// All Users Routes
userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);

export default userRoute;
