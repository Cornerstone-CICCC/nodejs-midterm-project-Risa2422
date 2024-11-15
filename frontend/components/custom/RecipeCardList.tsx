import { Recipe } from "../../types/recipe"; // Recipeの型定義がある場合
import React from "react";
import RecipeCard from "./RecipeCard";

async function getAllRecipes() {
  const response = await fetch("http://localhost:3000/recipe", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data: Recipe[] = await response.json();
  return data;
}

const RecipeCardList = async () => {
  const recipes = await getAllRecipes();

  return (
    <div
      className="
      grid
      grid-flow-row
      gap-9
      text-neutral-600
      sm:grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4"
    >
      {recipes.length === 0 ? (
        <div>No recipes available.</div>
      ) : (
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
      )}
    </div>
  );
};

export default RecipeCardList;
