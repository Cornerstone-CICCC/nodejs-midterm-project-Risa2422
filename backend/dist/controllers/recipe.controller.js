"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_model_1 = __importDefault(require("../models/recipe.model"));
// Get all recipes
const getRecipes = (req, res) => {
    const recipes = recipe_model_1.default.findAllRecipe();
    res.json(recipes);
};
// Get recipe by id
const getRecipeById = (req, res) => {
    const { id } = req.params;
    const recipe = recipe_model_1.default.findRecipeById(id);
    console.log("comming", id);
    if (!recipe) {
        res.status(404).json({ message: "Recipe not found" });
        return;
    }
    res.json(recipe);
};
// Get recipe by userId
const getRecipeByUserId = (req, res) => {
    const { id } = req.params;
    const recipe = recipe_model_1.default.findRecipeByUserId(id);
    if (!recipe) {
        res.status(404).json({ message: "Recipe not found" });
        return;
    }
    res.json(recipe);
};
// Add recipe
const addRecipe = (req, res) => {
    const { userId } = req.session;
    const { title } = req.body;
    if (!title || !userId) {
        res.status(400).json({ message: "Missing title or user id" });
        return;
    }
    console.log(req.body);
    const recipe = recipe_model_1.default.createRecipe(req.body);
    res.status(201).json(recipe);
};
// Update recipe by id
const updateRecipeById = (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const recipe = recipe_model_1.default.edit(id, req.body);
    if (!recipe) {
        res.status(404).json({ message: "Recipe not found" });
        return;
    }
    res.json(recipe);
};
// Delete recipe by id
const deleteRecipeById = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    const response = recipe_model_1.default.delete(id, userId);
    if (!response) {
        res.status(404).json({ message: "Recipe not found" });
        return;
    }
    res.status(204).send();
};
exports.default = {
    getRecipes,
    getRecipeById,
    addRecipe,
    deleteRecipeById,
    updateRecipeById,
    getRecipeByUserId,
};
