"use client";

import { useEffect, useState } from "react";
import { Recipe } from "../../../types/recipe";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

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
    <div className="py-3 px-20 lg:px-[16rem]">
      <div className="flex gap-2">
        <Link href={`/`} className="text-sm text-gray-700 hover:text-gray-500">
          Top
        </Link>
        <p className="text-sm text-gray-700">{">"}</p>
        <p className="text-sm  text-gray-700">{"Recipe"}</p>
      </div>
      <div className="w-full mt-8">
        <h2 className="text-3xl font-semibold font-playfair tracking-wider mb-6">
          {recipe.title}
        </h2>
        <div className="flex flex-col lg:flex-row w-full mt-3 gap-5">
          <div className="flex basis-[70%] ">
            <img
              src={recipe.image}
              alt="recipe image "
              className="object-cover object-center w-full h-[18rem] lg:h-[24rem] rounded"
            />
          </div>
          <div className="flex flex-col gap-3 lg:px-4 basis-[30%] ">
            <ul className="flex flex-col gap-2">
              <li className="flex gap-3 items-center">
                <div className="flex basis-5">
                  <img
                    src="/location-dark.png"
                    alt="location"
                    className="w-full h-full"
                  />
                </div>
                {recipe.cuisineType}
              </li>
              <li className="flex gap-3 items-center">
                <div className="flex basis-5">
                  <img
                    src="/money.png"
                    alt="location"
                    className="w-full h-full"
                  />
                </div>
                {recipe.price}
              </li>
              <li className="flex gap-3 items-center">
                <div className="flex basis-5">
                  <img
                    src="/level.png"
                    alt="cooking level"
                    className="w-full h-full"
                  />
                </div>
                {recipe.difficulty}
              </li>
              <li className="flex gap-3 items-center">
                <div className="flex basis-5">
                  <img
                    src="/timer-dark.png"
                    alt="cooking time"
                    className="w-full h-full"
                  />
                </div>
                {recipe.cookingTime} mins
              </li>
              <li className="flex gap-3 items-center">
                <div className="flex basis-5">
                  <img
                    src="/calendar.png"
                    alt="location"
                    className="w-full h-full"
                  />
                </div>
                <p> {format(new Date(recipe.date), "yyyy-MM-dd")}</p>
              </li>

              <li className="flex gap-3 items-center">
                <div className="flex basis-5">
                  <img
                    src="/person.png"
                    alt="location"
                    className="w-full h-full"
                  />
                </div>
                {recipe.userId}
              </li>
            </ul>
            <p className="italic text-gray-700 text-sm leading-6">
              {recipe.about}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mt-10">
        <div className="flex flex-col basis-[70%] py-4">
          <h2 className="text-2xl border-b w-fit border-customRed font-semibold font-playfair tracking-wide">
            Procedure
          </h2>
          <div className="whitespace-pre-line mt-4">{recipe.procedure}</div>
        </div>
        <div className="flex flex-col basis-[30%]">
          <div className=" bg-customEcruWhite  lg:ml-4 p-4">
            <h2 className="text-2xl font-semibold font-playfair tracking-wide">
              Ingredients<span className="text-sm"> (serves1)</span>
            </h2>
            <div className="whitespace-pre-line mt-4">{recipe.ingredients}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
