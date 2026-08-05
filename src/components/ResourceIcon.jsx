import { useState } from 'react'
import { FileText } from 'lucide-react'
import {
  siC,
  siCplusplus,
  siJavascript,
  siMarkdown,
  siOpenjdk,
  siPython,
  siRust,
  siYoutube,
} from 'simple-icons'

const languageIcons = {
  C: siC,
  'C++': siCplusplus,
  Java: siOpenjdk,
  JavaScript: siJavascript,
  Markdown: siMarkdown,
  Python: siPython,
  Rust: siRust,
}

function SimpleIcon({ icon }) {
  const fill = icon.hex === '000000' ? 'currentColor' : `#${icon.hex}`

  return (
    <svg role="img" viewBox="0 0 24 24" fill={fill} aria-label={icon.title}>
      <path d={icon.path} />
    </svg>
  )
}

export default function ResourceIcon({ resource, compact = false }) {
  const [imageFailed, setImageFailed] = useState(false)
  const className = `resource-identity${compact ? ' compact' : ''}`

  if (resource.type === 'YouTube Channel') {
    if (imageFailed) {
      return <span className={className} aria-hidden="true"><SimpleIcon icon={siYoutube} /></span>
    }
    return (
      <span className={className} aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}channel-icons/${resource.id}.jpg`}
          alt=""
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      </span>
    )
  }

  if (['Website', 'AI Tool'].includes(resource.type)) {
    return (
      <span className={className} aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}brand-icons/${resource.id}.png`}
          alt=""
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      </span>
    )
  }

  if (resource.type === 'YouTube') {
    return <span className={className} aria-hidden="true"><SimpleIcon icon={siYoutube} /></span>
  }

  const languageIcon = languageIcons[resource.programmingLanguage]
  return (
    <span className={className} aria-hidden="true">
      {languageIcon ? <SimpleIcon icon={languageIcon} /> : <FileText size={18} />}
    </span>
  )
}
