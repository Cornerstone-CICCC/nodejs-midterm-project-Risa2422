"use client";

import { Recipe } from "@/types/recipe";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import Link from "next/link";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { loggedUserId } = useContext(UserContext) || { loggedUserId: null };
  const [isLoading, setIsLoading] = useState(true);

  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Recipe title is required" })
      .or(z.literal("")),
    cuisineType: z
      .string()
      .min(1, { message: "Cuisine type is required" })
      .or(z.literal("")),
    difficulty: z.enum(["Easy", "Medium", "Advanced"]).or(z.literal("")),
    about: z
      .string()
      .min(1, { message: "About description is required" })
      .or(z.literal("")),
    ingredients: z
      .string()
      .min(1, { message: "Ingredients are required" })
      .or(z.literal("")),
    procedure: z
      .string()
      .min(1, { message: "Procedure is required" })
      .or(z.literal("")),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
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
          form.reset({
            id: id,
            title: data.title,
            cuisineType: data.cuisineType,
            cookingTime: data.cookingTime,
            difficulty: data.difficulty,
            price: data.price,
            about: data.about,
            ingredients: data.ingredients,
            procedure: data.procedure,
          });

          setImageUrl(data.image);
        } catch (error) {
          setError("Failed to load recipe data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchRecipe();
    }
  }, [id, form]);

  const handleDelete = async () => {
    try {
      await deleteRecipeById(id);
      alert("Recipe deleted successfully!");
      router.push(`/mypage/${loggedUserId}`);
    } catch (error) {
      setError("Failed to delete recipe.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);

    const updatedData = {
      ...form.getValues(),
      date: new Date(),
    };

    try {
      if (imageFile) {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto pt-3 pb-10 px-60 bg-white shadow-lg rounded-lg">
      <div className="flex gap-2 pb-8">
        <Link href={`/`} className="text-sm text-gray-700 hover:text-gray-500">
          Top
        </Link>
        <p className="text-sm text-gray-700">{">"}</p>
        <Link
          href={`/mypage/${loggedUserId}`}
          className="text-sm text-gray-700 hover:text-gray-500"
        >
          Recipe
        </Link>
      </div>
      <h2 className="text-2xl font-semibold font-playfair tracking-wide mb-4">
        Edit Recipe
      </h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Image <span className="text-red-500">*</span>
                </FormLabel>
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
                    value={field.value || ""}
                    onChange={field.onChange}
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
              <FormItem className="w-[200px]">
                <FormLabel>
                  Cuisine Category
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    onChange={field.onChange}
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
              <FormItem className="w-[200px]">
                <FormLabel>
                  Total Price<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">$</span>
                    <Input
                      {...field}
                      type="number"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel>
                  Difficulty <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
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
                  About Recipe <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
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
                  Ingredients <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    onChange={field.onChange}
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
                  Procedure <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-x-4 flex justify-end">
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete Recipe
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Recipe"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RecipeEditForm;
