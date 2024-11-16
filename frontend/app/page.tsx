import RecipeCardList from "../components/custom/RecipeCardList";

export default function Home() {
  return (
    <div className="p-16">
      <main className="flex flex-col row-start-2 items-center">
        {/* <Search /> */}
        <div className="flex flex-col items-center gap-1 mb-4">
          <h1 className="text-3xl	">Taste the World, One Recipe at a Time</h1>
          <p className="text-md">
            Get inspired and try something new in your kitchen every day.
          </p>
        </div>
        <RecipeCardList isMypage={false} userId={"0"} />
      </main>
    </div>
  );
}
