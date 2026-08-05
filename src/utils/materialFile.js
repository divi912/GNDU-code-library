const TYPE_EXTENSIONS = Object.freeze({
  PDF: '.pdf',
  DOCX: '.docx',
  PPTX: '.pptx',
  TXT: '.txt',
  MARKDOWN: '.md',
})

const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtu.be',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
])

const EXTERNAL_TYPES = new Set(['WEBSITE', 'AI TOOL', 'YOUTUBE CHANNEL'])

export function getExtensionForType(type) {
  if (typeof type !== 'string') return null
  return TYPE_EXTENSIONS[type.trim().toUpperCase()] ?? null
}

export function getMaterialPath(id, type) {
  const extension = getExtensionForType(type)

  if (typeof id !== 'string' || !id.trim() || !extension) return null

  return `${import.meta.env.BASE_URL}docs/${encodeURIComponent(id.trim())}${extension}`
}

export function getYouTubeVideoId(value) {
  if (typeof value !== 'string' || !value.trim()) return null

  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' || !YOUTUBE_HOSTS.has(url.hostname)) return null

    let videoId = null
    if (url.hostname.endsWith('youtu.be')) {
      videoId = url.pathname.split('/').filter(Boolean)[0]
    } else if (url.pathname === '/watch') {
      videoId = url.searchParams.get('v')
    } else {
      const [kind, id] = url.pathname.split('/').filter(Boolean)
      if (['embed', 'shorts', 'live'].includes(kind)) videoId = id
    }

    return typeof videoId === 'string' && /^[A-Za-z0-9_-]{11}$/.test(videoId)
      ? videoId
      : null
  } catch {
    return null
  }
}

export function getYouTubeThumbnailUrl(videoId) {
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null
}

function getExternalUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null

  try {
    const url = new URL(value.trim())
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}

function getResourceCategory(type) {
  const normalizedType = type.toUpperCase()
  if (['WEBSITE', 'AI TOOL'].includes(normalizedType)) return 'links'
  if (normalizedType === 'YOUTUBE CHANNEL') return 'channels'
  return 'materials'
}

function getActionLabel(type) {
  const normalizedType = type.toUpperCase()
  if (getExtensionForType(type)) return 'Download'
  if (normalizedType === 'WEBSITE') return 'Visit website'
  if (normalizedType === 'AI TOOL') return 'Open tool'
  if (normalizedType === 'YOUTUBE') return 'Watch video'
  if (normalizedType === 'YOUTUBE CHANNEL') return 'View channel'
  return 'Open material'
}

export function isValidIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function prepareMaterials(items) {
  if (!Array.isArray(items)) {
    console.warn('[materials.json] Expected a JSON array.')
    return []
  }

  const idCounts = new Map()

  return items.map((item, index) => {
    const source = item && typeof item === 'object' ? item : {}
    const id = typeof source.id === 'string' ? source.id.trim() : ''
    const name = typeof source.name === 'string' && source.name.trim()
      ? source.name.trim()
      : 'Untitled material'
    const hasDescription = typeof source.description === 'string' && Boolean(source.description.trim())
    const description = hasDescription
      ? source.description.trim()
      : 'No description is available for this material.'
    const programmingLanguage =
      typeof source.programmingLanguage === 'string' && source.programmingLanguage.trim()
        ? source.programmingLanguage.trim()
        : 'Unspecified'
    const type = typeof source.type === 'string' && source.type.trim()
      ? source.type.trim()
      : 'Unknown'
    const validDate = isValidIsoDate(source.addedAt)
    const isYouTube = type.toUpperCase() === 'YOUTUBE'
    const isExternal = EXTERNAL_TYPES.has(type.toUpperCase())
    const isDocument = Boolean(getExtensionForType(type))
    const videoId = isYouTube ? getYouTubeVideoId(source.url) : null
    const materialUrl = isYouTube
      ? (videoId ? source.url.trim() : null)
      : (isExternal ? getExternalUrl(source.url) : getMaterialPath(id, type))

    if (!item || typeof item !== 'object') {
      console.warn(`[materials.json] Entry ${index + 1} is not an object.`)
    }
    if (!id) console.warn(`[materials.json] Entry ${index + 1} is missing an id.`)
    if (name === 'Untitled material') {
      console.warn(`[materials.json] Entry ${index + 1} is missing a name.`)
    }
    if (!hasDescription && !isExternal) {
      console.warn(`[materials.json] Entry ${index + 1} is missing a description.`)
    }
    if (!validDate) {
      console.warn(`[materials.json] "${id || `entry-${index + 1}`}" has an invalid addedAt date.`)
    }
    if (isYouTube && !videoId) {
      console.warn(`[materials.json] "${id || `entry-${index + 1}`}" has an invalid YouTube url.`)
    } else if (isExternal && !materialUrl) {
      console.warn(`[materials.json] "${id || `entry-${index + 1}`}" has an invalid external url.`)
    } else if (!isYouTube && !getExtensionForType(type)) {
      if (!isExternal) {
        console.warn(`[materials.json] "${id || `entry-${index + 1}`}" has unsupported type "${type}".`)
      }
    }

    const duplicateNumber = (idCounts.get(id) ?? 0) + 1
    idCounts.set(id, duplicateNumber)
    if (id && duplicateNumber > 1) {
      console.warn(`[materials.json] Duplicate id "${id}" at entry ${index + 1}.`)
    }

    return {
      id,
      name,
      description,
      hasDescription,
      programmingLanguage,
      type,
      addedAt: validDate ? source.addedAt : null,
      materialUrl,
      thumbnailUrl: getYouTubeThumbnailUrl(videoId),
      isYouTube,
      isDocument,
      resourceCategory: getResourceCategory(type),
      actionLabel: getActionLabel(type),
      renderKey: `${id || 'missing-id'}-${duplicateNumber}`,
    }
  })
}
