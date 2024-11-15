import { Router } from "express";
import recipeController from "../controllers/recipe.controller";
import { checkAuth } from "../middleware/auth";

const recipeRouter = Router();

recipeRouter.get("/", recipeController.getRecipes);
recipeRouter.post("/add", checkAuth, recipeController.addRecipe);
recipeRouter.put("/update/:id", checkAuth, recipeController.updateRecipeById);
recipeRouter.delete(
  "/delete/:id",
  checkAuth,
  recipeController.deleteRecipeById
);
recipeRouter.get("/:id", recipeController.getRecipeById);
recipeRouter.get("/user/:id", recipeController.getRecipeByUserId);

export default recipeRouter;
