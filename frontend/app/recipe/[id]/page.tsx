"use client";

import { useEffect, useState } from "react";
import { Recipe } from "../../../types/recipe";
import { useParams } from "next/navigation";

type Params = {
  id?: string;
};

async function getRecipeById(id: string): Promise<Recipe> {
  const response = await fetch(`http://localhost:3000/recipe/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data: Recipe = await response.json();
  return data;
}

const RecipeDetail = () => {
  const { id } = useParams<Params>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const fetchedRecipe = await getRecipeById(id);
          setRecipe(fetchedRecipe);
        } catch (err) {
          setError("Failed to fetch recipe");
        } finally {
          setLoading(false);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

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
