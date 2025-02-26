import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

//---------Register user---------
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check if all fields are entered
    if (!name || !email || !password) {
      res.status(400);
      return res.json({ Error: "Please enter all fields" });
    }
    //check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.status(400);
      return res.json({ Error: "User already exists" });
    }
    //hash password
    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hasedPassword,
    });
    //generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(201)
      .json({ message: "User registered", AccsessToken: token, user: newUser });
  } catch (error) {
    res.status(500);
    return res.json({ Error: "Something went wrong" });
  }
};

//----------------Login user----------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if all fields are entered
    if (!email || !password) {
      return res.status(400).json({ Error: "Please enter all fields" });
    }
    //check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ Error: "User not found" });
    }
    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ Error: "Invalid credentials" });
    }
    // new token generate
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      AccsessToken: token,
      user,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500);
    return res.json({ Error: "Something went wrong" });
  }
};

export { registerUser, loginUser };
