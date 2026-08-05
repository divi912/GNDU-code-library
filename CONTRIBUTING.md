# Contributing resources

Thank you for sharing a programming resource with GNDU students. Adding a resource
is a content-only change: **do not modify React components just to add a resource.**

## Add a document

1. Place the document in `public/docs/`.
2. Name the file using the material ID.
3. Use lowercase kebab-case for IDs and filenames, such as `rust-ownership-notes`.
4. Add one object to the JSON array in `src/data/materials.json`.
5. Use a valid `YYYY-MM-DD` value for `addedAt`.
6. Ensure the ID is unique within the JSON array.
7. Ensure the document extension matches its `type`.
8. Run the project locally and test the **Download** link.
9. Submit the change through a GitHub pull request.

Valid metadata example:

```json
{
  "id": "rust-ownership-notes",
  "name": "Rust Ownership Notes",
  "description": "Study notes explaining ownership, borrowing and references in Rust.",
  "programmingLanguage": "Rust",
  "type": "PDF",
  "addedAt": "2026-08-05"
}
```

For repository documents, only use the six fields shown above. Do not add a file
path, author, tags, or other metadata. The application automatically turns the
example into `/docs/rust-ownership-notes.pdf`. The `url` field is reserved for
external resources described below.

## Add a YouTube video

YouTube materials do not need a file in `public/docs/`. Add the video URL and use
`YouTube` as the type:

```json
{
  "id": "javascript-promises-video",
  "name": "JavaScript Promises Explained",
  "description": "A video guide to creating, chaining, and handling promises.",
  "programmingLanguage": "JavaScript",
  "type": "YouTube",
  "addedAt": "2026-08-05",
  "url": "https://www.youtube.com/watch?v=VIDEO_ID_HERE"
}
```

Replace `VIDEO_ID_HERE` with the video's 11-character YouTube ID. Standard watch,
short, embed, live, and `youtu.be` links are supported. The thumbnail is generated
automatically, so do not add a thumbnail field.

## Add an external resource

Websites, AI tools, and YouTube channels use the same array with a `url` field. Use
`Website`, `AI Tool`, or `YouTube Channel` as the type:

```json
{
  "id": "programiz",
  "name": "Programiz",
  "programmingLanguage": "General",
  "type": "Website",
  "addedAt": "2026-08-05",
  "url": "https://www.programiz.com/"
}
```

Descriptions are optional for these compact external-resource rows. Use a unique
lowercase kebab-case ID and a complete `https://` URL. YouTube Channel entries should
link directly to the channel rather than to YouTube search results.

For a channel profile picture, place a square JPEG at
`public/channel-icons/<material-id>.jpg`. If it is missing, the interface falls back
to the official YouTube mark. Website and AI-tool icons live in `public/brand-icons/`
and follow the same material-ID naming convention.

## Supported file types

| `type` value | Required extension |
| --- | --- |
| `PDF` | `.pdf` |
| `DOCX` | `.docx` |
| `PPTX` | `.pptx` |
| `TXT` | `.txt` |
| `Markdown` | `.md` |
| `YouTube` | YouTube URL in the `url` field |
| `YouTube Channel` | Direct channel URL in the `url` field |
| `Website` | Website URL in the `url` field |
| `AI Tool` | Tool URL in the `url` field |

Before opening a pull request, run:

```bash
npm install
npm run dev
```

Search for your resource, check its filters and date, and open its link in
a new tab. Also run `npm run build` to catch production build errors.
