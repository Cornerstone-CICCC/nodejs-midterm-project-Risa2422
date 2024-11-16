"use client";

import { Recipe } from "@/types/recipe";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/provider";

type RecipeFormData = {
  id: string;
  userId: string;
  title: string;
  cuisineType: string;
  cookingTime: number;
  difficulty: "easy" | "medium" | "advance";
  image: string;
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
  const { loggedUserId } = useContext(UserContext) || {
    loggedUserId: null,
  };

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
          });
        } catch (error) {
          setError("Failed to load recipe data");
        }
      };
      fetchRecipe();
    }
  }, [id]);

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
      setImageFile(e.target.files[0]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [name]: name === "cookingTime" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title || !formData.cuisineType || !formData.cookingTime) {
      setError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl = formData.image;

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
        ...formData,
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cuisineType"
            className="block text-sm font-medium text-gray-700"
          >
            Cuisine Type
          </label>
          <input
            type="text"
            id="cuisineType"
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cookingTime"
            className="block text-sm font-medium text-gray-700"
          >
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Cooking Time in minutes"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="difficulty"
            className="block text-sm font-medium text-gray-700"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="advance">Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Update Recipe"}
        </button>
      </form>

      <button
        onClick={handleDelete}
        disabled={isSubmitting}
        className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        }`}
      >
        Delete
      </button>
    </div>
  );
};

export default RecipeEditForm;
