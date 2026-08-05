import { ArrowDownToLine, ArrowUpRight } from 'lucide-react'
import ResourceIcon from './ResourceIcon.jsx'

export default function ResourceList({ resources }) {
  return (
    <div className="compact-resource-list">
      {resources.map((resource) => (
        <article className="compact-resource" key={resource.renderKey}>
          <ResourceIcon resource={resource} />
          <div className="resource-summary">
            <h3>{resource.name}</h3>
            <p className="resource-meta">{resource.type} · {resource.programmingLanguage}</p>
            {resource.hasDescription && <p className="resource-description">{resource.description}</p>}
          </div>
          {resource.materialUrl ? (
            <div className="compact-actions">
              {resource.isDocument ? (
                <a href={resource.materialUrl} download aria-label={`Download ${resource.name}`}>
                  <span>Download</span><ArrowDownToLine size={16} aria-hidden="true" />
                </a>
              ) : (
                <a
                  href={resource.materialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${resource.actionLabel}: ${resource.name} (opens in a new tab)`}
                >
                  <span>{resource.actionLabel}</span><ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          ) : (
            <span className="unavailable">Unavailable</span>
          )}
        </article>
      ))}
    </div>
  )
}
