import { Recipe } from "@/types/recipe";
import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

type Props = {
  recipe: Recipe;
};

const RecipeCard = (props: Props) => {
  return (
    <Link href={`/recipe/${props.recipe.id}`}>
      <div className="my-3 md:w-[220px] rounded  bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1 relative">
        <CldImage
          src={props.recipe.image}
          width="500"
          height="500"
          crop={{
            type: "auto",
            source: true,
          }}
          alt="recipe image"
        />
        <div className="py-3 px-2 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 overflow-auto">
            {props.recipe.title}
          </h2>
          <div className="flex gap-3">
            <div className="flex items-center gap-0.5">
              <div className="w-4">
                <img src="/location.png" alt="location" />
              </div>
              <p className="text-sm">{props.recipe.cuisineType}</p>
            </div>
            <div className="flex items-center gap-0.5">
              <div className="w-4">
                <img src="/timer.png" alt="cooking time" />
              </div>
              <p className="text-sm">{props.recipe.cookingTime}mins</p>
            </div>
          </div>
        </div>
        <div
          className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-sm text-white 
            ${
              props.recipe.difficulty === "Easy"
                ? "bg-[rgba(53,114,111,0.6)]"
                : props.recipe.difficulty === "Medium"
                ? "bg-[rgba(202,161,90,0.6)]"
                : "bg-[rgba(144,65,58,0.6)]"
            }`}
        >
          {props.recipe.difficulty}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
