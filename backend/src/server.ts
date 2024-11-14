import express, { Request, Response } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/user.routes";
import recipeRouter from "./routes/recipe.routes";

// Create server
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3002",
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: [
      process.env.COOKIE_SIGN_KEY ?? "jerogiglu90o23",
      process.env.COOKIE_ENCRYPT_KEY ?? "ejefoiwlejf09qo",
    ],
    maxAge: 60 * 60 * 1000, // 1 hour
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);

// 404 Fallback
app.use((req: Request, res: Response) => {
  res.status(404).send("Access denied");
});

// Start server
const PORT: number = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
