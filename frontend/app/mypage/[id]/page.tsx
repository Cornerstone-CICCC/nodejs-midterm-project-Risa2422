"use client";

import { useParams } from "next/navigation";
import RecipeCardList from "@/components/custom/RecipeCardList";
import Link from "next/link";

const MyRecipe = () => {
  const params = useParams();
  const userId = params.id as string;

  if (!userId) {
    return <div>Error: User ID not found.</div>;
  }

  return (
    <main className="flex flex-col items-center p-16">
      <RecipeCardList isMypage={true} userId={userId} />
    </main>
  );
};

export default MyRecipe;
