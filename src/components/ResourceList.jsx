import { ArrowDownToLine, ArrowUpRight } from 'lucide-react'
import ResourceIcon from './ResourceIcon.jsx'

export default function ResourceList({ resources }) {
  return (
    <div className="resource-grid">
      {resources.map((resource) => (
        <article className="resource-card" key={resource.renderKey}>
          <div className="resource-card-topline">
            <ResourceIcon resource={resource} />
            <span className="resource-kind">{resource.type}</span>
          </div>
          <div className="resource-card-content">
            <h3>{resource.name}</h3>
            <p className="resource-meta">{resource.programmingLanguage}</p>
            {resource.hasDescription && <p className="resource-description">{resource.description}</p>}
          </div>
          <div className="resource-card-footer">
            {resource.materialUrl ? (
              resource.isDocument ? (
                <a className="resource-action" href={resource.materialUrl} download aria-label={`Download ${resource.name}`}>
                  <span>Download</span><ArrowDownToLine size={16} aria-hidden="true" />
                </a>
              ) : (
                <a
                  className="resource-action"
                  href={resource.materialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${resource.actionLabel}: ${resource.name} (opens in a new tab)`}
                >
                  <span>{resource.actionLabel}</span><ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )
            ) : (
              <span className="unavailable">Unavailable</span>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
