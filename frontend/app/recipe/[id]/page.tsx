"use client";

import { Recipe } from "../../../types/recipe";
import { useParams } from "next/navigation";

async function getRecipeById(id: string) {
  const response = await fetch(`http://localhost:3000/recipe/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data: Recipe = await response.json();
  return data;
}

const RecipeDetail = async () => {
  const params = useParams();
  const data = params.id as string;
  const recipe = await getRecipeById(data);

  return (
    <>
      <div>{recipe.title}</div>
      <div>{recipe.cuisineType}</div>
      <div>{recipe.cookingTime}</div>
      <div>{recipe.difficulty}</div>
    </>
  );
};

export default RecipeDetail;
