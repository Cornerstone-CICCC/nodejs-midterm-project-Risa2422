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
      <div className="my-8 w-52 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1">
        <CldImage
          src={props.recipe.image}
          width="500"
          height="500"
          crop={{
            type: "auto",
            source: true,
          }}
          alt=""
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {props.recipe.title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
