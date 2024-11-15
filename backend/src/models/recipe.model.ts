import { Request, Response } from "express";
import { Recipe } from "../types/recipe";
import { v4 as uuidv4 } from "uuid";

class RecipeModel {
  private recipes: Recipe[] = [
    {
      id: "1",
      userId: "1",
      title: "Takoyaki",
      cuisineType: "Japanese",
      cookingTime: 10,
      difficulty: "easy",
    },
    {
      id: "2",
      userId: "2",
      title: "Okoniyaki",
      cuisineType: "Japanese",
      cookingTime: 10,
      difficulty: "easy",
    },
    {
      id: "3",
      userId: "90393cd5-ab1f-40fc-be7f-ca2dfaccb438",
      title: "Bibimbap",
      cuisineType: "Korean",
      cookingTime: 10,
      difficulty: "easy",
    },
  ];

  findAllRecipe(): Recipe[] {
    return this.recipes;
  }

  findRecipeByUserId(id: string): Recipe | undefined {
    const recipe = this.recipes.find((recipe) => recipe.userId === id);
    if (!recipe) return undefined;
    return recipe;
  }

  findRecipeById(id: string): Recipe | undefined {
    const recipe = this.recipes.find((recipe) => recipe.id === id);
    if (!recipe) return undefined;
    return recipe;
  }

  createRecipe(newData: Omit<Recipe, "id">): Recipe {
    const newRecipes = {
      id: uuidv4(),
      ...newData,
    };
    this.recipes.push(newRecipes);
    return newRecipes;
  }

  edit(id: string, newData: Partial<Recipe>): Recipe | undefined {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) return undefined;
    if (this.recipes[index].id !== newData.id) return undefined;
    const updatedArticle = {
      ...this.recipes[index],
      ...newData,
    };
    this.recipes[index] = updatedArticle;
    return updatedArticle;
  }

  delete(id: string, recipeId: string): boolean {
    const index = this.recipes.findIndex(
      (recipe) => recipe.id === id && recipe.id === recipeId
    );

    if (index === 1) return false;
    this.recipes.splice(index, 1);
    return true;
  }
}

export default new RecipeModel();
