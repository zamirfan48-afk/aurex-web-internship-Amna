
function SearchBar({ value, onChange }) {
  return (
    <label className="search-field">
      <span aria-hidden="true">⌕</span>
      <input
        type="search"
        placeholder="Search products…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search products"
      />
    </label>
  )
}

export default SearchBar
