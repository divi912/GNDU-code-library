import { Code2, Github } from 'lucide-react'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#main-content" aria-label="GNDU Code Library home">
          <span className="brand-mark" aria-hidden="true"><Code2 size={18} /></span>
          <span>GNDU Code Library</span>
        </a>
        <div className="header-actions">
          <nav className="header-nav" aria-label="Page sections">
            <a href="#getting-started">Getting Started</a>
            <a href="#article">Article</a>
            <a href="#resources">Resources</a>
          </nav>
          <a
            className="github-link"
            href="https://github.com/divi912/GNDU-code-library"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GNDU Code Library on GitHub (opens in a new tab)"
          >
            <Github size={18} aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  )
}
