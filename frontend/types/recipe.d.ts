export type Recipe = {
  id: string;
  userId: string;
  title: string;
  cuisineType: string;
  cookingTime: number;
  difficulty: "easy" | "medium" | "advance";
  recipeImage: File | null;
};
