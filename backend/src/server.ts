import express, { Request, Response } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

import userRouter from "./routes/user.routes";
import recipeRouter from "./routes/recipe.routes";

// Create server
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3001",
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

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Configure Multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Upload
app.post(
  "/upload",
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const file = req.file?.path;
      console.log(file);
      if (!file) {
        res.status(400).json({ success: false, message: "No file uploaded" });
        return;
      }

      const result = await cloudinary.uploader.upload(file, {
        folder: "uploads",
      });

      console.log("result", result.url);

      res.status(200).json({
        success: true,
        message: "File uploaded successfully!",
        result,
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  }
);

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
