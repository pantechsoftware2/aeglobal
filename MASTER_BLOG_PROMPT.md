# AE Global Group — Master Blog Publishing Prompt

Use this prompt whenever AE Global Group needs a new research-led blog update. Complete the entire workflow autonomously. Do not stop after suggesting topics or drafting copy: research, create the content and image assets, integrate the posts into the existing website, and verify the result.

## How to run it

From the project workspace, give your coding agent this single instruction:

> Read `MASTER_BLOG_PROMPT.md` and execute the complete workflow now.

No additional topic selection is required unless you want to override the autonomous research and selection process.

---

## Project context

- Website: `https://www.aeglobal.study/`
- Production blog: `https://www.aeglobal.study/blog`
- Local blog: `http://localhost:3001/blog`
- Framework: use the framework and version already installed in this repository.
- Existing blog data: inspect `app/data/blogPosts.ts`.
- Existing article route: inspect `app/blog/[slug]/page.tsx`.
- Existing blog listing: inspect `app/blog/page.tsx`.
- Blog image policy: inspect and follow `app/lib/blogWorkflow.ts` and `scripts/verify-blog-images.mjs`.
- Blog images belong in `public/images/blog/` and must use the exact slug-based filename required by the image policy.

Before changing code, read `AGENTS.md` and any relevant framework documentation required by it. Treat the current repository as the source of truth because its structure may have changed since this prompt was written.

## Objective

Research current study-abroad developments and publish **one or two** original, high-quality, enquiry-focused SEO articles for Indian students. Select only topics that are timely, factually defensible and useful to prospective students.

Use the actual current date for research recency and publication dates. Never reuse a date embedded in this prompt.

## 1. Inspect the existing blog

Before researching or writing:

1. Inspect the blog data model, listing page, dynamic article route, SEO implementation, sitemap and relevant styles.
2. List every existing title and slug internally and eliminate duplicate or substantially overlapping ideas.
3. Understand how cards, featured images, metadata, structured data, internal links, sources, FAQs, tables and mobile layouts are currently rendered.
4. Preserve all existing articles.
5. Preserve the current visual design and routing approach. Do not redesign the blog or unrelated pages.
6. Review the current Git status and protect unrelated or user-owned changes.

## 2. Research recent topics on the live internet

Search the internet before selecting a topic. Prioritize developments from the previous **7–30 days**, while using older official pages where necessary to verify continuing rules or provide context.

Investigate topics relevant to Indian students, including:

- UK, Australia, Canada, Germany, the USA and Europe
- upcoming January, February, July and September intakes
- Student visa and immigration-rule changes
- university admission or application updates
- UCAS deadlines and application changes
- APS India or German admission changes
- scholarships and official funding opportunities
- tuition fees and required financial evidence
- affordable study destinations
- dependant, work-right and post-study policy changes
- important official university announcements
- other genuinely useful study-abroad developments

Research with a mixture of discovery sources and primary verification sources:

- Google Search and Google News
- Google Trends or Trending Now, where reliably accessible
- official immigration and government websites
- official university websites
- UCAS, DAAD and APS India
- official scholarship providers
- reputable education reporting for topic discovery

### Research integrity rules

- Use primary official sources for every claim about rules, dates, fees, funds, deadlines, eligibility, work rights or scholarships.
- If Google Trends is inaccessible or does not provide reliable evidence, say so internally and do not claim that a keyword is trending.
- Do not infer a rule from a news headline.
- Separate rules already in force from proposals, announcements or rules with future effective dates.
- Record the exact effective date and whether transitional arrangements apply.
- Do not invent statistics, search volumes, deadlines, fees, eligibility rules or quotations.
- Avoid legal guarantees, visa-success promises or claims that AE Global Group controls admissions or visa decisions.

## 3. Select the best one or two topics

Compare candidate topics using:

- recency
- relevance to Indian students
- relevance to AE Global Group services and destinations
- strength of official evidence
- student usefulness
- SEO opportunity without keyword stuffing
- likelihood of generating genuine enquiries
- lack of overlap with existing posts

Publish no more than two articles. Prefer one excellent article over two weak or repetitive ones.

Do not select clickbait, speculative rumours, generic listicles or a topic supported only by secondary reporting.

## 4. Write complete articles

Each selected article must include:

- a unique, SEO-friendly title
- a concise unique slug
- a separate meta title suitable for search results
- a compelling meta description
- a clear category
- the accurate current publication date
- an honest reading-time estimate
- a short introduction or quick answer
- logical H2 sections and useful H3 subsections
- approximately 900–1,500 words when the subject justifies it
- natural target keywords and related phrases
- plain-language explanations for Indian students
- an accurate table when comparison or calculation is useful
- a practical checklist or action plan
- FAQs when they answer real search intent
- contextual internal links to existing AE Global Group pages
- direct links to authoritative official sources
- a natural CTA encouraging the student to contact AE Global Group
- a reminder to recheck official guidance when the subject can change

Write original copy. Do not copy or closely paraphrase another publisher. Avoid filler, exaggerated urgency, robotic phrasing and repetitive conclusions.

For financial examples:

- show the formula clearly
- distinguish tuition from living-cost or maintenance requirements
- state whether figures are monthly, annual or capped
- avoid fixed INR conversions unless essential; if used, label the rate and date and explain that exchange rates change

## 5. Create a unique featured image for every new post

Generate a separate, professional editorial image that reflects the specific article—not a generic repeated study-abroad image.

Image requirements:

- use the available image-generation capability when appropriate
- create a visually distinct concept for each article
- represent Indian students naturally when relevant
- match AE Global Group's refined navy, teal and light-neutral visual language
- use a wide 16:9 composition suitable for blog cards and article heroes
- do not include logos, watermarks, flags dominating the composition or readable generated text
- avoid fake passport details, fake government interfaces and identifiable personal information
- avoid reusing the same landmark collage, pose or desk arrangement across posts
- save the final production asset as WebP
- use the exact path `/images/blog/<slug>.webp`
- meet every dimension, aspect-ratio and file-size rule enforced by `scripts/verify-blog-images.mjs`
- write accurate, descriptive alt text
- store a detailed content-specific generation prompt in the blog data

Do not use unlicensed images. If an existing project asset is reused, verify that it is appropriate and not already used as another post's hero image.

## 6. Integrate the posts into the website

1. Add the new posts to the existing blog data source using the established types and structure.
2. Place the newest posts first unless the current implementation uses another explicit sorting rule.
3. Ensure the cards appear on `/blog` and link to the correct article routes.
4. Ensure each `/blog/<slug>` route is generated successfully.
5. Preserve all existing posts and routes.
6. Add internal links using existing, confirmed routes only.
7. Add official source links with safe external-link attributes.
8. Add or preserve Article/BlogPosting structured data, including headline, description, image, publication date, author, publisher and canonical page.
9. Add FAQ structured data only when visible FAQs are present on the page.
10. Include keywords, citations and word count in structured data when the existing system supports them.
11. Ensure the sitemap includes the new URLs with their correct publication or modification date.
12. Keep tables keyboard accessible and horizontally scrollable on narrow screens without making the whole page overflow.
13. Maintain accessible headings, link labels, alt text, focus behavior and responsive typography.

If the current data model does not support a necessary article element, extend it minimally and backward-compatibly. Do not introduce a CMS, database or new dependency.

## 7. Verify the implementation

Run the checks appropriate to the current project, including:

1. the blog image verification command
2. targeted lint for every source file changed
3. TypeScript type checking
4. the production build
5. `git diff --check`

Then verify through the running local site when available:

- `/blog` returns successfully and displays the new cards
- every new article route returns successfully
- every new image returns successfully with an image content type
- card links lead to the correct articles
- title, meta description, canonical URL and social metadata are present
- BlogPosting structured data is present
- FAQ structured data matches the visible FAQs
- official and internal links are correct
- desktop layout is visually sound
- a genuine mobile viewport around 390px has no page-level horizontal overflow
- wide tables scroll inside their own container
- existing articles still load

Fix every error introduced by the work. If a full-repository check fails because of a confirmed pre-existing or generated-file issue, run targeted checks, document the exact cause and do not conceal the failure.

## Strict restrictions

Do not:

- create an admin dashboard
- create or install a CMS
- create a database
- add scheduled publishing, cron jobs or background automation
- create a keyword-tracking dashboard
- add unnecessary dependencies
- redesign the blog or unrelated pages
- alter environment files or expose secrets
- overwrite unrelated work
- publish duplicate posts
- publish more than two posts in one run
- use unsupported claims or fake trend data
- deploy unless deployment is explicitly requested and authorized

## Required completion report

After implementation, report:

1. the selected topics and why each was chosen
2. the primary research sources, with direct links
3. article titles, word counts, publication dates and local routes
4. every file created or modified
5. generated-image paths and a short description of each final prompt
6. SEO improvements included
7. image verification, lint, type-check, build and browser/HTTP test results
8. any remaining limitation, pre-existing failure or deployment status

Lead with the completed result. Do not merely provide recommendations or paste unfinished article drafts.
