"use client";

import { Recipe } from "../../types/recipe";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import MyRecipeCard from "./MyRecipeCard";

type RecipeCardListProps = {
  isMypage: boolean;
  userId: string;
  searchInput: string;
};

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

async function getRecipesByUserId(id: string) {
  const response = await fetch(`http://localhost:3000/recipe/user/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("No Recipes");
  }

  const data: Recipe[] = await response.json();
  return data;
}

const RecipeCardList: React.FC<RecipeCardListProps> = ({
  isMypage,
  userId,
  searchInput,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let fetchedRecipes: Recipe[];

        if (isMypage) {
          fetchedRecipes = await getRecipesByUserId(userId);
        } else {
          fetchedRecipes = await getAllRecipes();
        }

        if (searchInput) {
          fetchedRecipes = fetchedRecipes.filter(
            (recipe) =>
              recipe.title.toLowerCase().includes(searchInput.toLowerCase()) ||
              recipe.cuisineType
                .toLowerCase()
                .includes(searchInput.toLowerCase())
          );
        }

        setRecipes(fetchedRecipes);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isMypage, userId, searchInput]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-flow-row gap-6 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.length === 0 ? (
        <div>No recipes available.</div>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id}>
            {isMypage ? (
              <MyRecipeCard recipe={recipe} userId={userId} />
            ) : (
              <RecipeCard recipe={recipe} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeCardList;
