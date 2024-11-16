"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
dotenv_1.default.config();
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const recipe_routes_1 = __importDefault(require("./routes/recipe.routes"));
// Create server
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:3002",
    credentials: true,
}));
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [
        (_a = process.env.COOKIE_SIGN_KEY) !== null && _a !== void 0 ? _a : "jerogiglu90o23",
        (_b = process.env.COOKIE_ENCRYPT_KEY) !== null && _b !== void 0 ? _b : "ejefoiwlejf09qo",
    ],
    maxAge: 60 * 60 * 1000, // 1 hour
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Configure Multer for file uploads
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({ storage });
// Upload
app.post("/upload", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        console.log(file);
        if (!file) {
            res.status(400).json({ success: false, message: "No file uploaded" });
            return;
        }
        const result = yield cloudinary_1.v2.uploader.upload(file, {
            folder: "uploads",
        });
        console.log("result", result.url);
        res.status(200).json({
            success: true,
            message: "File uploaded successfully!",
            result,
        });
    }
    catch (error) {
        console.error("Cloudinary upload error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}));
// Routes
app.use("/user", user_routes_1.default);
app.use("/recipe", recipe_routes_1.default);
// 404 Fallback
app.use((req, res) => {
    res.status(404).send("Access denied");
});
// Start server
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
