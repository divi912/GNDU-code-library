import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterControls from './components/FilterControls.jsx'
import MaterialGrid from './components/MaterialGrid.jsx'
import ResourceList from './components/ResourceList.jsx'
import CategoryTabs from './components/CategoryTabs.jsx'
import EmptyState from './components/EmptyState.jsx'
import Footer from './components/Footer.jsx'
import GettingStarted from './components/GettingStarted.jsx'
import ArticleSection from './components/ArticleSection.jsx'
import rawMaterials from './data/materials.json'
import { prepareMaterials } from './utils/materialFile.js'

const materials = prepareMaterials(rawMaterials)

function compareMaterials(a, b, sort) {
  if (sort === 'name-asc') return a.name.localeCompare(b.name)
  if (sort === 'name-desc') return b.name.localeCompare(a.name)

  if (!a.addedAt && !b.addedAt) return a.name.localeCompare(b.name)
  if (!a.addedAt) return 1
  if (!b.addedAt) return -1

  const aTime = Date.parse(`${a.addedAt}T00:00:00Z`)
  const bTime = Date.parse(`${b.addedAt}T00:00:00Z`)
  return sort === 'oldest' ? aTime - bTime : bTime - aTime
}

export default function App() {
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState('all')
  const [type, setType] = useState('all')
  const [sort, setSort] = useState('newest')
  const [category, setCategory] = useState('materials')

  const categoryMaterials = useMemo(
    () => materials.filter((item) => item.resourceCategory === category),
    [category],
  )
  const languages = useMemo(
    () => [...new Set(categoryMaterials.map((item) => item.programmingLanguage))].sort((a, b) => a.localeCompare(b)),
    [categoryMaterials],
  )
  const types = useMemo(
    () => [...new Set(categoryMaterials.map((item) => item.type))].sort((a, b) => a.localeCompare(b)),
    [categoryMaterials],
  )

  const visibleMaterials = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()

    return materials
      .filter((material) => {
        const searchableValues = [
          material.name,
          material.programmingLanguage,
          material.type,
        ]
        if (material.hasDescription) searchableValues.push(material.description)
        const matchesSearch = !normalizedSearch || searchableValues
          .some((value) => value.toLocaleLowerCase().includes(normalizedSearch))
        const matchesLanguage = language === 'all' || material.programmingLanguage === language
        const matchesType = type === 'all' || material.type === type
        const matchesCategory = material.resourceCategory === category

        return matchesSearch && matchesLanguage && matchesType && matchesCategory
      })
      .sort((a, b) => compareMaterials(a, b, sort))
  }, [search, language, type, sort, category])

  const changeCategory = (nextCategory) => {
    setCategory(nextCategory)
    setLanguage('all')
    setType('all')
  }

  const clearControls = () => {
    setSearch('')
    setLanguage('all')
    setType('all')
  }

  return (
    <div className="app-shell">
      <Header />
      <main id="main-content">
        <section className="intro container" aria-labelledby="page-title">
          <p className="eyebrow">Student resource directory</p>
          <div className="intro-row">
            <div>
              <h1 id="page-title">GNDU Code Library</h1>
              <p>Programming notes, learning websites, tools, and video channels shared for GNDU students.</p>
            </div>
            <p className="material-total"><strong>{materials.length}</strong> resources available</p>
          </div>
        </section>

        <GettingStarted />
        <ArticleSection />

        <section id="resources" className="library container" aria-labelledby="library-title">
          <h2 id="library-title" className="visually-hidden">Browse resources</h2>
          <CategoryTabs activeCategory={category} onChange={changeCategory} />
          <div className="controls">
            <SearchBar value={search} onChange={setSearch} />
            <FilterControls
              languages={languages}
              types={types}
              language={language}
              type={type}
              sort={sort}
              onLanguageChange={setLanguage}
              onTypeChange={setType}
              onSortChange={setSort}
            />
          </div>

          <div className="results-heading">
            <p aria-live="polite" aria-atomic="true">
              <strong>{visibleMaterials.length}</strong> {visibleMaterials.length === 1 ? 'resource' : 'resources'}
            </p>
          </div>

          {visibleMaterials.length > 0
            ? (category === 'materials'
                ? <MaterialGrid materials={visibleMaterials} />
                : <ResourceList resources={visibleMaterials} />)
            : <EmptyState onClear={clearControls} />}

          {category === 'channels' && (
            <aside className="directory-note">
              <strong>Note</strong>
              <p>Everyone should stay active on social media platforms like Twitter (X), Reddit, and Instagram so that you stay updated on trends and the market.</p>
            </aside>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
