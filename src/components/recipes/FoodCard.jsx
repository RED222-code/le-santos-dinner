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

  return metaItems.slice(0, 4);
}

function FoodCard({ recipe, isLoading }) {
  if (isLoading) {
    return (
      <div className="food-card is-loading" aria-busy="true">
        <div className="food-card-image skeleton" />
        <div className="food-card-content">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-button" />
        </div>
      </div>
    );
  }

  const { image, name, description, detailsPath } = recipe;
  const metaItems = getMetaItems(recipe);

  return (
    <article className="food-card">
      <div className="food-card-image">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <div className="food-card-content">
        <h3>{name}</h3>
        <p className="food-description">{description}</p>

        {metaItems.length > 0 && (
          <div className="food-meta" aria-label={`Details for ${name}`}>
            {metaItems.map((item) => (
              <span key={item}>{item}</span>
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
