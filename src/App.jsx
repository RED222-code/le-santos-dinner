import { useEffect, useState } from "react";
import FoodPage from "./pages/FoodPage";
import IngredientsPage from "./pages/IngredientsPage";

function getCurrentRoute(hash = window.location.hash) {
  const recipeMatch = hash.match(/^#\/recipes\/(\d+)$/);

  if (recipeMatch) {
    return {
      type: "recipe",
      recipeId: Number(recipeMatch[1]),
    };
  }

  return { type: "home" };
}

function App() {
  const [route, setRoute] = useState(() => getCurrentRoute());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function handleHashChange() {
      setRoute(getCurrentRoute());
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // If we're not on the home page, redirect to home to show search results
    if (route.type !== "home") {
      window.location.hash = "#/";
    }
  };

  if (route.type === "recipe") {
    return (
      <IngredientsPage
        recipeId={route.recipeId}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
    );
  }

  return (
    <FoodPage
      searchQuery={searchQuery}
      onSearch={handleSearch}
    />
  );
}

export default App;
