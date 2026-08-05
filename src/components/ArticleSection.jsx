import articleHtml from '../data/ultimateBeginnersGuide.html?raw'

export default function ArticleSection() {
  return (
    <section id="article" className="article-section" aria-labelledby="article-title">
      <div className="container">
        <details className="article-details">
          <summary className="article-heading">
            <span className="eyebrow">From the GNDU coding community</span>
            <span id="article-title" className="article-title" role="heading" aria-level="2">Ultimate Begginer Guide to Coding</span>
            <span className="article-subtitle">Advice and perspective for starting your coding journey.</span>
            <span className="article-toggle">Read article</span>
          </summary>
          <div className="article-document" dangerouslySetInnerHTML={{ __html: articleHtml }} />
          <p className="article-source-note">
            Source: <a href="https://docs.google.com/document/d/e/2PACX-1vQoKIwKxijrN4605hMy4VmDo9ITVUGQA2tbNuyXaZGt-fMNrCJQlCmlCZawmzoWyEruYiwSSJuwYU5A/pub" target="_blank" rel="noopener noreferrer">The Ultimate Beginners Blueprint for Tech</a>
          </p>
        </details>
      </div>
    </section>
  )
}
