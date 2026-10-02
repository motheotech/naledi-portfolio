# naledi-portfolio

Professional portfolio for Naledi Motheo, IT Officer: Microsoft 365, Entra ID, Active
Directory, Intune and 3CX. Four in-browser service desk simulations, in English,
Sesotho and isiZulu.

Live at <https://motheotech.github.io/naledi-portfolio/>. The community business is a
separate site: [Motheo Digital Cafe](https://motheodigitalcafe.co.za/).

Static site, no build step. Open `index.html`, or push the folder to GitHub Pages.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: who, the live ticket queue, scope of the job, how I work |
| `experience/index.html` | Work history with a filter by area (identity, M365, devices, telephony and more) |
| `lab/index.html` | **Try it**: the four simulations, one tab each, deep-linkable (`lab/#network`) |
| `credentials/index.html` | Certifications with credential IDs and verify links, path, education |
| `contact/index.html` | Contact details and a message form that opens email or WhatsApp |
| `404.html` | Not-found page (uses absolute `/naledi-portfolio/` paths) |

Every page ends with a "Where to next" block pointing at three others, so no page is a
dead end.

## Files

- `style.css` — the whole design system (tokens, components, responsive, print)
- `site.js` — mobile menu, live queue, copy buttons, work filter, contact form
- `i18n.js` — Sesotho and isiZulu text, plus the language switcher
- `lab-data.js` — simulation content (**this is the file you edit**)
- `lab.js` — simulation engine
- `check-links.sh` — verifies every outbound URL
- `assets/` — favicons and `og-image.jpg` (link preview on LinkedIn and WhatsApp)

All internal links are **relative** (`../style.css`, `lab/`), because a GitHub project
site lives under `/naledi-portfolio/`. Do not change them to `/style.css`.

## The simulations

| Tab | What it tests | Data block |
|---|---|---|
| Ticket triage | Priority and first action on six tickets, with the reasoning | `TICKETS` |
| Admin console | A simulated shell: `help`, `ticket-stats`, `m365-status`, `users`, `assets`, `lang st` | `CONSOLE` |
| New starter and leaver | Provisioning order. Only real dependencies are enforced, so several orders are valid | `LIFECYCLE` |
| Network fault-finding | One of four lab faults at random. Tests cost minutes and colour the topology | `NETWORK` |

Adding a ticket — copy a block in `TICKETS`:

```js
{
  id: 'INC-4490', from: 'Who raised it',
  summary: 'One line, as the user would say it',
  detail: 'Two or three sentences of context.',
  priority: 'P3', priorityWhy: 'Why that priority.',
  actions: [ { id: 'a', text: '...' }, { id: 'b', text: '...' }, { id: 'c', text: '...' }, { id: 'd', text: '...' } ],
  correct: 'c', actionWhy: 'Why that first move.'
}
```

Adding a lifecycle step: give it an `id`, the `needs` it depends on, and a `why` that
explains what jumping ahead would break. Adding a network fault: copy one of the
`faults` blocks and write what each test returns.

Everything in the simulations is fictional: names, tickets, figures and IP addresses.

## Translations

English is written in the HTML, so the site works with JavaScript off and search
engines index it. Any element with `data-i18n="key"` is swapped for the Sesotho or
isiZulu text in `i18n.js`. To fix a word, search `i18n.js` for the key and edit it.

- The choice is remembered in the browser. `?lang=st` or `?lang=zu` on any URL forces it,
  which is useful for sharing.
- Technical names stay in English on purpose (Microsoft 365, tenant, SLA, PoE): that is
  what appears on screen at work.
- Simulation scenarios and role details stay in English, the working language of the
  service desk and the CV. Buttons, labels and results are translated. A short note
  says so when Sesotho or isiZulu is selected.

## Deploy to GitHub Pages

This replaces the earlier React, Vite and Tailwind version. From a fresh clone:

```bash
git rm -r --quiet src package.json package-lock.json vite.config.js tailwind.config.js postcss.config.js
# copy this folder's contents into the repo root, then
git add -A
git commit -m "Rebuild as static site: simulations and translations"
git push
```

Then on GitHub: **Settings → Pages → Build and deployment**, Source "Deploy from a
branch", branch `main`, folder `/ (root)`. The old `gh-pages` branch can be deleted.
`.nojekyll` stops GitHub running Jekyll over the folders.

After publishing, check links:

```bash
bash check-links.sh
```

## Design

Separate identity from the cafe site on purpose: recruiters here, neighbours there.
They cross-link rather than match.

| Token | Value | Used for |
|---|---|---|
| `--ink` | `#07182e` | Panels, consoles, footer |
| `--blue` | `#175293` | Actions, links, active states |
| `--blue-500` | `#2468b4` | Meters, focus rings |
| `--mist` | `#f3f6fb` | Alternating bands |
| `--ok` / `--warn` | `#1f7a55` / `#9a5b0b` | Simulation outcomes only |

Archivo (variable width) for all reading text and headings; IBM Plex Mono only for
machine output such as console lines and ticket IDs. Sentence case throughout. Motion
is limited to the live queue and responds to `prefers-reduced-motion`. Pages print
cleanly.
