const NAVIGATION_ITEMS = [
  { label: "Home", href: "#/" },
  { label: "Recipes", href: "#recipes" },
  { label: "Contact", href: "mailto:hello@lesantosdiner.com" },
];

function Navbar({ searchQuery, onSearch }) {
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

        <div className="navbar-search">
          <input
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
      </nav>
    </header>
  );
}

export default Navbar;
