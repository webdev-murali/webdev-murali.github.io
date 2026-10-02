# Murali R — Developer Portfolio

A personal portfolio for Murali R, a web developer and part-time freelancer from
Trichy. The home page showcases projects, skills, career experience, education,
freelance work, and the Stories by Murali YouTube channel. A current-learning
section covers web security, bug bounty, and personal AI agents.

The portfolio uses HTML, CSS, and vanilla JavaScript, with a local SVG illustration
and progressive project filtering. Existing browser tools use AngularJS 1.6.9
and Bootstrap 5. No backend or build step is required.

## Run locally

Serve this directory using VS Code Live Server or another static HTTP server.
If Python is installed:

```sh
python -m http.server 8000
```

Open `http://localhost:8000`. Use HTTP rather than opening HTML files directly,
because the resume builder fetches sample JSON. Internet access is required for
CDN libraries, fonts, Google Search, and external APIs.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Portfolio, projects, experience, education, and contact |
| `projects/resume-builder.html` | Resume form, preview, and browser printing |
| `projects/weather-reports.html` | OpenWeatherMap city lookup |
| `projects/youtube-thumbnail-downloader.html` | Video metadata and thumbnail links |
| `projects/whatsapp-link-generator.html` | WhatsApp links and clipboard copying |
| `projects/mychatgpt.html` | ChatGPT-style UI with Google Custom Search |
| `projects/google-home.html`, `projects/youtube-home.html` | UI mockups |
| `projects/list-maker.html` | Unfinished list-maker page |
| `projects/page-temp.html`, `projects/feedback-here.html` | Starter / placeholder pages |

The home page stays at the root. All other HTML pages live in `projects/`.

## Structure

```text
index.html                  Home page
projects/*.html             Tool pages, mockups, and placeholders
assets/
  css/shared/               Shared site styles
  css/pages/                Page styles and resume template
  js/app.js                 Shared AngularJS module declaration
  js/shared/                Shared browser behavior
  js/pages/                 Feature controllers and resume print handling
  data/                     Sample resume JSON
  img/                      Images, icons, and weather illustrations
  img/portfolio/            Portfolio illustration and favicon
```

## Development

Keep page-specific scripts and styles in their respective `pages/` directories.
The home page uses `assets/css/pages/index.css` and `assets/js/pages/portfolio.js`.
Edit its content directly in `index.html`. Its filters work without a framework,
and all projects remain visible if JavaScript is disabled. The page includes a
waving greeting, scroll entrances, animated project previews, and a reading
progress line. Animations respect the visitor's reduced-motion preference.

Styles start with the phone layout and add wider layouts at 600, 768, 1024, and
1200 pixels. The mobile menu supports keyboard use and keeps all navigation
visible when JavaScript is unavailable. Main buttons and navigation links have
at least 44-pixel touch targets.

Mini Murali is a decorative SVG character controlled by `assets/js/pages/companion.js`
and `assets/css/pages/companion.css`. He moves between clear spaces along the page
edges and changes activities with the section. There are no controls or floating
panels, and he never receives clicks or keyboard focus. If space is too tight,
he stays out of view instead of covering text or links. At the page bottom, he
walks into the centre of a small farewell background and waves with a thank-you.
Motion respects reduced-motion settings and stops in hidden tabs. Without
JavaScript, the character stays hidden and the static thank-you is still visible.

For the existing AngularJS tools:
Load AngularJS first, then `assets/js/app.js`, then the page controller. WhatsApp
has its own AngularJS module and does not need `app.js`.

CSS image URLs are relative to the stylesheet, for example `../../img/icon_voice.svg`.
JavaScript data requests are relative to the HTML page; project pages use
`../assets/data/` to reach shared JSON. Home links use `../index.html`.

## Hosting

Publish the repository root through a static host such as GitHub Pages. Keep
`index.html`, `projects/`, and `assets/` together at the root. No build output is needed.

