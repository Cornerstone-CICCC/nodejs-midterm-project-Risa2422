export type Recipe = {
  id: string;
  title: string;
  cuisineType: string;
  cookingTime: number;
  difficulty: "easy" | "medium" | "advance";
};
