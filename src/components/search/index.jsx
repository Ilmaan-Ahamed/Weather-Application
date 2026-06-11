export default function Search({ search, setSearch, handleSearch }) {
  function onSubmit(e) {
    e.preventDefault();
    handleSearch();
  }

  return (
    <form className="search-engine" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="City name"
      />
      <button type="submit" aria-label="Search">
        Search
      </button>
    </form>
  );
}