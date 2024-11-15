"use client";

import { Recipe } from "../../../types/recipe";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

async function getRecipeByUserId(id: string): Promise<Recipe> {
  const response = await fetch(`http://localhost:3000/recipe/user/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data: Recipe = await response.json();
  return data;
}

const MyRecipe = () => {
  const params = useParams();
  const userId: string | undefined = params.id;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await getRecipeByUserId(userId);
        setRecipe(fetchedRecipe);
      } catch (error: any) {
        setError(error.message || "Failed to fetch recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>No recipe found</div>;
  }

  return (
    <>
      <div>Your Recipe</div>
      <p>{recipe.title}</p>
      <p>{recipe.cuisineType}</p>
      <p>{recipe.cookingTime}</p>
    </>
  );
};

export default MyRecipe;
