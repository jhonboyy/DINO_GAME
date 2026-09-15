<h1 align="center">
  <br>
  <a href="https://www.jhonboyy.github.io/DINO_GAME/" target="_blank"><img width="636" src="assets/preview.png"></a>
  <br>
  <br>
</h1>

> Remaking the chrome offline dinosaur game

## Development

This project uses [Vite](https://vitejs.dev/) for development and building.

### Commands

- **Install dependencies**: `pnpm install`
- **Start dev server**: `pnpm dev`
- **Build for production**: `pnpm build`
- **Preview build**: `pnpm preview`
- **Deploy manually**: `pnpm deploy`

## Deployment (Cloudflare Workers)

The project is deployed to Cloudflare Workers using [Static Assets](https://developers.cloudflare.com/workers/static-assets/) and the [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) Git integration.

- **Assets directory**: `dist`
- **Worker**: `dino-game`

### Connect GitHub (one-time setup)
1. In the Cloudflare dashboard, go to **Workers & Pages** → `dino-game`.
2. Go to **Settings → Builds → Connect** and authorize the **Cloudflare Workers and Pages** GitHub App.
3. Select the repository and set:
   - **Build command**: `pnpm build`
   - **Deploy command**: `npx wrangler deploy`

From then on, every push triggers an automatic build and deploy.

## License

[MIT](license)


## 🌍 Deployment & Branching Workflow

This project uses a two-branch workflow integrated with Workers Builds:
*   **`main`**: Production branch. Pushing here automatically deploys to the live Worker (`dino-game`).
*   **`develop`**: For ongoing features, bug fixes, and development. Pushes to non-production branches create **preview deployments** (via `wrangler versions upload`) with their own preview URLs.

To also build non-production branches, enable **Builds for non-production branches** under *Settings → Build → Branch control* in the Cloudflare dashboard.

### Release Workflow (Fast-Forward + Tags)
When ready to release changes from `develop` to production `main`:
1. Switch to `main` and update it:
   ```bash
   git checkout main && git pull origin main
   ```
2. Merge `develop` using fast-forward only:
   ```bash
   git merge develop --ff-only
   ```
3. Push to production `main` (triggers the production deploy):
   ```bash
   git push origin main
   ```
4. Create and push a tag for the release milestone (e.g., `week-6`):
   ```bash
   git tag -a week-6 -m "Release Week 6"
   git push origin week-6
   ```
5. Return to the `develop` branch to continue working:
   ```bash
   git checkout develop
   ```
