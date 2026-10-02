# Web Developer Notes

A static collection of browser tools and UI experiments built with HTML, CSS,
JavaScript, AngularJS 1.6.9, and Bootstrap 5. No backend or build step is required.

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
| `index.html` | Home and tool navigation |
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
```

## Development

Keep page-specific scripts and styles in their respective `pages/` directories.
Load AngularJS first, then `assets/js/app.js`, then the page controller. WhatsApp
has its own AngularJS module and does not need `app.js`.

CSS image URLs are relative to the stylesheet, for example `../../img/icon_voice.svg`.
JavaScript data requests are relative to the HTML page; project pages use
`../assets/data/` to reach shared JSON. Home links use `../index.html`.

## Hosting

Publish the repository root through a static host such as GitHub Pages. Keep
`index.html`, `projects/`, and `assets/` together at the root. No build output is needed.

