"use client";

import { UserContext } from "@/provider";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
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
import Link from "next/link";

const RecipeCreateForm = () => {
  const { loggedUserId } = useContext(UserContext) || { loggedUserId: null };
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formSchema = z.object({
    title: z.string().min(1, { message: "Recipe title is required" }),
    cuisineType: z.string().min(1, { message: "Cuisine type is required" }),
    // cookingTime: z
    //   .number()
    //   .positive({ message: "Cooking time must be a positive number" }),
    difficulty: z.enum(["Easy", "Medium", "Advanced"]),
    // price: z.number().positive({ message: "Price must be a positive number" }),
    about: z.string().min(1, { message: "About description is required" }),
    ingredients: z.string().min(1, { message: "Ingredients are required" }),
    procedure: z.string().min(1, { message: "Procedure is required" }),
  });

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const updatedData = {
      ...form.getValues(),
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
        userId: loggedUserId,
      };

      const response = await fetch("http://localhost:3000/recipe/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }

      alert("Recipe created successfully!");
      router.push(`/mypage/${loggedUserId}`);
    } catch (error) {
      setError("Failed to create recipe.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto pt-3 pb-10 px-64 bg-white shadow-lg rounded-lg">
      <div className="flex gap-2 pb-8">
        <Link href={`/`} className="text-sm text-gray-700 hover:text-gray-500">
          Top
        </Link>
        <p className="text-sm text-gray-700">{">"}</p>
        <p className="text-sm  text-gray-700">{"Create a Recipe"}</p>
      </div>
      <h2 className="text-2xl font-semibold font-playfair tracking-wide mb-4">
        Create a New Recipe
      </h2>
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
                  <Input {...field} />
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
                  Cuisine Category<span className="text-red-500 ">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
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
                    <Input {...field} type="number" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cookingTime"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel>
                  Total Time<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
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
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-[200px]">
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
                  <Input {...field} />
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
                    placeholder={
                      "1. Takoyaki flour (or tempura flour) - 1/2 cup\n\n2. Dashi stock (prepared from dashi powder or liquid) - 1/2 cup\n\n3. Egg - 1 large\n\n4. Octopus (boiled and diced) - About 2-3 small pieces\n\n5. Pickled ginger (beni shoga) - 1 tablespoon\n\n"
                    }
                    {...field}
                    className="h-[200px]"
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-36"
            >
              {isSubmitting ? "Submitting..." : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RecipeCreateForm;
