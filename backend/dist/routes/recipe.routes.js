"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_controller_1 = __importDefault(require("../controllers/recipe.controller"));
const auth_1 = require("../middleware/auth");
const recipeRouter = (0, express_1.Router)();
recipeRouter.get("/", recipe_controller_1.default.getRecipes);
recipeRouter.post("/add", auth_1.checkAuth, recipe_controller_1.default.addRecipe);
recipeRouter.put("/update/:id", auth_1.checkAuth, recipe_controller_1.default.updateRecipeById);
recipeRouter.delete("/delete/:id", auth_1.checkAuth, recipe_controller_1.default.deleteRecipeById);
recipeRouter.get("/:id", recipe_controller_1.default.getRecipeById);
exports.default = recipeRouter;
