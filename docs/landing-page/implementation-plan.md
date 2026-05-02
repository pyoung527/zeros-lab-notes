# Zero’s Lab Notes Landing Page Implementation Plan v0.1

> Status: planning only. Do not implement until Young approves the decision points at the end.

## 1. Goal

Create a lightweight early validation landing page for 박제로의 실험기록 / Zero’s Lab Notes that collects AI automation problems from Korean visitors and measures demand before defining a paid beta offer.

Primary implementation principle:
- Fast to ship
- Easy to edit copy
- Minimal maintenance
- Analytics and lead capture good enough for validation
- No overbuilding before demand signal

## 2. Current Repo Context

Repo:
- `/home/young-park/projects/zeros-lab-notes`

Current observed structure:

- `README.md`
- `docs/production/ep01-hina-final-production.md`
- `docs/benchmark/*`
- `docs/planning/*`
- `docs/landing-page/landing-page-prd.md`
- `docs/landing-page/implementation-plan.md`

There is currently no application scaffold in the repo. The repo is documentation-first, so implementation should either:

1. Add a small static site directly in this repo, or
2. Keep this repo as planning/content source and create a separate landing-page app repo later.

Recommended for speed: implement directly in this repo as a small static site unless Young wants clean separation.

## 3. Recommended Stack Options

### Option A — Single static HTML/CSS page

Best when:
- Need fastest validation page.
- No framework needed.
- Copy changes are simple.
- Can deploy with GitHub Pages, Netlify, Vercel static, or Cloudflare Pages.

Proposed stack:
- `site/index.html`
- `site/styles.css`
- small vanilla JS only if needed for analytics/form events

Pros:
- Fastest implementation.
- Minimal dependencies.
- Low maintenance.
- Good for a one-page Korean validation page.

Cons:
- Less scalable if later adding blog/app pages.
- Manual component reuse.

Picolo recommendation for v0.1:
- Choose Option A unless there is already a preferred web stack not present in this repo.

### Option B — Astro static site

Best when:
- Want clean content/component structure.
- Landing page may become a content site later.
- Need SEO-friendly static output.

Proposed stack:
- Astro
- TypeScript optional
- Static deploy to Vercel/Netlify/Cloudflare Pages

Pros:
- Good static content architecture.
- Easy to expand into landing + notes/blog pages.
- Strong performance.

Cons:
- Adds dependencies and build config.
- Slightly more setup than needed for first validation.

### Option C — Next.js

Best when:
- Need server actions/API routes soon.
- Need deeper product app functionality later.
- Already planning payments, login, dashboard, or custom backend.

Pros:
- Flexible for future app/product.
- Easy Vercel deployment.

Cons:
- Overkill for this validation page.
- More moving parts.

Not recommended for v0.1 unless Young explicitly wants a long-term app foundation now.

## 4. Recommended v0.1 Architecture

Use a static landing page plus external form provider.

Suggested architecture:

- Static page renders all copy and CTA sections.
- CTA buttons scroll to form section or open external form.
- Analytics tracks page views and CTA clicks.
- Form provider stores submissions and can export CSV.
- No custom backend in v0.1.

Why:
- The core question is demand validation, not software capability.
- External form tools reduce implementation time and privacy/security burden.
- Static deploy keeps cost and maintenance low.

## 5. Proposed File Structure if Implementing in This Repo

If Option A is approved:

```text
site/
  index.html
  styles.css
  scripts.js            # optional: CTA click tracking, form-start tracking
  assets/
    og-image.png        # optional later
README.md              # update with site/deployment note
```

If Astro is approved:

```text
package.json
astro.config.mjs
src/
  pages/
    index.astro
  styles/
    global.css
  components/
    Hero.astro
    ProblemSection.astro
    OfferSection.astro
    FitSection.astro
    CredibilitySection.astro
    LeadFormSection.astro
public/
  og-image.png          # optional later
```

Planning docs remain:

```text
docs/landing-page/
  landing-page-prd.md
  implementation-plan.md
```

## 6. Page Sections to Implement

Use the PRD copy outline as source of truth.

Implementation order:

1. Hero
   - headline
   - subheadline
   - primary CTA
   - experiment-stage support line
2. Problem section
   - visitor pain points
3. Experiment framing
   - Hina / direct experimentation / early validation transparency
4. Offer now
   - problem diagnosis
   - beta diagnostic session
   - experiment participant list
5. Fit / Not fit
6. Credibility
   - CERN collaboration researcher
   - AI/software/system building
   - bilingual/global perspective
   - application software business registration
   - Hina experiment
7. Lead form section
8. Final CTA
9. Footer
   - channel name
   - privacy/data-use note

## 7. Form Handling Options

### Option 1 — Tally / Google Forms / Typeform external form

Recommended for v0.1.

Pros:
- Fastest.
- No backend.
- Form exports are easy.
- Lower implementation risk.

Cons:
- Less design control.
- Some visitors may leave the page if external.

Implementation options:
- Embed form iframe in the page.
- Or CTA opens the form in a new tab.

Picolo recommendation:
- Tally embed or Google Forms link for first launch.
- If speed matters most, Google Forms is acceptable.
- If visual polish matters, Tally is better.

### Option 2 — Static form endpoint

Candidates:
- Formspree
- Netlify Forms
- Basin
- Getform

Pros:
- Native-looking form on the page.
- No custom backend.

Cons:
- Account/config setup needed.
- Spam protection and privacy copy still need review.

Good if:
- Young wants form visually integrated into landing page.

### Option 3 — Custom backend / Supabase

Not recommended for v0.1 unless Young wants to reuse Supabase for later CRM/product workflows.

Pros:
- Full control over data model.
- Can build CRM/lead scoring later.

Cons:
- Overbuild for early validation.
- More security/privacy obligations.

## 8. Analytics Options

Required metrics:
- Page views
- CTA clicks
- Form starts
- Form submissions

### Option 1 — Plausible / Umami

Recommended if privacy-friendly analytics is preferred.

Pros:
- Simple dashboards.
- Privacy-friendly.
- Easy custom events.

Cons:
- May require hosted account or self-hosting.

### Option 2 — Google Analytics 4

Pros:
- Common and free.
- UTM/campaign tracking supported.

Cons:
- Heavier and less privacy-friendly.
- More configuration complexity.

### Option 3 — Form-only + deploy provider analytics

Minimum viable tracking:
- Deploy provider page views if available.
- Form submissions from form provider.
- Manual UTM links from channel posts.

Pros:
- Fastest.
- No analytics setup blocker.

Cons:
- CTA click/form start tracking may be weak.

Picolo recommendation:
- Use Plausible/Umami if Young already has access or wants clean metrics.
- Otherwise launch with form submissions + simple deploy analytics, then add event analytics after first traffic.

## 9. Deployment Options

### Option A — GitHub Pages

Best for static HTML.

Pros:
- Free.
- Directly connected to repo.
- Simple for documentation-style project.

Cons:
- Custom analytics/form still external.
- Custom domain setup requires DNS config.

### Option B — Vercel

Best if later using Next.js/Astro or custom domain workflows.

Pros:
- Easy deploy previews.
- Great for frontend projects.
- Custom domains simple.

Cons:
- Slightly more product/app-oriented than needed for plain static.

### Option C — Netlify

Best if using static HTML with Netlify Forms.

Pros:
- Static deploy is easy.
- Built-in forms can avoid separate form provider.

Cons:
- Vendor-specific form behavior.

### Option D — Cloudflare Pages

Pros:
- Fast/static-friendly.
- Good custom domain and edge performance.

Cons:
- Slightly more setup if not already using Cloudflare.

Picolo recommendation:
- If using Tally/Google Form: GitHub Pages or Vercel are both fine.
- If using native page form without backend: Netlify is attractive because Netlify Forms is built in.

## 10. Implementation Tasks After Approval

Do not execute these until Young approves.

### Task 1: Confirm implementation choices

Decisions required:
- Stack: static HTML vs Astro vs Next.js
- Form: external embed/link vs static form endpoint vs Supabase/custom
- Analytics: Plausible/Umami vs GA4 vs minimal tracking
- Deployment: GitHub Pages vs Vercel vs Netlify vs Cloudflare Pages

### Task 2: Create landing page scaffold

If static HTML is approved:
- Create `site/index.html`
- Create `site/styles.css`
- Optional: create `site/scripts.js`

Verification:
- Open locally with a simple static server.
- Confirm Korean text renders correctly.
- Confirm CTA links to form section or external form.

### Task 3: Implement responsive layout

Sections:
- Hero
- Problem
- Experiment framing
- Offer
- Fit / Not fit
- Credibility
- Form
- Final CTA
- Footer

Verification:
- Desktop width
- Mobile width
- Keyboard navigation
- CTA visibility above the fold

### Task 4: Add form integration

Depending on approved option:
- Embed Tally/Google Form, or
- Configure Netlify/Formspree form endpoint, or
- Connect Supabase/custom endpoint

Verification:
- Submit test lead.
- Confirm submission reaches destination.
- Confirm privacy note visible before/near submit.

### Task 5: Add analytics

Depending on approved option:
- Add analytics snippet.
- Add event hooks for CTA clicks and form starts if supported.

Verification:
- Confirm page view event appears.
- Confirm CTA event appears if configured.

### Task 6: Add deployment config/docs

Depending on approved host:
- Update README with local preview/deploy notes.
- Add provider-specific config only if needed.

Verification:
- Local preview works.
- Production/deploy preview works after Young approves deployment.

### Task 7: QA and copy review

Checks:
- No fake testimonials.
- No income/revenue guarantee.
- No overclaiming paid offer proof.
- CTA text consistent.
- Mobile readability.
- Form fields match PRD.
- Basic accessibility: labels, contrast, focus states.

## 11. Approval Decision Points

Before implementation, Young should choose:

1. Stack
   - A: static HTML/CSS/JS, fastest and recommended
   - B: Astro, better if this becomes a content site
   - C: Next.js, only if we expect app/backend features soon

2. Form handling
   - A: Tally or Google Forms external/embed, fastest and recommended
   - B: Netlify/Formspree-style native form endpoint
   - C: Supabase/custom backend, more control but likely overbuild

3. Analytics
   - A: Plausible/Umami
   - B: GA4
   - C: minimum viable tracking first, add event analytics later

4. Deployment
   - A: GitHub Pages
   - B: Vercel
   - C: Netlify
   - D: Cloudflare Pages

5. Domain
   - A: use generated deployment URL first
   - B: connect custom domain immediately

## 12. Picolo Recommendation

For fastest validation:

- Stack: static HTML/CSS/JS in `site/`
- Form: Tally embed if available; Google Form link if speed matters more than polish
- Analytics: minimal tracking first, or Plausible/Umami if already available
- Deployment: GitHub Pages or Vercel
- Domain: generated URL first; custom domain after first useful lead signal

Rationale:
- This page’s job is to collect evidence, not prove engineering complexity.
- A static page with external form can validate demand within hours.
- Avoid backend/payment/course infrastructure until thresholds are met.

## 13. Stop Gate

Implementation must not start until Young approves the decisions in Section 11.
