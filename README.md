# Will AI Take My Job?

Static SEO site for `willaitakemyjob.co.uk`, ready for GitHub Pages.

## What is included

- Searchable AI job risk checker
- 30 crawlable role guides
- Category pages for all jobs, safer jobs, high-risk jobs, and AI skills
- Methodology, about, editorial policy, advertise, privacy, 404, robots.txt, sitemap.xml, CNAME, and .nojekyll
- Role guide FAQ schema, Article schema, Organization schema, review notes, source lists, and correction policy
- Newsletter waitlist placeholder
- Sponsor placement placeholder
- SEO title, description, canonical URL, Open Graph, FAQ schema, robots.txt, and sitemap.xml

## GitHub Pages launch path

1. Create a GitHub repo and push this folder.
2. In GitHub, go to Settings > Pages.
3. Set the source to the main branch and root folder.
4. Keep the included `CNAME` file for `willaitakemyjob.co.uk`.
5. Point your domain DNS at GitHub Pages.
6. Submit `https://willaitakemyjob.co.uk/sitemap.xml` in Google Search Console.
7. Replace the newsletter placeholder in `script.js` with Beehiiv, ConvertKit, Buttondown, or Mailchimp.
8. Replace sponsor emails once the domain mailbox exists.

## Rebuilding pages

The site is generated from `tools/build-site.js`.

```bash
node tools/build-site.js
```

Run this after adding new roles or changing templates. It rebuilds `index.html`, role pages, cluster pages, `sitemap.xml`, `robots.txt`, `CNAME`, `.nojekyll`, and `404.html`.

## First monetisation options

- Sponsored placement above the job grid.
- Affiliate links inside role results for AI courses, CV tools, and career coaching.
- Display ads after traffic begins.
- Paid downloadable "AI survival plan" reports for high-volume job titles.

## Next SEO expansion

Add more dedicated pages for high-volume queries such as:

- `/will-ai-take-accounting-jobs/`
- `/will-ai-take-software-developer-jobs/`
- `/will-ai-take-teaching-jobs/`
- `/jobs-safe-from-ai/`
- `/best-ai-skills-to-learn/`

## Immediate post-launch checklist

- Add Google Search Console and Bing Webmaster Tools.
- Add privacy-friendly analytics such as Plausible, Fathom, or Cloudflare Web Analytics.
- Create a real email list provider form.
- Start a backlinkable report page: "UK AI Job Risk Index 2026".
- Replace the placeholder contact emails with working mailboxes.
