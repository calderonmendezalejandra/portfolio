# Alejandra Calderón · Portfolio

Personal portfolio for technology consulting roles: Power BI dashboards, web apps, process models and presentations.

**Live site:** _add your CloudFront or custom-domain URL here_

![Portfolio preview](assets/img/alejandra.jpg)

## What's inside

- **Featured cases.** Three projects (Q-Alert at Bosch, Woof Studio, Conexia) told as context → challenge → what I did → outcome.
- **All projects.** A filterable grid. Each project opens a dialog with the live Power BI report, the Canva slides, the website or a zoomable BPMN diagram.
- **Journey.** A horizontal, keyboard-accessible carousel with a timeline.
- **English and Spanish**, light and dark themes, reduced-motion support and a responsive layout.

## Tech

Plain HTML, CSS and JavaScript. No framework and no build step, so the files in the repo are exactly what is served.

```
index.html
css/
  base.css          design tokens, layout, components
  styles.css        v2 layer: featured cases, reveal on scroll, toolkit, contact
js/
  data.js           all the content in English: projects, journey, toolkit, contact links
  i18n.js           Spanish version and the EN/ES switch
  previews.js       SVG illustrations for internal projects
  bpmn-diagram.js   the BPMN diagram shown in the process project
  main.js           rendering and interactions
assets/
  img/              screenshots, covers and profile photo
.github/workflows/
  deploy.yml        CI/CD to AWS
docs/
  DEPLOY-AWS.md     step-by-step AWS setup
```

To change the content, edit `js/data.js` (English) and `js/i18n.js` (Spanish). To add contact links, fill in `PROFILE` at the top of that file.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Hosting and deployment

The site is hosted on **AWS**: a private **S3** bucket served through **CloudFront** (HTTPS, global CDN, Origin Access Control).

Every push to `main` triggers a **GitHub Actions** workflow that:

1. Authenticates to AWS with **OIDC** (a short-lived IAM role, with no stored access keys).
2. Syncs the files to S3 with cache headers (long cache for assets, no cache for HTML).
3. Invalidates the CloudFront cache so the change is live within minutes.

Setup guide: [`docs/DEPLOY-AWS.md`](docs/DEPLOY-AWS.md).

---

Internal company projects are shown as illustrations with invented data, not screenshots.
