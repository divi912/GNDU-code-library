const categories = [
  ['all', 'All'],
  ['materials', 'Study Materials'],
  ['links', 'Websites & Tools'],
  ['channels', 'Video Channels'],
]

export default function CategoryTabs({ activeCategory, onChange }) {
  return (
    <div className="category-tabs" role="group" aria-label="Resource category">
      {categories.map(([value, label]) => (
        <button
          key={value}
          type="button"
          className={activeCategory === value ? 'active' : ''}
          aria-pressed={activeCategory === value}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
