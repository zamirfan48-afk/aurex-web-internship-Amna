
function CategoryFilter({ categories, value, onChange }) {
  return (
    <label className="category-field">
      <span>Category</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option value={category} key={category}>
            {category.replaceAll('-', ' ')}
          </option>
        ))}
      </select>
    </label>
  )
}

export default CategoryFilter
