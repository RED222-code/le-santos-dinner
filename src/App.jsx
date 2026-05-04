import { useEffect, useState } from "react";
import FoodPage from "./pages/FoodPage";
import IngredientsPage from "./pages/IngredientsPage";
import PageLoader from "./components/layout/PageLoader";
import { AnimatePresence } from "framer-motion";

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem("leSantosTheme") || "dark");

  useEffect(() => {
    // Show the pot loader for a bit on initial load
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("leSantosTheme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    function handleHashChange() {
      const nextRoute = getCurrentRoute();
      
      // Only show transition loader when moving TO a recipe page
      if (nextRoute.type === "recipe") {
        setIsTransitioning(true);
        setTimeout(() => {
          setRoute(nextRoute);
          setIsTransitioning(false);
        }, 800);
      } else {
        setRoute(nextRoute);
      }
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (route.type !== "home") {
      window.location.hash = "#/";
    }
  };

  return (
    <>
      {(isTransitioning || isInitialLoading) && <PageLoader />}
      <AnimatePresence mode="wait">
        {route.type === "recipe" ? (
          <IngredientsPage
            key="recipe"
            recipeId={route.recipeId}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : (
          <FoodPage
            key="home"
            searchQuery={searchQuery}
            onSearch={handleSearch}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
