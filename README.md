# CROWDGE

A complete responsive landing page and clickable creative-funding marketplace prototype. Built with React, TypeScript, Vite, Tailwind CSS, React Router, and Lucide icons. All investment functionality is simulated.

## Open the included production build

With Node.js 22+ installed, run `node server.mjs` in this folder. On Windows you can also double-click `start.cmd`. The launcher recognizes the bundled Codex Node runtime when a global Node installation is unavailable.

- Landing page: http://127.0.0.1:4173
- Platform: http://127.0.0.1:4173/app

The `dist` folder is already built. No package installation is needed to run this version. Keep the terminal open while browsing. If port 4173 is already in use, stop the previous server or set the `PORT` environment variable to another port.

## Develop

```sh
npm install
npm run dev
npm run build
npm run preview
```

A pnpm lockfile is also supplied. For reproducible installation use `pnpm install --frozen-lockfile`. The Vite runner configuration avoids a Windows sandbox limitation affecting bundled config loading.

## Included routes and interactions

- `/`: full marketing page, project/category filters, sort options, interactive revenue-sharing explanation, team bios, FAQ, legal notes, and local waitlist.
- `/app`: featured project, six sample projects, categories, live search, advanced filters, and feed sorting.
- `/app/search`: search projects, creator names, and categories.
- `/app/project/:id`: full project story, financial terms, progress, milestones, updates, risks, FAQs, document placeholders, and a configurable payout simulator.
- `/app/investments`: mock portfolio, distribution chart, category allocation, and holdings table.
- `/app/projects`: sample creator project, locally saved projects, saved terms, and local deletion.
- `/app/create`: ten-step validated project wizard with save/resume and local demo publishing.
- `/app/profile`: editable local user profile, bio, social URL, badges, metrics, and an active sample project.
- `/app/creator/:id`: project-specific creator profile.
- `/app/settings`, `/app/help`, `/app/terms`, `/app/privacy`: functional preferences and explanatory pages.

## Data and backend integration

All projects and portfolio figures are mock data. No payment, KYC, authentication, real investment, or external form submission occurs. Profile and logout controls are demo navigation. The portfolio intentionally shows a later lifecycle scenario than the fundraising cards.

Waitlist responses, project drafts, locally published projects, profile details, and preferences are stored in browser localStorage. The form clearly states that no response is sent to the team. Clear browser site data to remove these records. The waitlist submission handler in `src/Landing.tsx` contains the commented integration point for Supabase, Firebase, or Formspree. Add consent handling and server-side validation before connecting a live endpoint.

The investment model first returns capital from revenue, then shares a project-specific percentage of subsequent revenue until the cumulative revenue threshold is reached. Payouts are allocated pro rata under the assumption of full funding and exclude fees. Loss scenarios are supported; results are illustrative, not forecasts. The landing-page example produces €120,000 for backers when project revenue is €300,000 under the supplied terms.

Project photography is sourced from Unsplash and bundled locally in public/images, so the site renders offline. Social media buttons and investment documents are clearly labelled placeholders. Legal text is prototype explanatory copy, not finalized legal documentation.

## Deploy

Upload `dist` to a static hosting provider and configure all non-file routes to rewrite to `/index.html`. This supports direct navigation and refresh under `/app`. Nothing has been published to crowdge.com or app.crowdge.com. Domain configuration and a production backend are separate launch work.

## Market sources

- [Goldman Sachs, 2023 forecast](https://www.goldmansachs.com/insights/articles/the-creator-economy-could-approach-half-a-trillion-dollars-by-2027): approximately $480B by 2027.
- [Kickstarter, The Creative Download 2024](https://updates.kickstarter.com/the-creative-download-2024/): $706M pledged to successfully funded projects.
- [Visa 2025 Creator Report](https://corporate.visa.com/en/solutions/commercial-solutions/knowledge-hub/2025-visa-creators-report.html): the report's page 12 calls out 85% self-funded using personal credit cards and/or savings accounts. Other passages round or report the broader personal-funds measure as 86%; the site retains the brief's 85% figure with the narrower self-funded wording.

## Validation

TypeScript and the Vite production build pass. Browser checks cover desktop and mobile layout, all major app routes, live search, filters, investment scenarios, waitlist persistence, and the complete ten-step project wizard. No real funds or messages are transmitted.
