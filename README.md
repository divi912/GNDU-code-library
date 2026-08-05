# GNDU Code Library

GNDU Code Library is a student-created directory for programming notes, reference
documents, cheat sheets, and guides shared with coding-interested GNDU students.
It is a focused, static React site—not an official Guru Nanak Dev University website.

## Run locally

Requirements: a current LTS release of Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To verify a production build:

```bash
npm run build
npm run preview
```

## How content works

All catalogue metadata lives in the JSON array at
`src/data/materials.json`. Documents live in `public/docs/`. The application derives
document URLs from each material's `id` and `type`; external resources use a `url`.

For example, an item with the ID `rust-ownership-notes` and type `PDF` opens:

```text
/docs/rust-ownership-notes.pdf
```

Supported types are PDF, DOCX, PPTX, TXT, Markdown, YouTube, YouTube Channel,
Website, and AI Tool. The file extension mapping, external URL validation, YouTube
URL parsing, and thumbnail generation are centralized in `src/utils/materialFile.js`.
Invalid entries receive safe fallback content and development warnings instead of
crashing the page.

The catalogue contains the supplied websites, AI tools, and video channels. Add real,
appropriately licensed files to `public/docs/` when contributing study material.

Document resources show a direct download action. External resources retain their
normal outbound links.

## Add a resource

Adding content does not require editing a React component. Add one metadata object
to `src/data/materials.json`; repository documents also need the correctly named file
in `public/docs/`. See [CONTRIBUTING.md](CONTRIBUTING.md) for complete examples.

## Deployment

The repository includes a GitHub Actions workflow at
`.github/workflows/deploy.yml`. It installs dependencies, builds `dist/`, and
publishes the result to GitHub Pages whenever `main` is pushed.

In the repository settings, set Pages' source to **GitHub Actions**. Vite detects
the GitHub repository name automatically so links work when the site is hosted
under a repository subpath. No database, server, or runtime environment variables
are required.

## Project structure

```text
public/docs/             Document files
src/components/          Reusable interface components
src/data/materials.json  Material metadata
src/utils/materialFile.js File-type mapping and validation
src/styles/global.css    Responsive light and dark styles
```
