import Navbar from "../components/layout/Navbar";
import { useRecipeDetails } from "../hooks/useRecipeDetails";
import { motion } from "framer-motion";

const EMPTY_INSTRUCTIONS_MESSAGE =
  "The chef notes for this recipe will be plated here soon.";

function buildRecipeChips(recipe) {
  return [recipe.cuisine, recipe.category, ...recipe.tags.slice(0, 3)].filter(Boolean);
}

function IngredientsPage({ recipeId, searchQuery, onSearch, theme, toggleTheme }) {
  const { recipe, isLoading, errorMessage } = useRecipeDetails(recipeId);

  if (isLoading) {
    return (
      <>
        <Navbar searchQuery={searchQuery} onSearch={onSearch} theme={theme} toggleTheme={toggleTheme} />
        <main className="ingredients-page">
          <section className="ingredients-hero">
            <div className="ingredients-copy-column">
              <div className="skeleton skeleton-text" style={{width: "120px", height: "20px", marginBottom: "30px"}} />
              <div className="skeleton skeleton-title" style={{width: "80%", height: "50px", marginBottom: "20px"}} />
              <div className="skeleton skeleton-text" style={{width: "100%", height: "20px", marginBottom: "10px"}} />
              <div className="skeleton skeleton-text" style={{width: "90%", height: "20px", marginBottom: "30px"}} />
              
              <div className="ingredients-meta-grid">
                <div className="skeleton" style={{height: "80px", borderRadius: "20px"}} />
                <div className="skeleton" style={{height: "80px", borderRadius: "20px"}} />
                <div className="skeleton" style={{height: "80px", borderRadius: "20px"}} />
                <div className="skeleton" style={{height: "80px", borderRadius: "20px"}} />
              </div>
            </div>
            <div className="ingredients-image-shell skeleton"></div>
          </section>
        </main>
      </>
    );
  }

  if (errorMessage || !recipe) {
    return (
      <>
        <Navbar searchQuery={searchQuery} onSearch={onSearch} theme={theme} toggleTheme={toggleTheme} />
        <main className="ingredients-page">
          <section className="ingredients-state">
            <div className="ingredients-state-card ingredients-state-card-error">
              <div className="ingredients-state-copy">
                <p className="section-label">Recipe details</p>
                <h1 className="ingredients-state-title">Recipe unavailable</h1>
                <p>{errorMessage}</p>
                <a className="page-back-link" href="#/">
                  Back to recipes
                </a>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  const recipeChips = buildRecipeChips(recipe);

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearch={onSearch} theme={theme} toggleTheme={toggleTheme} />
      <motion.main 
        className="ingredients-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <section className="ingredients-hero">
          <div className="ingredients-copy-column">
            <a className="page-back-link" href="#/">
              Back to recipes
            </a>

            <p className="section-label">Recipe details</p>
            <h1 className="ingredients-title">{recipe.name}</h1>
            <p className="ingredients-intro">{recipe.description}</p>

            <div className="ingredients-meta-grid">
              <div className="ingredients-meta-card">
                <span>Prep time</span>
                <strong>{recipe.prepTime}</strong>
              </div>
              <div className="ingredients-meta-card">
                <span>Cook time</span>
                <strong>{recipe.cookTime}</strong>
              </div>
              <div className="ingredients-meta-card">
                <span>Serves</span>
                <strong>{recipe.servings}</strong>
              </div>
              <div className="ingredients-meta-card">
                <span>Total time</span>
                <strong>{recipe.totalTime}</strong>
              </div>
            </div>

            <div className="ingredients-submeta">
              <p>{recipe.category}</p>
              <p>
                {recipe.instructions.length > 0
                  ? `${recipe.instructions.length} kitchen steps`
                  : "House method"}
              </p>
            </div>

            <div className="recipe-chip-row">
              {recipeChips.map((chip, index) => (
                <span key={`${chip}-${index}`} className="recipe-chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <motion.div 
            className="ingredients-image-shell"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={recipe.image} alt={recipe.name} loading="eager" />
          </motion.div>
        </section>

        <section className="ingredients-layout">
          <motion.article 
            className="ingredients-panel"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="panel-head">
              <p className="section-label">Ingredients</p>
              <h2 className="panel-title">What you&apos;ll need</h2>
              <p className="panel-copy">
                Everything gathered for a {recipe.servings}-serving table.
              </p>
            </div>

            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={`${ingredient}-${index}`}>{ingredient}</li>
              ))}
            </ul>
          </motion.article>

          <motion.article 
            className="ingredients-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="panel-head">
              <p className="section-label">Method</p>
              <h2 className="panel-title">Cook it step by step</h2>
              <p className="panel-copy">
                Follow the sequence below to plate the recipe with the same rhythm as
                the featured collection.
              </p>
            </div>

            {recipe.instructions.length > 0 ? (
              <ol className="instructions-list">
                {recipe.instructions.map((instruction, index) => (
                  <li key={`${instruction}-${index}`}>{instruction}</li>
                ))}
              </ol>
            ) : (
              <p className="instructions-empty">{EMPTY_INSTRUCTIONS_MESSAGE}</p>
            )}
          </motion.article>
        </section>
      </motion.main>
    </>
  );
}

export default IngredientsPage;
