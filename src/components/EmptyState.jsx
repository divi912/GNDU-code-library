import { SearchX } from 'lucide-react'

export default function EmptyState({ onClear }) {
  return (
    <div className="empty-state">
      <SearchX size={28} aria-hidden="true" />
      <h2>No resources found</h2>
      <p>Try a different search or reset the selected filters.</p>
      <button type="button" onClick={onClear}>Clear search and filters</button>
    </div>
  )
}
