# QA

## Local Checks

Passed on 2026-09-30:

- `npm run lint`
- `npm run build`
- Local production server verification on `http://localhost:3011`

Representative route fetches:

| route | status | title | canonical | JSON-LD scripts |
| --- | ---: | --- | --- | ---: |
| `/` | 200 | `AE Global Group | Study Abroad Guidance` | `https://aeglobal.study` | 4 |
| `/contact` | 200 | `Contact Us | AE Global Group` | `https://aeglobal.study/contact` | 4 |
| `/destinations/united-kingdom` | 200 | `Study in United Kingdom | AE Global Group` | `https://aeglobal.study/destinations/united-kingdom` | 4 |
| `/robots.txt` | 200 | n/a | n/a | 0 |
| `/sitemap.xml` | 200 | n/a | n/a | 0 |

`/robots.txt` declares `Allow: /`, `Disallow: /api/` and the sitemap URL.

`/sitemap.xml` contains 31 URLs, including `/contact`, `/sitemap` and `/destinations/united-kingdom`.

## Editorial Checks

- No new claims about rankings, search volume, indexing, AI citations, awards or customer results were added.
- Public contact details and social links match owner-provided or existing site facts.
- Destination institution schema is generated only from the existing repository data.

## Coverage Limits

No independent subagent review was used. No production deployment or live post-deploy verification was available in this session.

## Production Check

Checked `https://aeglobal.study` on 2026-09-30 after pushing commit `ee90adf` to `origin/main`.

| route | status | observation |
| --- | ---: | --- |
| `/` | 200 | Title is `AE Global Group | Study Abroad Guidance`; HTML includes JSON-LD schema and final-domain canonical data. |
| `/contact` | 200 | Page loaded. |
| `/destinations/united-kingdom` | 200 | Page loaded. |
| `/robots.txt` | 200 | Points to `https://aeglobal.study/sitemap.xml`. |
| `/sitemap.xml` | 200 | Includes destination URLs, including `/destinations/united-kingdom`. |

Conclusion: production is serving the latest SEO build.
