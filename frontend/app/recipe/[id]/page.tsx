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
  const data = params.id;

  const test = await getRecipeById(data);

  return (
    <>
      <div>{test.title}</div>
      <div>{test.cuisineType}</div>
      <div>{test.cookingTime}</div>
      <div>{test.difficulty}</div>
    </>
  );
};

export default RecipeDetail;
