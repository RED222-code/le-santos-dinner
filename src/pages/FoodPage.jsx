import { useEffect, useState } from "react";
import Image1 from "../assets/food1.jpg";
import Image2 from "../assets/food2.jpg";
import Image3 from "../assets/food3.jpg";
import Image4 from "../assets/AS-Pasta-with-spinach-meatballs-fqhk-articleLarge.jpg";
import Image5 from "../assets/Super-Bowl-Food-Recipes-1.jpg";
import Image6 from "../assets/hq720.jpg";
import Image7 from "../assets/lorelei-1_1_orig.jpg";
import Image8 from "../assets/pizza-vegetables-cheese-piece-wallpaper-preview.jpg";
import Image9 from "../assets/pydkcunkelh44uc70rys.jpeg";

import HeroSection from "../components/hero/HeroSection";
import Navbar from "../components/layout/Navbar";
import RecipesSection from "../components/recipes/RecipesSection";
import { useRecipes } from "../hooks/useRecipes";
import { motion } from "framer-motion";

const RECIPE_LIMIT = 900;
const SLIDE_CHANGE_DELAY_MS = 4500;
const GALLERY_IMAGES = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
];

function FoodPage({ searchQuery, onSearch, theme, toggleTheme }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { recipes, isLoading, errorMessage } = useRecipes(RECIPE_LIMIT);

  // Filter recipes based on the search query
  const filteredRecipes = recipes.filter((recipe) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    const nameMatch = recipe.name.toLowerCase().includes(query);
    const cuisineMatch = recipe.cuisine?.toLowerCase().includes(query);
    const categoryMatch = recipe.category?.toLowerCase().includes(query);
    const ingredientMatch = `${recipe.ingredientCount} ingredients`.includes(query);
    const stepMatch = `${recipe.stepCount} steps`.includes(query);
    const timeMatch = recipe.time?.toLowerCase().includes(query);
    const servingMatch = `Serves ${recipe.servings}`.toLowerCase().includes(query);

    return nameMatch || cuisineMatch || categoryMatch || ingredientMatch || stepMatch || timeMatch || servingMatch;
  });

  useEffect(() => {
    // Move to the next slide every few seconds to keep the hero lively.
    const slideTimer = setInterval(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % GALLERY_IMAGES.length);
    }, SLIDE_CHANGE_DELAY_MS);

    return () => clearInterval(slideTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Navbar searchQuery={searchQuery} onSearch={onSearch} theme={theme} toggleTheme={toggleTheme} />
      <HeroSection
        galleryImages={GALLERY_IMAGES}
        activeSlide={activeSlideIndex}
        onDotClick={setActiveSlideIndex}
      />
      <RecipesSection
        recipes={filteredRecipes}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onMetaClick={(item) => {
          if (onSearch) {
            onSearch(item);
            const recipesSection = document.getElementById("recipes");
            if (recipesSection) {
              recipesSection.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
      />
    </motion.div>
  );
}

export default FoodPage;
