# Universale Dienstleistungen

The redesigned Universale Dienstleistungen website, prepared as a static export for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate the production build

```bash
npm test
```

The deployable static files are generated in `dist/client`.

## Publish with GitHub Pages

1. Commit these files and push the `main` branch.
2. In the GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The included workflow will build and publish the site automatically.

Default Pages URL:

`https://lumoraofficialde.github.io/universale-dienstleistungen/`

The workflow is configured for the repository name `universale-dienstleistungen`. If the repository is renamed or a custom domain is added, update `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` in `.github/workflows/deploy-pages.yml`.
