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

function FoodPage({ searchQuery, onSearch }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { recipes, isLoading, errorMessage } = useRecipes(RECIPE_LIMIT);

  // Filter recipes based on the search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Move to the next slide every few seconds to keep the hero lively.
    const slideTimer = setInterval(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % GALLERY_IMAGES.length);
    }, SLIDE_CHANGE_DELAY_MS);

    return () => clearInterval(slideTimer);
  }, []);

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearch={onSearch} />
      <HeroSection
        galleryImages={GALLERY_IMAGES}
        activeSlide={activeSlideIndex}
        onDotClick={setActiveSlideIndex}
      />
      <RecipesSection
        recipes={filteredRecipes}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </>
  );
}

export default FoodPage;
