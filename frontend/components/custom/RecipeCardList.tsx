"use client";
import { Recipe } from "../../types/recipe";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import MyRecipeCard from "./MyRecipeCard";
import { useParams } from "next/navigation";

type RecipeCardListProps = {
  isMypage: boolean;
  userId: string;
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
    throw new Error("Failed to fetch recipes");
  }

  const data: Recipe[] = await response.json();
  return data;
}

const RecipeCardList: React.FC<RecipeCardListProps> = ({
  isMypage,
  userId,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let fetchedRecipes;
        if (isMypage) {
          fetchedRecipes = await getRecipesByUserId(userId);
        } else {
          fetchedRecipes = await getAllRecipes();
        }
        setRecipes(fetchedRecipes);
      } catch (err) {
        setError("Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isMypage, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-flow-row gap-9 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
