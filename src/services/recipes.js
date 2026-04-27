const RECIPES_API_URL = "https://www.themealdb.com/api/json/v1/1";
const DISCOVERY_LETTERS = ["b", "c", "m", "p", "s", "t"];
const DEFAULT_DESCRIPTION =
  "A plated house special with comforting flavors and a calm dining-room finish.";
const DEFAULT_PREP_TIME = "Chef's prep";
const DEFAULT_COOK_TIME = "Table-side finish";
const DEFAULT_TOTAL_TIME = "Kitchen timing";

function getRecipePath(recipeId) {
  return `#/recipes/${recipeId}`;
}

function normalizeText(text) {
  return String(text ?? "").replace(/\s+/g, " ").trim();
}

function parseInstructions(instructions) {
  const cleanedInstructions = normalizeText(instructions);

  if (!cleanedInstructions) {
    return [];
  }

  const lineSteps = cleanedInstructions
    .split(/\r?\n+/)
    .map((step) => step.replace(/^\d+\W*/, "").trim())
    .filter(Boolean);

  if (lineSteps.length > 1) {
    return lineSteps;
  }

  return cleanedInstructions
    .split(/(?<=[.!?])\s+/)
    .map((step) => step.replace(/^\d+\W*/, "").trim())
    .filter(Boolean);
}

function getRecipeDescription(instructions) {
  const [firstStep] = parseInstructions(instructions);

  if (!firstStep) {
    return DEFAULT_DESCRIPTION;
  }

  if (firstStep.length <= 150) {
    return firstStep;
  }

  return `${firstStep.slice(0, 147).trimEnd()}...`;
}

function parseTags(tags) {
  return String(tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getIngredients(meal) {
  const ingredients = [];

  for (let index = 1; index <= 20; index += 1) {
    const ingredient = normalizeText(meal[`strIngredient${index}`]);
    const measure = normalizeText(meal[`strMeasure${index}`]);

    if (!ingredient) {
      continue;
    }

    ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
  }

  return ingredients;
}

function estimatePrepTime(ingredientCount) {
  return Math.max(10, Math.min(32, ingredientCount * 3));
}

function estimateCookTime(stepCount) {
  return Math.max(15, Math.min(48, stepCount * 5));
}

function estimateServings(ingredientCount) {
  if (ingredientCount >= 10) {
    return 4;
  }

  if (ingredientCount >= 7) {
    return 3;
  }

  return 2;
}

function getDurationLabel(durationMinutes, fallbackLabel) {
  if (!durationMinutes) {
    return fallbackLabel;
  }

  return `${durationMinutes} mins`;
}

function getTotalTimeLabel(prepTimeMinutes, cookTimeMinutes) {
  const totalTimeMinutes = (prepTimeMinutes ?? 0) + (cookTimeMinutes ?? 0);

  if (!totalTimeMinutes) {
    return DEFAULT_TOTAL_TIME;
  }

  return `${totalTimeMinutes} mins total`;
}

function mapMealToCardData(meal) {
  const instructions = parseInstructions(meal.strInstructions);
  const ingredients = getIngredients(meal);
  const baseImage = meal.strMealThumb ?? "";

  return {
    id: Number(meal.idMeal),
    name: meal.strMeal,
    description: getRecipeDescription(meal.strInstructions),
    // Appending /preview to the URL returns a 100x100 thumbnail.
    image: baseImage || "",
    detailsPath: getRecipePath(meal.idMeal),
    cuisine: meal.strArea || "Chef's table",
    category: meal.strCategory || "Featured plate",
    ingredientCount: ingredients.length,
    stepCount: instructions.length,
  };
}

function mapMealToDetailData(meal) {
  const instructions = parseInstructions(meal.strInstructions);
  const ingredients = getIngredients(meal);
  const prepTimeMinutes = estimatePrepTime(ingredients.length);
  const cookTimeMinutes = estimateCookTime(instructions.length);

  return {
    id: Number(meal.idMeal),
    name: meal.strMeal,
    description: getRecipeDescription(meal.strInstructions),
    image: meal.strMealThumb ?? "",
    prepTime: getDurationLabel(prepTimeMinutes, DEFAULT_PREP_TIME),
    cookTime: getDurationLabel(cookTimeMinutes, DEFAULT_COOK_TIME),
    totalTime: getTotalTimeLabel(prepTimeMinutes, cookTimeMinutes),
    servings: estimateServings(ingredients.length),
    cuisine: meal.strArea || "Chef's selection",
    category: meal.strCategory || "Featured plate",
    tags: parseTags(meal.strTags),
    ingredients,
    instructions,
  };
}

async function fetchMealsByLetter(letter, signal) {
  const response = await fetch(`${RECIPES_API_URL}/search.php?f=${letter}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes for letter ${letter}: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data.meals) ? data.meals : [];
}

function interleaveMealBuckets(mealBuckets, limit) {
  const buckets = mealBuckets.map((bucket) => [...bucket]);
  const selectedMeals = [];

  while (selectedMeals.length < limit && buckets.some((bucket) => bucket.length > 0)) {
    buckets.forEach((bucket) => {
      if (selectedMeals.length >= limit || bucket.length === 0) {
        return;
      }

      selectedMeals.push(bucket.shift());
    });
  }

  return selectedMeals;
}

export async function fetchRecipes({ limit = 8, signal } = {}) {
  const results = await Promise.allSettled(
    DISCOVERY_LETTERS.map((letter) => fetchMealsByLetter(letter, signal))
  );

  const abortResult = results.find(
    (result) => result.status === "rejected" && result.reason?.name === "AbortError"
  );

  if (abortResult) {
    throw abortResult.reason;
  }

  const mealBuckets = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  if (mealBuckets.length === 0) {
    const firstError = results.find((result) => result.status === "rejected");
    throw firstError?.reason ?? new Error("Failed to fetch recipes.");
  }

  return interleaveMealBuckets(mealBuckets, limit).map(mapMealToCardData);
}

export async function fetchRecipeById(recipeId, { signal } = {}) {
  const response = await fetch(`${RECIPES_API_URL}/lookup.php?i=${recipeId}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipe ${recipeId}: ${response.status}`);
  }

  const data = await response.json();
  const [meal] = Array.isArray(data.meals) ? data.meals : [];

  if (!meal) {
    throw new Error(`Recipe ${recipeId} was not found.`);
  }

  return mapMealToDetailData(meal);
}
