export type Recipe = {
  id: string;
  userId: string;
  title: string;
  cuisineType: string;
  cookingTime: number;
  difficulty: "Easy" | "Medium" | "Advanced";
  image: string;
  date: Date;
  price: number;
  about: string;
  ingredients: string;
  procedure: string;
};
