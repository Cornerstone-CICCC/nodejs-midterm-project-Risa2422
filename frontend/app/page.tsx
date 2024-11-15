import RecipeCardList from "../components/custom/RecipeCardList";

export default function Home() {
  return (
    <div className="p-20">
      <main className="flex flex-col row-start-2 items-center">
        {/* <Search /> */}
        <RecipeCardList />
      </main>
    </div>
  );
}
