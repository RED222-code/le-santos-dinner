import { useEffect, useState } from "react";
import { fetchRecipeById } from "../services/recipes";

const DEFAULT_ERROR_MESSAGE = "We couldn't load that recipe right now.";

export function useRecipeDetails(recipeId) {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadRecipeDetails() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const nextRecipe = await fetchRecipeById(recipeId, {
          signal: controller.signal,
        });

        if (controller.signal.aborted) {
          return;
        }

        setRecipe(nextRecipe);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        if (controller.signal.aborted) {
          return;
        }

        console.error("Recipe detail fetch error:", error);
        setRecipe(null);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadRecipeDetails();

    return () => controller.abort();
  }, [recipeId]);

  return { recipe, isLoading, errorMessage };
}
