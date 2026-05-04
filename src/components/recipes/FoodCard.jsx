import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

function getMetaItems(recipe) {
  const metaItems = [];

  if (recipe.cuisine) {
    metaItems.push(recipe.cuisine);
  }

  if (recipe.category) {
    metaItems.push(recipe.category);
  }

  if (recipe.ingredientCount) {
    metaItems.push(`${recipe.ingredientCount} ingredients`);
  }

  if (recipe.stepCount) {
    metaItems.push(`${recipe.stepCount} steps`);
  }

  if (recipe.time) {
    metaItems.push(recipe.time);
  }

  if (recipe.servings) {
    metaItems.push(`Serves ${recipe.servings}`);
  }

  return metaItems.slice(0, 2);
}
function FoodCard({ recipe, isLoading, onMetaClick }) {
  if (isLoading) {
    return (
      <div className="food-card is-loading" aria-busy="true">
        <div className="food-card-image skeleton"></div>
        <div className="food-card-content">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text" style={{width: "80%"}} />
          <div className="skeleton skeleton-button" />
        </div>
      </div>
    );
  }

  const { image, name, description, detailsPath, id } = recipe;
  const metaItems = getMetaItems(recipe);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("leSantosFavorites") || "[]");
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem("leSantosFavorites") || "[]");
    if (favorites.includes(id)) {
      const newFavs = favorites.filter(fId => fId !== id);
      localStorage.setItem("leSantosFavorites", JSON.stringify(newFavs));
      setIsFavorite(false);
    } else {
      favorites.push(id);
      localStorage.setItem("leSantosFavorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <article className="food-card">
      <div className="food-card-image">
        <img src={image} alt={name} loading="lazy" />
        <div className="food-card-overlay">
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
      </div>
      <div className="food-card-content">
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
          <h3>{name}</h3>
          <button 
            onClick={toggleFavorite}
            style={{
              background: "none", border: "none", cursor: "pointer", 
              color: isFavorite ? "var(--accent-gold)" : "var(--muted-color)",
              transition: "transform 0.2s ease, color 0.2s ease"
            }}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart fill={isFavorite ? "var(--accent-gold)" : "none"} size={24} />
          </button>
        </div>
        <p className="food-description">{description}</p>

        {metaItems.length > 0 && (
          <div className="food-meta" aria-label={`Details for ${name}`}>
            {metaItems.map((item) => (
              <span 
                key={item}
                onClick={() => onMetaClick && onMetaClick(item)}
                style={{ cursor: onMetaClick ? "pointer" : "default" }}
                title={onMetaClick ? `Filter by ${item}` : undefined}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <a
          className="recipe-btn"
          href={detailsPath}
          aria-label={`View the recipe for ${name}`}
        >
          View Recipe
        </a>
      </div>
    </article>
  );
}

export default FoodCard;
