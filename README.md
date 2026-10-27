# Iqbal Hasan Portfolio — Updated Next.js Source

Complete Next.js 14 App Router project using TypeScript, React 18, Tailwind CSS, Three.js, GSAP and Lenis.

## Requirements
Node.js 20 LTS and npm.

## Run locally
```bash
npm ci
npm run dev
```
Open http://localhost:3000.

## Production build
```bash
npm run typecheck
npm run build
```
This project uses `output: "export"`. The generated `out/` folder is the deployable static website. Deploy with Next.js detection on a hosting provider, or serve `out/` with a static web server. `next start` is not supported for static export.

## Latest included changes
- Six distinct project thumbnails composed from actual Figma artwork.
- Each project detail shows only its own screens, Problem and Solution.
- New identity-preserving portrait in the hero; a normal static image with no cursor, entrance or scroll transforms.
- Existing responsive pages, shared components, service interactions and background Three.js animation retained.

## Content and assets
- `src/modules/work/data/projects.ts`: project descriptions, problems and solutions.
- `src/modules/work/data/project-screens.ts`: each project's gallery and image dimensions.
- `src/modules/work/components/project-thumbnail.tsx`: thumbnail compositions.
- `src/modules/scene/PortraitCanvas.tsx`: static hero image component.
- `src/modules/site/config.ts`: site contact details and navigation.
- `src/app/globals.css`: shared styles and responsive layouts.
- `public/projects/`: original project images and Figma source provenance.
- `public/iqbal-portrait-static.png`: new static portrait.

All pages are included: Home, Work, six project details, About, Services, Blog, four blog articles and Contact.

The contact form currently demonstrates a local success state; connect a form backend before accepting real inquiries. WebGL appearance needs a GPU-enabled browser; the managed preview browser had WebGL disabled. No API keys are required to run the current site.

Source revision: cfb49ba8cba653a5d6860c0e1207d507e7efef9f

Dependencies, build output, repository metadata, credentials and hosting account settings are excluded. Run npm ci after extraction.
