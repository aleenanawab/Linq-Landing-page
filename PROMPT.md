Build a landing page for **Linq**, a B2B SaaS platform for event registration and organization onboarding. Linq is a child product of Avtive (https://www.avtive.app). The live product is at https://linq.avtive.app/login.

## What Linq does (write all copy from this)
- Organizations and event creators register once and get their own portals.
- They share ONE link per event. Attendees register through it and each generates a scannable card they can use to connect with others.
- Organizations are managed in one place. Networking is global.
- Tagline from the product: "Every connection creates opportunity."

Linq is B2B. Do NOT include personal profile building, "Create Your Profile", profile cards, or a phone mockup of a personal profile. Primary CTA is "Register your organization" (links to /organization/register). Secondary CTA is "Log in" (links to /login).

## Tech requirements
- Next.js (App Router) + TypeScript + Tailwind CSS + shadcn project structure.
- Components live in `@/components/ui`, `cn` comes from `@/lib/utils`, buttons use the shadcn `Button` (`asChild` for links).
- Icons from `lucide-react`. Animation with `gsap`.
- If the project is missing shadcn, Tailwind or TypeScript, first give the CLI setup steps (`create-next-app`, `shadcn init`, `shadcn add button`, `npm i gsap lucide-react`). If the components folder is not `/components/ui`, create it and explain why: the shadcn CLI and the `components.json` aliases rely on it.
- No images are required. Do not add stock photos.

## Visual style
Sleek, airy SaaS landing page. White background with pale-lavender gradients, saturated violet (violet-600/700) for headlines and buttons, pale gray text, thin lavender outlines, rounded pill buttons, soft violet shadows, clean sans-serif type, generous whitespace. Bright, even, high-key look. Responsive down to mobile, visible focus states, respect `prefers-reduced-motion`.

## Hero (the one memorable moment)
- Minimal header: "Linq" wordmark on the left; "How it works", "Features" and a "Log in" ghost button on the right. Nothing else.
- Oversized violet headline at upper left: "One link. Every connection." with one short supporting paragraph and the two CTAs.
- Under and behind the text, a crowd of small line-art people (Open Peeps sprite sheet, 15 columns x 7 rows) continuously walks left and right across the bottom ~60% of the hero, at different depths and speeds, drawn on a `<canvas>` and animated with the gsap ticker.
- The crowd is colourless (grayscale) by default. Wherever the cursor moves, a soft circular spotlight (~170px, eased so it follows smoothly) reveals the people in colour with a light violet tint. The spotlight fades out when the cursor leaves the page.
- Implement this with two canvases drawing the same crowd: a grayscale base layer, and a colour layer masked by `radial-gradient` positioned with CSS variables `--mx` / `--my`. The canvas layer must not block clicks on the text above it.
- Clean up properly on unmount (ticker, timelines, listeners) and be safe under React StrictMode. If reduced motion is on, pause the walking.
- Sprite sheet URL: https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png (self-host it in /public for production).
- Include attribution in the footer: "Crowd animation adapted from Skiper UI · illustration by Open Peeps".

## Sections below the hero
1. **How it works**, a centered three-step sequence (numbered, because it is a real sequence): Register your organization → Share one event link → Attendees get scannable cards. One lucide icon per step.
2. **Features**, a centered heading ("Built for organizations and event creators") over a bordered, rounded grid with hairline dividers (not separate floating cards): one-link registration, scannable attendee cards, organization onboarding, portals for every role, all organizations in one place, global networking. One short sentence each.
3. **Final CTA**, a wide rounded violet panel: "Your event deserves one link." with the same two CTAs.
4. **Footer**, "Linq" wordmark, "A product of Avtive" linking to https://www.avtive.app, links to Log in / Register organization / Avtive, copyright with the current year, plus the crowd attribution.

## Copy rules
Plain, specific, sentence case. CTAs say exactly what happens. Do not invent features, pricing, statistics, testimonials or customer logos. Avoid generic filler like "revolutionize" or "seamless".

## Deliverables
Complete files, ready to paste: `components/ui/skiper39.tsx` (the crowd canvas, exporting `CrowdCanvas`), `components/linq-landing.tsx`, and `app/page.tsx` that renders it. Then list any assumptions in a few lines.
