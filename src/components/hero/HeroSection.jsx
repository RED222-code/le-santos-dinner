/**
 * This section holds the main heading on the left
 * and the slideshow on the right.
 */
const HERO_STATS = [
  { value: "120+", label: "easy recipes" },
  { value: "15 min", label: "quick ideas" },
  { value: "4.9/5", label: "home rating" },
];

function HeroSection({ galleryImages, activeSlide, onDotClick }) {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <div className="hero-content">
          <h1>
            A <span className="highlight">recipe</span> of happiness :)
          </h1>
          <h2>Cook like a chef</h2>

          <div className="button-group">
            <a className="btn btn-primary" href="#recipes">
              Explore recipes
            </a>
          </div>

          {/* A small array keeps repeated stat cards easy to read. */}
          <div className="hero-stats">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="stat-box">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-slideshow">
          {/* The active slide gets the "is-active" class for the fade effect. */}
          <div className="slideshow-frame">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`slide ${index === activeSlide ? "is-active" : ""}`}
              >
                <img src={image} alt={`Featured recipe ${index + 1}`} />
              </div>
            ))}
            <div className="slideshow-overlay" />
          </div>

          <div className="slideshow-dots" aria-label="Recipe slideshow navigation">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`slide-dot ${index === activeSlide ? "is-active" : ""}`}
                onClick={() => onDotClick(index)}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
