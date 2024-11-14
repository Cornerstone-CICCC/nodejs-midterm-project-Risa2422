import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user";
import bcrypt from "bcrypt";

// Get all users
const getUsers = (req: Request, res: Response): void => {
  const users = userModel.findAll();
  res.json(users);
};

// Register
const registerUser = async (
  req: Request<{}, {}, Omit<User, "id">>,
  res: Response
): Promise<void> => {
  console.log(req);
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(404).json({ message: "Missing username or password" });
    return;
  }
  const checkUser = userModel.findByUsername(username);
  if (checkUser) {
    res.status(409).json({ message: "Username taken" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = userModel.create({ username, password: hashedPassword });
  res.status(201).json(user);
};

// Login
const loginUser = async (
  req: Request<{}, {}, Omit<User, "id">>,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(404).json({ message: "Missing username or password" });
    return;
  }
  const user = userModel.findByUsername(username);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(403).json({ message: "Passwords do not match" });
    return;
  }

  if (req.session) {
    req.session.isAuthenticated = true;
    req.session.userId = user.id;
    res.json({ message: "Login successful" });
  }
};

// Logout
const logoutUser = (req: Request, res: Response): void => {
  req.session = { isAuthenticated: false, userId: "" };
  res.send();
};

export default {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
};
