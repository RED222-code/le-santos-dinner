import { useState } from "react";
import FoodCard from "./FoodCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RECIPES_PER_PAGE = 15;

function RecipesSection({ recipes, isLoading, errorMessage, onMetaClick }) {
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("recipesCurrentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const hasRecipes = recipes.length > 0;
  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);
  const activePage = Math.min(currentPage, totalPages || 1);
  const startIndex = (activePage - 1) * RECIPES_PER_PAGE;
  const visibleRecipes = recipes.slice(startIndex, startIndex + RECIPES_PER_PAGE);

  function handlePageChange(nextPage) {
    setCurrentPage(nextPage);
    sessionStorage.setItem("recipesCurrentPage", nextPage);

    const section = document.getElementById("recipes");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const getPaginationItems = (currentPage, totalPages) => {
    const delta = 1;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }
    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }
    return range;
  };

  const paginationItems = getPaginationItems(activePage, totalPages);

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
          <div className="recipes-empty">
            <p>We couldn&apos;t find any recipes matching your search.</p>
            <span className="recipes-empty-tip">Try searching for something else, like &quot;Pasta&quot;, &quot;Dessert&quot;, or &quot;Easy&quot;.</span>
          </div>
        )}

        {!isLoading && !errorMessage && hasRecipes && (
          <>
            <div className="recipes-grid">
              {visibleRecipes.map((recipe) => (
                <FoodCard key={recipe.id} recipe={recipe} onMetaClick={onMetaClick} />
              ))}
            </div>

            {totalPages > 1 && (
              <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <nav className="dock-container" aria-label="Featured recipes pages">
                  <button
                    type="button"
                    className="recipes-nav-icon"
                    onClick={() => handlePageChange(activePage - 1)}
                    disabled={activePage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="recipes-page-list" aria-label="Recipe page list">
                    {paginationItems.map((item, index) => {
                      if (item === "...") {
                        return (
                          <span key={`ellipsis-${index}`} className="recipes-page-ellipsis">
                            &hellip;
                          </span>
                        );
                      }
                      
                      const pageNumber = item;
                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          className={`recipes-page-number ${pageNumber === activePage ? "is-active" : ""}`}
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
                    className="recipes-nav-icon"
                    onClick={() => handlePageChange(activePage + 1)}
                    disabled={activePage === totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight size={20} />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default RecipesSection;
