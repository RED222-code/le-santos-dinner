import { Moon, Sun } from "lucide-react";

const NAVIGATION_ITEMS = [
  { label: "Home", href: "#/" },
  { label: "Recipes", href: "#recipes" },
  { label: "Contact", href: "mailto:hello@lesantosdiner.com" },
];

function Navbar({ searchQuery, onSearch, theme, toggleTheme }) {
  return (
    <header className="navbar-shell">
      <nav className="navbar">
        <a className="logo" href="#/">
          Le Santos Diner
        </a>

        {/* Keeping the links in an array makes this list easier to scan and update. */}
        <ul>
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="navbar-search" style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <div style={{position: 'relative', width: '100%'}}>
            <label htmlFor="navbar-search-input" className="sr-only">Search recipes</label>
            <input
              id="navbar-search-input"
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Search recipes by name"
            />
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer', display: 'flex'}}>
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
