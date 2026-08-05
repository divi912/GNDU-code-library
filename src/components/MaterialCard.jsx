import { ArrowDownToLine, ArrowUpRight, Youtube } from 'lucide-react'
import ResourceIcon from './ResourceIcon.jsx'

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export default function MaterialCard({ material }) {
  const formattedDate = material.addedAt
    ? dateFormatter.format(new Date(`${material.addedAt}T00:00:00Z`))
    : 'Date unavailable'

  return (
    <article className="material-card">
      {material.thumbnailUrl && (
        <a
          className="video-thumbnail"
          href={material.materialUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${material.name} on YouTube in a new tab`}
        >
          <img src={material.thumbnailUrl} alt={`Thumbnail for ${material.name}`} loading="lazy" referrerPolicy="no-referrer" />
          <span className="play-mark" aria-hidden="true"><Youtube size={24} /></span>
        </a>
      )}
      <div className="card-topline">
        <span className="file-type"><ResourceIcon resource={material} compact />{material.type}</span>
        <time dateTime={material.addedAt ?? undefined}>{formattedDate}</time>
      </div>
      <div className="card-content">
        <h3>{material.name}</h3>
        <p>{material.description}</p>
      </div>
      <div className="card-footer">
        <span className="language">{material.programmingLanguage}</span>
        {material.materialUrl ? (
          <div className="card-actions">
            {material.isDocument ? (
              <a className="download-link" href={material.materialUrl} download aria-label={`Download ${material.name}`}>
                Download <ArrowDownToLine size={16} aria-hidden="true" />
              </a>
            ) : (
              <a
                className="open-link"
                href={material.materialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${material.actionLabel}: ${material.name} (opens in a new tab)`}
              >
                {material.actionLabel}<ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        ) : (
          <span className="unavailable" title="The material source is missing or unsupported">Material unavailable</span>
        )}
      </div>
    </article>
  )
}
