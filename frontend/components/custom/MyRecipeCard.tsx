import { Recipe } from "@/types/recipe";
import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { format } from "date-fns";

type Props = {
  recipe: Recipe;
  userId?: string;
};

const MyRecipeCard = (props: Props) => {
  return (
    <>
      <Link href={`http://localhost:3002/recipe/${props.recipe.id}`}>
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
          <div className="py-3 px-2 flex flex-col ">
            <h2 className="text-lg font-semibold text-gray-800 overflow-auto">
              {props.recipe.title}
            </h2>
            <div className="flex gap-0.5">
              <div className="w-4">
                <img src="/calendar.png" alt="location" />
              </div>
              <p className="text-sm items-end">
                {format(new Date(props.recipe.date), "yyyy-MM-dd")}
              </p>
            </div>
            <Link
              href={`http://localhost:3002/mypage/recipe/${props.recipe.id}`}
            >
              <div className="absolute top-2 right-1 py-0.5">
                <img src="/edit.png" alt="location" className="w-6" />
              </div>
            </Link>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MyRecipeCard;
