import PotLoader from "../recipes/PotLoader";

function PageLoader() {
  return (
    <div className="page-loader-overlay">
      <div className="page-loader-content">
        <PotLoader size="320px" />
        <h2 className="page-loader-title">Le Santos Diner</h2>
        <p className="page-loader-subtitle">Setting the table for you...</p>
      </div>
    </div>
  );
}

export default PageLoader;
