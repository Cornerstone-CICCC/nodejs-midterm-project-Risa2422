import { Request, Response } from "express";
import { Recipe } from "../types/recipe";
import { v4 as uuidv4 } from "uuid";

class RecipeModel {
  private recipes: Recipe[] = [
    {
      id: "1",
      title: "Miso Soup",
    },
    {
      id: "2",
      title: "Okoniyaki",
    },
  ];

  findAllRecipe(): Recipe[] {
    return this.recipes;
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
