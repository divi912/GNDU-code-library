import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="field search-field">
      <label htmlFor="material-search">Search resources</label>
      <div className="search-input-wrap">
        <Search size={18} aria-hidden="true" />
        <input
          id="material-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search materials, websites, tools, or channels"
          autoComplete="off"
        />
      </div>
    </div>
  )
}
