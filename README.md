# Andrii Nakonechnyi · Portfolio

One-page portfolio of Andrii Nakonechnyi, Frontend Developer in Kyiv. Built with Astro 7, Tailwind CSS 4, GSAP and Lenis, deployed to GitHub Pages at [androfficial.github.io/portfolio](https://androfficial.github.io/portfolio/). The page makes no third-party requests.

## Content rules

- Every fact on the page comes from Andrii's CV. No invented metrics, testimonials, screenshots, repositories or project links.
- FABU and Posbox are commercial products with private code. The page says so, and the case visuals are original abstract SVG diagrams captioned "Illustrative diagram · not the product UI".
- Public contacts are LinkedIn, Telegram and GitHub.
- Copy is simple English and avoids em and en dashes. Date ranges use an SVG arrow with a hidden "to" for screen readers (`DateRange.astro`).
- All copy lives in typed modules in `src/data/`, apart from the markup.
- Each fact is written once: section numbers follow the order in `sections.ts`, case studies take the company, role and period from `experience.ts`, and the years of experience come from `profile.ts`.

## Develop

```bash
nvm use            # Node 24 from .nvmrc
npm ci
npm run dev        # http://localhost:4321/portfolio/
npm run check      # astro check (types)
npm run lint       # eslint (astro, typescript-eslint, jsx-a11y)
npm run format     # prettier --write; format:check only reports
npm run build      # static site in dist/
npm run preview    # serves dist/ at http://localhost:4321/portfolio/ (stop with: npx astro preview stop)
npm run assets     # re-renders public/og.jpg and the PNG favicons with local Chrome
```

`npm run assets` uses `playwright-core` with the installed Google Chrome. Set `CHROME_PATH` to use another Chromium build. Run it after changing `brand/og.html` or `public/favicon.svg`.

## Structure

- `src/pages/index.astro` assembles the sections; `src/pages/404.astro` becomes the GitHub Pages 404 for the project path.
- `src/layouts/Base.astro` holds the head: title, description, canonical URL, Open Graph and Twitter tags, JSON-LD (`ProfilePage` with a `Person`), favicons, font preloads and the saved animation preference.
- `src/data/` has the content: `profile.ts` (identity, years of experience, headline, contacts, education, languages), `sections.ts` (navigation order, section titles and intros), `work.ts` (FABU and Posbox cases and metrics), `experience.ts` (timeline), `strengths.ts`, `approach.ts` (working principles), `skills.ts` and the shared `types.ts`.
- `src/components/` has one component per section plus `CaseStudy`, `FunnelVisual` and `PosVisual` (animated SVG diagrams), `SectionHeading`, `SectionEyebrow`, `DateRange`, `Icon`, `LogoMark` and `Motion` (the client script entry).
- `src/utils/` has small shared helpers such as `formatIndex`.
- `src/scripts/main.ts` is the only eagerly loaded script (about 3 KB gzip): anchor navigation with focus management, header state, active section indicator, scroll progress, the popover menu, the animation pause toggle, spotlight cards, the Kyiv clock and the diagram loop observer. On idle it loads two chunks:
  - `motion.ts` (GSAP, ScrollTrigger, SplitText, Lenis): scroll reveals, split headings, count-ups, parallax, diagram entrances, magnetic buttons, tilt and the proximity effect on the contact heading. It is never downloaded under `prefers-reduced-motion: reduce`.
  - `aurora.ts`: the WebGL background of the hero.
- `src/styles/global.css` defines the tokens (navy, teal, coral, type, easing) with Tailwind `@theme`, the CSS-only hero intro and counters, and the few component styles that read better as CSS.
- `src/assets/fonts/` has Unbounded and Manrope (variable woff2, latin, SIL OFL 1.1). The Astro Fonts API self-hosts them, preloads them and generates metric-matched fallbacks.
- `brand/og.html` is the source of the 1200×630 Open Graph image; `scripts/render-assets.mjs` renders it and the favicons into `public/`.

## Motion and accessibility

- The hero intro (word reveal, fades, count-up) is pure CSS, so the first screen does not wait for JavaScript and works without it.
- Scroll motion runs inside `gsap.matchMedia()`. Elements that are already on screen when motion starts are never hidden, so deep links and restored scroll positions do not flash.
- Lenis smooth scrolling runs only on devices with a fine pointer; touch devices keep native scrolling. Both respect `scroll-padding-top`, so anchors land below the fixed header.
- `prefers-reduced-motion: reduce` turns off smooth scrolling, scroll animations, parallax, loops and the pointer effects, and the WebGL background draws one static frame.
- The header has a pause button (WCAG 2.2.2) that stops the background, the marquee and the diagram loops. The choice is saved in `localStorage` and applied before first paint.
- The WebGL background starts on idle, compiles its shader asynchronously (`KHR_parallel_shader_compile`), skips devices without hardware acceleration (`failIfMajorPerformanceCaveat`), renders at half resolution and 30 fps, and pauses when off screen or in a background tab. A CSS gradient is the fallback.
- The mobile menu is a native `popover`, so it opens without JavaScript. With JavaScript the rest of the page becomes `inert`, scrolling locks, and focus goes to the first link and back to the menu button on close.
- The contact heading reacts to the pointer with text stroke, color and transforms only, so it never shifts layout.
- Split text keeps the original sentence for screen readers (`aria: 'auto'`), metrics have a hidden full-sentence alternative, and decorative layers are `aria-hidden`.

## Gotchas

- Astro removes whitespace that contains a line break between tags. When two inline elements must be separated by a space, keep them on one line or add `{' '}` between them (see the hero headline).
- TypeScript stays on 6.x: TypeScript 7 is the native port without the JavaScript API that `astro check` needs.
- `prettier-plugin-astro` stays on 0.14 until `prettier-plugin-tailwindcss` supports its 1.x AST, and `package.json` overrides the stale `eslint` peer range of `eslint-plugin-jsx-a11y`, as in the studio site.

## Verification

```bash
npm run check && npm run lint && npm run format:check && npm run build
npm run preview
npx lighthouse http://localhost:4321/portfolio/ --view
npx lighthouse http://localhost:4321/portfolio/ --preset=desktop --view
```

Manual checks: keyboard only (skip link, nav, menu, Escape), macOS Reduce motion, the pause button, widths from 320 px up, and a reading of every sentence against the CV.

## Deploy

`.github/workflows/deploy.yml` runs on every push to `main`: `npm ci`, `check`, `lint`, `format:check`, `build`, then `actions/deploy-pages` publishes `dist/`. One-time setup before the first push: repository Settings → Pages → Source: GitHub Actions.

`SITE_URL` (default `https://androfficial.github.io`) and `BASE_PATH` (default `/portfolio`) set the canonical and Open Graph URLs and every asset path. For a custom domain or Vercel, build with `BASE_PATH=/` and the new `SITE_URL`.

A project page cannot ship its own `robots.txt`: crawlers read the one at the domain root, which belongs to the `androfficial.github.io` site. The sitemap is generated at `/portfolio/sitemap-index.xml`.

## License

Content and design © Andrii Nakonechnyi. Unbounded and Manrope are licensed under the SIL Open Font License 1.1 (see `src/assets/fonts/`).
