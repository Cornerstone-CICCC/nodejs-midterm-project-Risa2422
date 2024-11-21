"use client";

import { useState } from "react";
import RecipeCardList from "../components/custom/RecipeCardList";

export default function Home() {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="p-8 md:p-15">
      <main className="flex flex-col row-start-2 items-center">
        <div className="flex flex-col items-center gap-1 mb-4">
          <h1 className="text-3xl lg:text-3xl	font-playfair font-medium">
            Taste the World, One Recipe at a Time
          </h1>
          <p className="text-sm lg:text-md text-gray-500">
            Get inspired and try something new in your kitchen every day.
          </p>
        </div>

        <div className="mb-6 w-full max-w-md">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search for recipes or cuisine names"
            className="w-full my-2 p-3 border text-sm shadow-sm border-gray-400"
          />
        </div>

        <RecipeCardList
          isMypage={false}
          userId={"0"}
          searchInput={searchInput}
        />
      </main>
    </div>
  );
}
