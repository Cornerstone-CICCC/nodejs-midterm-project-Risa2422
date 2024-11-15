import { Request, Response } from "express";
import recipeModel from "../models/recipe.model";
import { Recipe } from "../types/recipe";

// Get all recipes
const getRecipes = (req: Request, res: Response): void => {
  const recipes = recipeModel.findAllRecipe();
  res.json(recipes);
};

// Get recipe by id
const getRecipeById = (req: Request<{ id: string }>, res: Response): void => {
  const { id } = req.params;
  const recipe = recipeModel.findRecipeById(id);
  if (!recipe) {
    res.status(404).json({ message: "Recipe not found" });
    return;
  }
  res.json(recipe);
};

// Get recipe by userId
const getRecipeByUserId = (
  req: Request<{ id: string }>,
  res: Response
): void => {
  const { id } = req.params;
  console.log(req);
  const recipe = recipeModel.findRecipeByUserId(id);

  if (!recipe) {
    res.status(404).json({ message: "Recipe not found" });
    return;
  }
  res.json(recipe);
};

// Add recipe
const addRecipe = (
  req: Request<{}, {}, Omit<Recipe, "id">>,
  res: Response
): void => {
  const { userId } = req.session;
  const { title } = req.body;
  if (!title || !userId) {
    res.status(400).json({ message: "Missing title or user id" });
    return;
  }
  const recipe = recipeModel.createRecipe(req.body);
  res.status(201).json(recipe);
};

// Update recipe by id
const updateRecipeById = (
  req: Request<{ id: string }, {}, Partial<Recipe>>,
  res: Response
): void => {
  const { id } = req.params;
  const { title } = req.body;
  const recipe = recipeModel.edit(id, { title });
  if (!recipe) {
    res.status(404).json({ message: "Recipe not found" });
    return;
  }
  res.json(recipe);
};

// Delete recipe by id
const deleteRecipeById = (req: Request<{ id: string }>, res: Response) => {
  const { userId } = req.session;
  const { id } = req.params;
  const response = recipeModel.delete(id, userId);
  if (!response) {
    res.status(404).json({ message: "Recipe not found" });
    return;
  }
  res.status(204).send();
};

export default {
  getRecipes,
  getRecipeById,
  addRecipe,
  deleteRecipeById,
  updateRecipeById,
  getRecipeByUserId,
};
