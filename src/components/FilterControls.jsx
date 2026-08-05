export default function FilterControls({
  languages,
  types,
  language,
  type,
  sort,
  onLanguageChange,
  onTypeChange,
  onSortChange,
}) {
  return (
    <div className="filter-controls">
      <div className="field">
        <label htmlFor="language-filter">Language</label>
        <select id="language-filter" value={language} onChange={(event) => onLanguageChange(event.target.value)}>
          <option value="all">All languages</option>
          {languages.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="type-filter">Resource type</label>
        <select id="type-filter" value={type} onChange={(event) => onTypeChange(event.target.value)}>
          <option value="all">All types</option>
          {types.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="sort-order">Sort by</label>
        <select id="sort-order" value={sort} onChange={(event) => onSortChange(event.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
        </select>
      </div>
    </div>
  )
}
