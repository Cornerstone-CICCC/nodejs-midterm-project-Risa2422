import { Router } from "express";
import userController from "../controllers/user.controller";
import { checkAuth } from "../middleware/auth";

const userRouter = Router();

userRouter.get("/auth", checkAuth, userController.getUserInfo);
userRouter.get("/", userController.getUsers);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/logout", userController.logoutUser);
userRouter.get("/:id", userController.getUserById);

export default userRouter;
