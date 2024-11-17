"use client";

import { Recipe } from "@/types/recipe";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/provider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type RecipeFormData = {
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

async function deleteRecipeById(id: string): Promise<void> {
  const response = await fetch(`http://localhost:3000/recipe/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete recipe");
  }
}

const RecipeEditForm = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [formData, setFormData] = useState<RecipeFormData | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { loggedUserId } = useContext(UserContext) || {
    loggedUserId: null,
  };

  const formSchema = z.object({
    title: z.string().min(1, { message: "Recipe title is required" }),
    cuisineType: z.string().min(1, { message: "Cuisine type is required" }),
    // cookingTime: z.number(),
    difficulty: z.enum(["Easy", "Medium", "Advanced"]),
    // price: z.number().positive({ message: "Price must be a positive number" }),
    about: z.string().min(1, { message: "About description is required" }),
    ingredients: z.string().min(1, { message: "Ingredients are required" }),
    procedure: z.string().min(1, { message: "Procedure is required" }),
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const numberFields = ["cookingTime", "price"];
    const parsedValue = numberFields.includes(name)
      ? isNaN(parseInt(value))
        ? 0
        : parseInt(value)
      : value;
      
    setFormData((prevData) => ({
      ...prevData!,
      [name]: parsedValue,
    }));
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      cuisineType: "",
      cookingTime: 0,
      difficulty: "Easy",
      image: "",
      price: 0,
      about: "",
      ingredients: "",
      procedure: "",
      date: new Date(),
    },
  });

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const data = await getRecipeById(id);
          setFormData({
            id: data.id,
            userId: data.userId,
            title: data.title,
            cuisineType: data.cuisineType,
            cookingTime: data.cookingTime,
            difficulty: data.difficulty,
            image: data.image,
            date: data.date,
            price: data.price,
            about: data.about,
            ingredients: data.ingredients,
            procedure: data.procedure,
          });
          setImageUrl(data.image);
        } catch (error) {
          setError("Failed to load recipe data");
        }
      };

      fetchRecipe();
    }
  }, [id, form]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteRecipeById(id);
      alert("Recipe deleted successfully!");
      router.push(`/mypage/${loggedUserId}`);
    } catch (error) {
      setError("Failed to delete recipe.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);

    const updatedData = {
      ...formData,
      date: new Date(),
    };

    try {
      let imageUrl = updatedData.image;

      if (imageFile) {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("image", imageFile);

        const response = await fetch(`http://localhost:3000/upload`, {
          method: "POST",
          body: formDataToSubmit,
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const result = await response.json();
        imageUrl = result.result.url;
      }

      const updatedFormData = {
        ...updatedData,
        image: imageUrl,
      };

      const updateResponse = await fetch(
        `http://localhost:3000/recipe/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
          credentials: "include",
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update recipe");
      }

      alert("Recipe updated successfully!");
      router.push(`/mypage/${loggedUserId}`);
    } catch (error) {
      setError("Failed to update recipe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto py-16 px-60 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="file"
                    onChange={(e) => {
                      handleImageChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Selected image preview"
                className="h-80"
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Recipe Title<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={formData.title}
                    onChange={(e) => {
                      handleChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cuisineType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Cuisine Category<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={formData.cuisineType}
                    onChange={(e) => {
                      handleChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Total Price<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    value={formData?.price || ""} // 文字列に変換して設定
                    onChange={(e) => {
                      handleChange(e); // handleChange で値を処理
                      field.onChange(e); // React Hook Form の onChange も呼ぶ
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cookingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Total Time<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => {
                      handleChange(e);
                      field.onChange(e);
                    }}
                    value={formData.cookingTime}
                  />
                </FormControl>
                <FormDescription>
                  Please enter total time in minutes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Cooking Difficulty<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onChange={(e) => {
                      handleChange(e);
                      field.onChange(e);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  About Recipe<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={formData.about}
                    onChange={(e) => {
                      handleChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Please enter within 60 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Ingredients<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-[200px]"
                    value={formData.ingredients}
                    onChange={(e) => {
                      handleChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="procedure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Procedure<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`1.Prepare the batter: In a bowl, mix the flour, dashi stock, egg, baking powder, and salt until smooth.\n\n2.Preheat the takoyaki pan: Heat a takoyaki grill or non-stick pan over medium heat. Grease each hole with a little oil.\n\n3.Fill the pan: Pour the batter into each hole, filling them about 3/4 full. Add chopped octopus, tempura scraps, ginger, and green onions into each hole.`}
                    {...field}
                    className="h-[200px]"
                    value={formData.procedure}
                    onChange={(e) => {
                      handleChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RecipeEditForm;
