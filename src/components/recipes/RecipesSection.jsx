import { useState } from "react";
import FoodCard from "./FoodCard";

const RECIPES_PER_PAGE = 15;

function RecipesSection({ recipes, isLoading, errorMessage }) {
  const [currentPage, setCurrentPage] = useState(1);


  const hasRecipes = recipes.length > 0;
  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);
  const activePage = Math.min(currentPage, totalPages || 1);
  const startIndex = (activePage - 1) * RECIPES_PER_PAGE;
  const visibleRecipes = recipes.slice(startIndex, startIndex + RECIPES_PER_PAGE);

  function handlePageChange(nextPage) {
    setCurrentPage(nextPage);
  }

  return (
    <section className="recipes-section" id="recipes">
      <div className="recipes-container">
        <div className="section-head">
          <div>
            <p className="section-label">Featured recipes</p>
            <h2 className="section-title">Fresh from the kitchen</h2>
          </div>

        </div>

        {errorMessage && <p className="recipes-error">{errorMessage}</p>}

        {isLoading && (
          <div className="recipes-grid">
            {Array.from({ length: RECIPES_PER_PAGE }, (_, index) => (
              <FoodCard key={`skeleton-${index}`} isLoading />
            ))}
          </div>
        )}

        {!isLoading && !errorMessage && !hasRecipes && (
          <p className="recipes-empty">No recipes are available right now.</p>
        )}

        {!isLoading && !errorMessage && hasRecipes && (
          <>
            <div className="recipes-grid">
              {visibleRecipes.map((recipe) => (
                <FoodCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="recipes-pagination" aria-label="Featured recipes pages">
                <button
                  type="button"
                  className="recipes-page-button"
                  onClick={() => handlePageChange(activePage - 1)}
                  disabled={activePage === 1}
                >
                  Previous
                </button>

                <div className="recipes-page-list" aria-label="Recipe page list">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        className={`recipes-page-button recipes-page-number${pageNumber === activePage ? " is-active" : ""
                          }`}
                        onClick={() => handlePageChange(pageNumber)}
                        aria-current={pageNumber === activePage ? "page" : undefined}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="recipes-page-button"
                  onClick={() => handlePageChange(activePage + 1)}
                  disabled={activePage === totalPages}
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default RecipesSection;
