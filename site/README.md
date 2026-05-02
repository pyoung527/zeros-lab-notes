# Zero’s Lab Notes Landing Page

Static v0.1 landing page for `박제로의 실험기록 / Zero’s Lab Notes`.

## Files

- `index.html` — semantic static page and Korean landing copy
- `thanks.html` — post-submit thank-you page for Tally redirects
- `styles.css` — mobile-first monochrome visual system
- `script.js` — CTA scroll behavior for in-page links and minimal analytics hooks

## Local preview

From the repository root:

```bash
python3 -m http.server 4173 --directory site
```

Then open:

```text
http://127.0.0.1:4173/
```

No package install or build step is required.

## Tally form integration

The lead form uses Tally popup mode instead of an embedded iframe, so primary CTAs open the form cleanly without adding a large iframe to the page.

- Tally form ID: `GxYrgL`
- Tally script: `<script async src="https://tally.so/widgets/embed.js"></script>` in `site/index.html` `<head>`; keep it once only.
- Popup attributes used by CTAs:
  - `data-tally-open="GxYrgL"`
  - `data-tally-overlay="1"`
  - `data-tally-emoji-text="👋"`
  - `data-tally-emoji-animation="wave"`
- Hash fallback: `#tally-open=GxYrgL&tally-overlay=1&tally-emoji-text=👋&tally-emoji-animation=wave`
- Tally redirect URL: `https://pyoung527.github.io/zeros-lab-notes/thanks.html`
- Local thank-you page: `site/thanks.html`

The visible `#signal-form` section should remain as a clean invitation/card with a popup button. Avoid reintroducing a full Tally iframe unless intentionally testing embedded mode, because iframe + popup creates duplicate form surfaces.

Keep the recommended questions from the PRD in the Tally form:

- 이름 또는 닉네임
- 이메일
- 어떤 문제를 자동화하고 싶나요?
- 이 문제가 얼마나 자주 발생하나요?
- 현재 어떤 방식으로 해결하고 있나요?
- 관심 있는 도움 방식
- 유료 베타 진단 세션 의향
- 직업/상황, if useful
- 개인정보 수집 동의, if collecting identifiable data

## Analytics integration TODO

`site/script.js` currently logs events to the browser console and calls Plausible/Umami if their global objects exist.

Tracked events:

- `cta_click` — CTA/button clicks, including Tally popup CTAs
- `form_intent` — emitted when a popup CTA is clicked; this tracks intent only, not Tally submissions

To connect Plausible or Umami later, add the provider script snippet in `index.html`. The existing event hooks should start forwarding custom events automatically.

## GitHub Pages deployment

Recommended simple setup:

1. Push `main` to GitHub.
2. In GitHub repo settings, open `Pages`.
3. Select source: `Deploy from a branch`.
4. Select branch: `main`.
5. Select folder: `/site`, if available for the repository.
6. Save and wait for the Pages build.

If GitHub Pages does not offer `/site` as a folder source, use one of these alternatives:

- Move/copy the static files to `/docs` and select `/docs` as the Pages source.
- Add a GitHub Actions workflow that deploys `site/` as the Pages artifact.
- Deploy the repo with Vercel and set the output/root directory to `site`.

## Vercel deployment

1. Import `pyoung527/zeros-lab-notes` in Vercel.
2. Set Framework Preset to `Other`.
3. Set Root Directory to `site`.
4. Leave Build Command empty.
5. Leave Output Directory as `.`.
6. Deploy.

## Privacy note

Before collecting real submissions, add or link a clear privacy notice that explains email/problem-description usage and warns visitors not to submit confidential or sensitive information.
