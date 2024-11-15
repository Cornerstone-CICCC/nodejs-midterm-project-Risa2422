import { Recipe } from "@/types/recipe";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  recipe: Recipe;
};

const MyRecipeCard = (props: Props) => {
  return (
    <>
      <Link href={`/recipe/${props.recipe.id}`}>
        <h2>My recipeよ</h2>
        <div className="my-8 w-52 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1">
          <div
            className="h-48 bg-cover bg-center"
            style={{ backgroundImage: "url(https://via.placeholder.com/400)" }}
          ></div>

          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {props.recipe.title}
            </h2>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MyRecipeCard;