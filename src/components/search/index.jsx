export default function Search({ search, setSearch, handleSearch, favorites = [], onSelectFavorite, onUseLocation }) {
  function onSubmit(e) {
    e.preventDefault();
    handleSearch();
  }

  return (
    <div>
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
        <button type="button" onClick={onUseLocation} title="Use my location" style={{marginLeft:8}}>
          Use my location
        </button>
      </form>

      {favorites && favorites.length > 0 && (
        <div className="favorites-list" style={{marginTop:8,display:'flex',gap:8}}>
          {favorites.map((f) => (
            <button key={f} onClick={() => onSelectFavorite(f)} style={{borderRadius:8,padding:'6px 8px',background:'transparent',border:'1px solid rgba(212,175,55,0.08)'}}>
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}