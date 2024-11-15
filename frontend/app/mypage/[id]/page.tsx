"use client";

import { useParams } from "next/navigation";
import RecipeCardList from "@/components/custom/RecipeCardList";
import Link from "next/link";

const MyRecipe = () => {
  const params = useParams();
  const userId: string | undefined = params.id;

  if (!userId) {
    return <div>Error: User ID not found.</div>;
  }

  return (
    <>
      <Link href={`http://localhost:3002/mypage/recipe/create`}>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Add
        </button>
      </Link>

      <RecipeCardList isMypage={true} userId={userId} />
    </>
  );
};

export default MyRecipe;
