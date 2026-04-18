const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const baseUrl = "https://willaitakemyjob.co.uk";
const today = new Date().toISOString().slice(0, 10);

const sources = [
  ["World Economic Forum Future of Jobs 2025", "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/2-jobs-outlook/"],
  ["UK Government: impact of AI on UK jobs and training", "https://www.gov.uk/government/publications/the-impact-of-ai-on-uk-jobs-and-training"],
  ["UK Government: assessment of AI capabilities and the labour market", "https://www.gov.uk/government/publications/assessment-of-ai-capabilities-and-the-impact-on-the-uk-labour-market/assessment-of-ai-capabilities-and-the-impact-on-the-uk-labour-market"],
  ["UK Government: AI skills labour market projections", "https://www.gov.uk/government/publications/ai-skills-for-life-and-work-labour-market-and-skills-projections/ai-skills-for-life-and-work-labour-market-and-skills-projections"],
  ["Anthropic Economic Index", "https://www.anthropic.com/economic-index"],
  ["Anthropic Economic Index: economic primitives", "https://www.anthropic.com/research/anthropic-economic-index-january-2026-report"],
  ["Office for National Statistics automation analysis", "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/whichoccupationsareathighestriskofbeingautomated/2019-03-25"],
  ["OECD human-centred AI adoption in the world of work", "https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/12/compendium-of-best-practices-for-the-human-centered-adoption-of-safe-secure-and-trustworthy-ai-in-the-world-of-work_90541127/INMX2843.pdf"]
];

const roles = [
  role("software-developer", "Software developer", 44, "Technology", "The role changes quickly, but developers who understand products, systems, security, users, and deployment still have leverage.", ["Boilerplate code", "Unit test drafts", "Documentation", "Small refactors", "Code search"], ["Own architecture", "Use AI for delivery", "Learn security", "Talk to users", "Ship measurable outcomes"]),
  role("accountant", "Accountant", 58, "Finance", "Routine bookkeeping and reporting are exposed. Advisory work, tax judgement, audit quality, and client trust are harder to automate.", ["Invoice matching", "Data entry", "Variance notes", "Basic reports", "Reconciliation checks"], ["Move into advisory", "Use AI reconciliations", "Specialise in tax", "Improve client communication", "Own controls"]),
  role("teacher", "Teacher", 28, "Education", "AI will help with planning, feedback, tutoring, and admin, but classrooms still need care, authority, safeguarding, and judgement.", ["Lesson drafts", "Quiz generation", "Feedback templates", "Admin summaries", "Resource adaptation"], ["Teach AI literacy", "Strengthen pastoral skills", "Use AI for planning", "Focus on assessment", "Lead curriculum change"]),
  role("graphic-designer", "Graphic designer", 67, "Creative", "Basic asset production is under pressure. Brand strategy, taste, art direction, client handling, and campaign thinking matter more.", ["Concept drafts", "Social variants", "Background removal", "Simple layouts", "Image generation"], ["Sell brand systems", "Learn AI image workflows", "Move into art direction", "Build campaign case studies", "Package retainers"]),
  role("copywriter", "Copywriter", 72, "Creative", "Generic copy is heavily exposed. Research, positioning, voice, conversion strategy, and accountability still create value.", ["First drafts", "Email variants", "SEO outlines", "Ad copy tests", "Product descriptions"], ["Own customer research", "Learn analytics", "Specialise by industry", "Build outcome-led proof", "Become an editor-strategist"]),
  role("customer-service-agent", "Customer service agent", 76, "Operations", "Tier-one support is a prime automation target. Complex complaints, empathy, retention, and escalation work are safer.", ["FAQ answers", "Ticket routing", "Chat responses", "Call summaries", "Knowledge-base suggestions"], ["Move into escalation", "Learn support operations", "Own help content", "Build retention skills", "Handle sensitive cases"]),
  role("data-analyst", "Data analyst", 55, "Data", "Basic dashboards and SQL are easier to generate. Business context, data quality, experiment design, and storytelling keep value high.", ["SQL drafts", "Chart suggestions", "Dashboard notes", "Anomaly summaries", "Cleaning scripts"], ["Own metric definitions", "Learn causal thinking", "Improve data engineering", "Tell business stories", "Partner with decision makers"]),
  role("project-manager", "Project manager", 45, "Operations", "Status reporting gets automated. The safer value is unblocking people, handling trade-offs, and making decisions stick.", ["Status reports", "Meeting notes", "Risk logs", "Timeline drafts", "Dependency summaries"], ["Own stakeholder trust", "Use AI for admin", "Get technical context", "Improve decision discipline", "Resolve conflict"]),
  role("marketing-manager", "Marketing manager", 52, "Marketing", "Content production accelerates. Brand judgement, distribution, experiments, and commercial accountability become more important.", ["Campaign drafts", "Content calendars", "Audience research", "Performance summaries", "Ad variations"], ["Own growth metrics", "Learn automation stacks", "Build channel expertise", "Run better experiments", "Connect brand to revenue"]),
  role("solicitor", "Solicitor", 39, "Legal", "Document review and drafting will speed up. Legal responsibility, negotiation, strategy, and regulated judgement remain human-led.", ["Contract summaries", "Case research", "Clause comparison", "Draft letters", "Disclosure review"], ["Use AI review tools", "Specialise deeply", "Improve client advisory", "Stay close to compliance", "Own risk decisions"]),
  role("paralegal", "Paralegal", 63, "Legal", "Research, document prep, and review workflows are exposed. Matter management, evidence handling, client care, and legal process knowledge still matter.", ["Document review", "Legal research", "Bundle preparation", "Chronologies", "Template letters"], ["Master legal tech", "Move into complex matters", "Improve evidence handling", "Build client skills", "Learn compliance workflows"]),
  role("nurse", "Nurse", 18, "Healthcare", "AI can help with notes, triage, and scheduling, but hands-on care, accountability, and patient trust are resilient.", ["Shift notes", "Triage prompts", "Care plan drafts", "Scheduling admin", "Patient education drafts"], ["Learn digital health tools", "Develop specialist practice", "Strengthen patient education", "Lead workflow improvement", "Mentor others"]),
  role("doctor", "Doctor", 24, "Healthcare", "AI will support diagnosis, documentation, and triage, but clinical accountability, bedside judgement, and patient trust remain central.", ["Clinical notes", "Differential prompts", "Referral letters", "Literature summaries", "Admin coding"], ["Use AI safely", "Specialise clinically", "Improve communication", "Lead governance", "Audit AI outputs"]),
  role("electrician", "Electrician", 12, "Trades", "Physical skilled work is resilient. AI helps quotes, diagnostics, stock, and paperwork rather than replacing the trade.", ["Quote drafts", "Fault checklists", "Stock planning", "Customer messages", "Invoice notes"], ["Offer smart-home installs", "Use AI for admin", "Build local SEO", "Train apprentices", "Specialise in renewables"]),
  role("plumber", "Plumber", 13, "Trades", "Hands-on trade work remains hard to automate. The biggest gains come from better booking, quoting, diagnostics, and customer follow-up.", ["Quote drafts", "Booking messages", "Fault checklists", "Invoice descriptions", "Customer FAQs"], ["Build local reputation", "Use AI for admin", "Specialise in heat pumps", "Improve maintenance plans", "Train junior staff"]),
  role("hr-manager", "HR manager", 46, "People", "HR admin and screening will change. Employee relations, policy judgement, investigations, and trust-heavy conversations stay human-led.", ["Job descriptions", "Screening notes", "Policy drafts", "Survey summaries", "Training outlines"], ["Lead AI policy", "Handle complex ER", "Improve workforce planning", "Use people analytics", "Own culture change"]),
  role("recruiter", "Recruiter", 62, "People", "Sourcing and screening are exposed. Market knowledge, trust, candidate relationships, and hiring strategy still matter.", ["Candidate search", "CV screening", "Outreach drafts", "Interview summaries", "Pipeline reports"], ["Build niche networks", "Advise hiring managers", "Use AI sourcing well", "Improve candidate experience", "Own salary intelligence"]),
  role("sales-representative", "Sales representative", 41, "Sales", "Prospecting and CRM admin will automate. Trust, negotiation, discovery, and complex account strategy remain valuable.", ["Lead research", "Email sequences", "Call notes", "CRM updates", "Proposal drafts"], ["Improve discovery", "Use AI for prep", "Build vertical expertise", "Negotiate better", "Own accounts"]),
  role("financial-adviser", "Financial adviser", 36, "Finance", "AI can assist planning and portfolio analysis, but regulated advice, trust, suitability, and life context keep humans central.", ["Portfolio summaries", "Scenario drafts", "Client notes", "Research", "Compliance checklists"], ["Build client trust", "Use planning tools", "Specialise by client type", "Improve behavioural coaching", "Stay compliant"]),
  role("admin-assistant", "Administrative assistant", 74, "Administration", "Calendar, document, and inbox tasks are highly exposed. Safer admin careers move toward coordination, judgement, and trusted operations.", ["Meeting notes", "Scheduling", "Document formatting", "Inbox drafting", "Travel plans"], ["Become an operations coordinator", "Own sensitive workflows", "Use automation tools", "Improve stakeholder handling", "Manage processes"]),
  role("bookkeeper", "Bookkeeper", 70, "Finance", "Bookkeeping is one of the clearest automation targets. Review, exception handling, client support, and advisory add resilience.", ["Bank feeds", "Invoice coding", "Receipt capture", "Reconciliations", "Basic reports"], ["Own exception review", "Move into advisory", "Master accounting software", "Package monthly support", "Learn tax basics"]),
  role("translator", "Translator", 68, "Language", "General translation is exposed. Specialist terminology, culture, legal or medical context, and editing machine output are safer.", ["First-pass translation", "Glossary suggestions", "Subtitles", "Simple localisation", "Terminology checks"], ["Specialise deeply", "Edit AI output", "Own transcreation", "Serve regulated sectors", "Build quality assurance"]),
  role("journalist", "Journalist", 57, "Media", "Commodity summaries and rewrites are exposed. Original reporting, sources, investigation, editorial judgement, and trust still matter.", ["News briefs", "Transcript summaries", "Headline variants", "Background research", "Social snippets"], ["Build sources", "Do original reporting", "Use AI for research", "Own a beat", "Create audience trust"]),
  role("architect", "Architect", 34, "Built Environment", "AI will speed up concepts, compliance checks, and visualisation. Client judgement, constraints, accountability, and coordination stay valuable.", ["Concept options", "Visualisations", "Code checks", "Material research", "Meeting notes"], ["Lead client strategy", "Master BIM plus AI", "Own planning context", "Improve sustainability expertise", "Coordinate teams"]),
  role("mechanic", "Mechanic", 17, "Trades", "Physical diagnostics and repair are resilient. AI helps fault-finding, parts lookup, service notes, and customer communication.", ["Fault suggestions", "Service write-ups", "Parts lookup", "Customer messages", "Maintenance reminders"], ["Specialise in EVs", "Use diagnostic tools", "Build trust locally", "Offer maintenance plans", "Train on software systems"]),
  role("chef", "Chef", 22, "Hospitality", "AI can help menus, costing, and stock, but cooking, leadership, consistency, and customer experience remain human.", ["Menu ideas", "Costing", "Stock plans", "Supplier comparison", "Allergen notes"], ["Own kitchen leadership", "Use AI for margins", "Build a signature style", "Improve operations", "Create content"]),
  role("retail-assistant", "Retail assistant", 61, "Retail", "Checkout and simple product queries are exposed. Advice, service, merchandising, and local customer relationships are safer.", ["Stock answers", "Checkout automation", "Product FAQs", "Shift notes", "Inventory prompts"], ["Move into specialist sales", "Improve product expertise", "Use clienteling tools", "Own merchandising", "Develop supervisor skills"]),
  role("warehouse-operative", "Warehouse operative", 49, "Logistics", "Robotics and optimisation will change warehouses unevenly. Roles involving equipment, exceptions, safety, and supervision are safer.", ["Picking routes", "Stock counts", "Shift planning", "Exception flags", "Inventory reports"], ["Learn automation systems", "Move into supervision", "Own safety", "Operate specialist equipment", "Improve process knowledge"]),
  role("ux-designer", "UX designer", 51, "Technology", "Wireframes and research summaries will get faster. Product thinking, facilitation, accessibility, and user judgement keep value high.", ["Wireframe drafts", "Persona drafts", "Research summaries", "Prototype copy", "Usability notes"], ["Own discovery", "Facilitate decisions", "Learn accessibility", "Use AI prototyping", "Measure outcomes"]),
  role("cybersecurity-analyst", "Cybersecurity analyst", 32, "Technology", "AI will automate triage and reporting, but threats also grow. Human judgement, incident response, and security ownership stay valuable.", ["Alert triage", "Report drafts", "Log summaries", "Phishing analysis", "Playbook suggestions"], ["Learn AI security", "Improve incident response", "Own risk communication", "Automate detection", "Stay hands-on"])
];

roles.find((r) => r.slug === "accountant").guide = "will-ai-take-accounting-jobs/";
roles.find((r) => r.slug === "accountant").searchTitle = "accounting";
roles.find((r) => r.slug === "accountant").pageTitle = "Accounting Jobs";
roles.find((r) => r.slug === "graphic-designer").guide = "will-ai-take-graphic-design-jobs/";
roles.find((r) => r.slug === "graphic-designer").searchTitle = "graphic design";
roles.find((r) => r.slug === "graphic-designer").pageTitle = "Graphic Design Jobs";

const clusters = [
  {
    slug: "jobs-safe-from-ai",
    title: "Jobs Safe From AI: Safer Careers and Skills",
    h1: "Jobs safe from AI",
    description: "The jobs most resilient to AI tend to mix hands-on work, trust, judgement, regulation, care, leadership, and local accountability.",
    intro: "No job is completely immune, but some roles are much harder to replace because they depend on physical presence, human trust, accountability, and messy real-world judgement.",
    filter: (r) => r.risk <= 35
  },
  {
    slug: "jobs-most-at-risk-from-ai",
    title: "Jobs Most at Risk From AI: Tasks to Watch",
    h1: "Jobs most at risk from AI",
    description: "Roles built around repeatable text, admin, support, and content production face faster AI disruption. See the job types to watch.",
    intro: "The highest-risk roles are usually not worthless roles. They are roles with many tasks that can be drafted, summarised, searched, routed, generated, or checked by software.",
    filter: (r) => r.risk >= 60
  },
  {
    slug: "best-ai-skills-to-learn",
    title: "Best AI Skills to Learn for Work",
    h1: "Best AI skills to learn",
    description: "Practical AI skills for workers who want to stay useful: prompting, checking, automation, data judgement, workflow design, and domain expertise.",
    intro: "The safest workers are not the people who ignore AI. They are the people who combine AI fluency with judgement, taste, responsibility, and real domain knowledge.",
    filter: () => true
  }
];

function role(slug, title, risk, category, outlook, change, safer) {
  const high = risk >= 65;
  const medium = risk >= 40 && risk < 65;
  const low = risk < 40;
  return {
    slug,
    title,
    risk,
    category,
    guide: `will-ai-take-${slug}-jobs/`,
    outlook,
    change,
    safer,
    search: `will AI take ${title.toLowerCase()} jobs`,
    audience: high
      ? "people in the role who want to move away from easily automated production work"
      : medium
        ? "people in the role who want to use AI without losing the human parts of the job"
        : "people in the role who want to use AI as leverage rather than protection",
    verdict: high
      ? `AI is unlikely to remove every ${title.toLowerCase()} job, but it can absorb a meaningful share of the repeatable work. The safest path is to move up from production into judgement, review, client context, and ownership.`
      : medium
        ? `AI will probably change parts of ${title.toLowerCase()} work before it replaces the whole role. The advantage goes to people who can combine AI speed with context, quality control, and trusted decisions.`
        : `AI is more likely to support ${title.toLowerCase()} work than replace it outright. The role has protective features such as physical delivery, accountability, care, trust, or complex real-world judgement.`,
    cantDo: low
      ? ["Take responsibility when something goes wrong", "Handle messy human situations without context", "Replace physical presence, care, or skilled manual work", "Earn trust with clients, patients, learners, or colleagues"]
      : medium
        ? ["Own unclear trade-offs", "Know what matters politically or commercially", "Take legal, ethical, or reputational responsibility", "Build trust when the answer is uncertain"]
        : ["Know whether the brief is wrong", "Protect the brand, client, or business from bad judgement", "Take accountability for published or customer-facing work", "Build original insight from weak inputs"],
    warningSigns: high
      ? ["Most of your output starts from a template", "You are paid mainly for first drafts or simple variations", "Quality is judged by speed more than judgement", "Your work can be checked cheaply by someone else"]
      : medium
        ? ["Your week is dominated by status updates, summaries, simple analysis, or handoffs", "You rarely speak to customers or decision makers", "You do not own the final judgement", "Your tools are improving faster than your responsibilities"]
        : ["Your employer treats AI as a paperwork tool only", "You avoid learning the tools younger colleagues already use", "Admin work keeps growing around the real job", "You cannot show how your judgement improves outcomes"],
    nextMoves: [
      `Create one AI-assisted workflow for a low-risk ${title.toLowerCase()} task.`,
      "Write a personal checking standard: what you will never send without human review.",
      "Collect two examples where your judgement improved or corrected AI output.",
      "Spend one hour learning a tool already used in your industry.",
      "Update your CV or portfolio to show outcomes, not just responsibilities."
    ],
    why: risk >= 65
      ? "Many of the core tasks are repeatable, text-heavy, rule-based, or easy to split into software-assisted steps."
      : risk >= 40
        ? "The role contains a mixed task profile: some work is easy to automate, while judgement, context, and stakeholder trust still matter."
        : "The role depends heavily on physical presence, regulated accountability, care, relationship work, or complex real-world judgement."
  };
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char]);
}

function riskLabel(score) {
  if (score >= 70) return "High change";
  if (score >= 45) return "Medium change";
  return "Lower change";
}

function pageShell({ title, description, canonical, body, schema = "" }) {
  const organizationSchema = `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Will AI Take My Job?",
    url: baseUrl,
    email: "hello@willaitakemyjob.co.uk",
    sameAs: []
  })}</script>`;
  return `<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="theme-color" content="#f7f3ea">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="https://images.unsplash.com/photo-1758594714142-2c1cf371ee7d?auto=format&fit=crop&w=1200&q=80">
    <link rel="canonical" href="${canonical}">
    <link rel="stylesheet" href="/styles.css">
    ${organizationSchema}
    ${schema}
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    ${header()}
    ${body}
    ${footer()}
    <script src="/script.js"></script>
  </body>
</html>
`;
}

function header() {
  return `<header class="site-header">
      <a class="brand" href="/" aria-label="Will AI Take My Job home">
        <span class="brand-mark">W</span>
        <span><strong>Will AI Take My Job?</strong><small>Work out what changes next.</small></span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/#checker">Check</a>
        <a href="/jobs/">Jobs</a>
        <a href="/methodology/">Method</a>
        <a href="/about/">About</a>
        <a href="/best-ai-skills-to-learn/">Skills</a>
      </nav>
    </header>`;
}

function footer() {
  const links = roles.slice(0, 12).map((r) => `<a href="/${r.guide}">${esc(r.title)}</a>`).join("");
  return `<footer class="site-footer expanded-footer">
      <div>
        <p>Copyright <span id="year">2026</span> Will AI Take My Job?</p>
        <p>Career guidance for workers adapting to AI. Scores are directional, not financial, legal, or employment advice.</p>
      </div>
      <div class="footer-links">
        <a href="/jobs/">All jobs</a>
        <a href="/jobs-safe-from-ai/">Safer jobs</a>
        <a href="/jobs-most-at-risk-from-ai/">At-risk jobs</a>
        <a href="/methodology/">Methodology</a>
        <a href="/about/">About</a>
        <a href="/editorial-policy/">Editorial policy</a>
        <a href="/advertise/">Advertise</a>
        <a href="/privacy/">Privacy</a>
        ${links}
      </div>
    </footer>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function renderIndex() {
  const guideLinks = roles.map((r) => `<a href="/${r.guide}">${esc(r.title)} <span>${r.risk}/100</span></a>`).join("");
  const topCards = roles.slice(0, 12).map((r) => jobCard(r)).join("");
  const schema = `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Will AI Take My Job?",
    url: `${baseUrl}/`,
    applicationCategory: "CareerApplication",
    operatingSystem: "Any",
    description: "A free AI job risk checker with practical career guidance for UK workers.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }
  })}</script>`;

  return pageShell({
    title: "Will AI Take My Job? Free UK AI Job Risk Checker",
    description: "Search your job title and get a practical AI risk score, tasks likely to change, safer career moves, and skills worth learning next.",
    canonical: `${baseUrl}/`,
    schema,
    body: `<main id="main">
      <section class="tool-hero" id="checker">
        <div class="tool-copy">
          <p class="eyebrow">Free UK AI job checker</p>
          <h1>Will AI take your job?</h1>
          <p class="lead">Search your role for a plain-English risk score, the tasks most likely to change, and the moves that make you harder to replace.</p>
          <form class="search-box" id="role-form" autocomplete="off">
            <label for="role-input">Job title</label>
            <div class="search-row">
              <input id="role-input" name="role" type="search" list="role-suggestions" placeholder="Try accountant, teacher, designer..." aria-describedby="role-help">
              <button type="submit">Check risk</button>
            </div>
            <datalist id="role-suggestions"></datalist>
            <p id="role-help">No signup needed. Results are practical, not panic fuel.</p>
          </form>
          <div class="quick-picks" aria-label="Popular searches">
            ${roles.slice(0, 8).map((r) => `<button type="button" data-role="${esc(r.title)}">${esc(r.title)}</button>`).join("")}
          </div>
        </div>
        <div class="result-panel" id="result-panel" aria-live="polite">
          <div class="result-empty">
            <img src="https://images.unsplash.com/photo-1758594714142-2c1cf371ee7d?auto=format&fit=crop&w=900&q=80" alt="Laptop showing an AI workspace on a desk">
            <p>Pick a role to see the risk, the opportunity, and the next best move.</p>
          </div>
        </div>
      </section>
      <section class="ad-strip" aria-label="Sponsored slot">
        <p>Sponsored placement</p>
        <strong>AI tools, course providers, recruiters, CV services, and career brands can reach high-intent UK workers here.</strong>
        <a href="/advertise/">Advertise</a>
      </section>
      <section class="trust-strip">
        <article><strong>${roles.length}</strong><span>job guides</span></article>
        <article><strong>100</strong><span>point risk scale</span></article>
        <article><strong>UK</strong><span>sources and labour market context</span></article>
        <article><strong>${today}</strong><span>last methodology update</span></article>
      </section>
      <section class="credibility-band">
        <div>
          <p class="eyebrow">Why this exists</p>
          <h2>Less panic. Better career decisions.</h2>
          <p>Will AI Take My Job? scores jobs by task exposure, not vibes. The goal is to show what changes first, what remains human, and what to learn before the change is forced on you.</p>
        </div>
        <div class="credibility-list">
          <a href="/methodology/">Read the scoring method</a>
          <a href="/editorial-policy/">Read the editorial policy</a>
          <a href="/about/">Who runs this site</a>
        </div>
      </section>
      <section class="job-grid-section" id="jobs">
        <div class="section-heading">
          <p class="eyebrow">Popular searches</p>
          <h2>AI risk by job type</h2>
          <p>Start with the high-volume searches, then use the full library for long-tail traffic.</p>
        </div>
        <div class="job-grid">${topCards}</div>
        <div class="article-cta"><a href="/jobs/">Browse all ${roles.length} job guides</a><a href="/jobs-most-at-risk-from-ai/">See high-risk roles</a><a href="/jobs-safe-from-ai/">See safer roles</a></div>
      </section>
      <section class="split-section" id="money">
        <div>
          <p class="eyebrow">Earn safer</p>
          <h2>Do not just ask whether AI replaces you. Ask how you become the person using it.</h2>
          <p>The safer path is usually a mix of domain knowledge, judgement, client trust, and AI fluency. The checker turns that into a short list you can act on this week.</p>
          <div class="action-list">
            <article><span>1</span><h3>Automate the boring part</h3><p>Drafts, summaries, research notes, spreadsheets, QA checks, meeting prep.</p></article>
            <article><span>2</span><h3>Keep the human part</h3><p>Taste, trust, accountability, negotiation, care, ethics, leadership.</p></article>
            <article><span>3</span><h3>Sell the combination</h3><p>Better output, faster delivery, lower cost, clearer decisions.</p></article>
          </div>
        </div>
        <figure class="photo-panel">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80" alt="Desk with laptop showing analytics charts">
          <figcaption>AI risk is task risk. Your leverage comes from changing the task mix.</figcaption>
        </figure>
      </section>
      <section class="content-band">
        <div class="section-heading">
          <p class="eyebrow">Search library</p>
          <h2>Every guide</h2>
          <p>Static links for crawling, internal authority, and easy expansion.</p>
        </div>
        <div class="link-cloud">${guideLinks}</div>
      </section>
      ${newsletter()}
    </main>
    <script>window.WILL_AI_ROLES = ${JSON.stringify(roles)};</script>`
  });
}

function jobCard(r) {
  return `<article class="job-card">
      <span class="badge">${riskLabel(r.risk)} - ${r.risk}/100</span>
      <h3>${esc(r.title)}</h3>
      <p>${esc(r.outlook)}</p>
      <button type="button" data-role="${esc(r.title)}">Check ${esc(r.title.toLowerCase())}</button>
      <a href="/${r.guide}">Read the full guide</a>
    </article>`;
}

function renderRolePage(r) {
  const related = roles.filter((item) => item.category === r.category && item.slug !== r.slug).slice(0, 4);
  const queryTitle = r.searchTitle || r.title.toLowerCase();
  const headlineTitle = r.pageTitle || `${r.title} jobs`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Will AI take ${queryTitle} jobs?`,
    description: `${headlineTitle} AI risk score, task exposure, and practical career moves.`,
    dateModified: today,
    datePublished: today,
    author: { "@type": "Organization", name: "Will AI Take My Job?", url: `${baseUrl}/about/` },
    publisher: { "@type": "Organization", name: "Will AI Take My Job?", url: baseUrl },
    reviewedBy: { "@type": "Organization", name: "Will AI Take My Job? editorial desk" },
    mainEntityOfPage: `${baseUrl}/${r.guide}`
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Will AI replace ${queryTitle} jobs?`,
        acceptedAnswer: { "@type": "Answer", text: r.verdict }
      },
      {
        "@type": "Question",
        name: `What ${queryTitle} tasks are most exposed to AI?`,
        acceptedAnswer: { "@type": "Answer", text: r.change.join(", ") }
      },
      {
        "@type": "Question",
        name: `How can ${queryTitle} workers stay useful?`,
        acceptedAnswer: { "@type": "Answer", text: r.safer.join(", ") }
      }
    ]
  };
  const schema = `<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;

  return pageShell({
    title: `Will AI Take ${headlineTitle}? Risk, Tasks, and Safer Skills`,
    description: `Will AI replace ${queryTitle} jobs? See the ${r.risk}/100 AI risk score, exposed tasks, safer skills, and next career moves.`,
    canonical: `${baseUrl}/${r.guide}`,
    schema,
    body: `<main id="main" class="article-page role-page">
      <nav class="breadcrumbs" aria-label="Breadcrumbs"><a href="/">Home</a><span>/</span><a href="/jobs/">Jobs</a><span>/</span><span>${esc(r.title)}</span></nav>
      <p class="eyebrow">${esc(r.category)} AI risk</p>
      <h1>Will AI take ${esc(queryTitle)} jobs?</h1>
      <p class="lead">${esc(r.outlook)}</p>
      <div class="review-note"><span>Last reviewed ${today}</span><span>Written for ${esc(r.audience)}</span><span>Directional career guidance, not employment advice</span></div>
      <div class="role-score-row">
        <div class="risk-score"><div><strong>${r.risk}</strong><span>/ 100 risk</span></div></div>
        <div><h2>${riskLabel(r.risk)}</h2><p>${esc(r.why)}</p></div>
      </div>
      <div class="article-cta"><a href="/#${r.slug}">Try the checker</a><a href="/best-ai-skills-to-learn/">See AI skills to learn</a></div>
      <div class="article-body">
        <section><h2>Short answer</h2><p>${esc(r.verdict)}</p><p>The useful question is not only whether AI can do the work. It is whether AI can do the work reliably, inside the rules of the job, with the context and accountability a real employer or client expects.</p></section>
        <section><h2>Tasks likely to change first</h2>${list(r.change)}</section>
        <section><h2>What AI still struggles to own</h2>${list(r.cantDo)}</section>
        <section><h2>Skills that make the role safer</h2>${list(r.safer)}</section>
        <section><h2>Warning signs to watch</h2>${list(r.warningSigns)}</section>
        <section><h2>30-day action plan</h2>${list(r.nextMoves)}</section>
        <section><h2>How to talk about this in your career</h2><p>Do not present yourself as someone protected from AI. Present yourself as someone who can use AI safely, check its work, understand the domain, and take responsibility for the final outcome. That is a stronger signal to employers than simply saying you know how to prompt.</p></section>
        <section><h2>Sources and context</h2><p>The score is directional. It combines task exposure, need for physical presence, regulation, relationship work, accountability, and speed of current AI adoption. See the full scoring approach on the <a href="/methodology/">methodology page</a> and the editorial standards on the <a href="/editorial-policy/">editorial policy page</a>.</p>${sourceList()}</section>
        <section><h2>FAQs</h2><details open><summary>Will AI replace ${esc(queryTitle)} jobs?</summary><p>${esc(r.verdict)}</p></details><details><summary>Which tasks should ${esc(queryTitle)} workers automate first?</summary><p>Start with low-risk work such as ${esc(r.change.slice(0, 3).join(", ").toLowerCase())}. Keep human review for anything client-facing, regulated, financial, legal, medical, or reputational.</p></details><details><summary>What is the safest next skill?</summary><p>The safest skill is the one that combines AI use with domain judgement. For this role, start with: ${esc(r.safer[0].toLowerCase())}.</p></details></section>
        ${related.length ? `<section><h2>Related guides</h2><div class="related-links">${related.map((item) => `<a href="/${item.guide}">${esc(item.title)} <span>${item.risk}/100</span></a>`).join("")}</div></section>` : ""}
      </div>
      ${newsletter()}
    </main>`
  });
}

function sourceList() {
  return `<ul>${sources.map(([label, url]) => `<li><a href="${url}">${esc(label)}</a></li>`).join("")}</ul>`;
}

function newsletter() {
  return `<section class="newsletter-section" id="newsletter">
      <div>
        <p class="eyebrow">Weekly signal</p>
        <h2>Get the jobs, tools, and skills moving fastest.</h2>
        <p>One email a week when the list opens. No filler.</p>
      </div>
      <form class="newsletter-form" id="newsletter-form">
        <label for="email-input">Email address</label>
        <input id="email-input" type="email" placeholder="you@example.com" required>
        <button type="submit">Join the waitlist</button>
        <p id="newsletter-status" role="status"></p>
      </form>
    </section>`;
}

function renderJobsIndex() {
  const grouped = [...new Set(roles.map((r) => r.category))].map((category) => {
    const cards = roles.filter((r) => r.category === category).map((r) => jobCard(r)).join("");
    return `<section><h2>${esc(category)}</h2><div class="job-grid">${cards}</div></section>`;
  }).join("");
  return pageShell({
    title: "AI Job Risk by Career: Browse Every Guide",
    description: `Browse ${roles.length} AI job risk guides with scores, exposed tasks, safer skills, and practical next moves.`,
    canonical: `${baseUrl}/jobs/`,
    body: `<main id="main" class="article-page wide-page">
      <p class="eyebrow">Job library</p>
      <h1>AI job risk by career</h1>
      <p class="lead">Every page is a crawlable guide built around a specific search query, with internal links back to the checker and related roles.</p>
      <div class="article-cta"><a href="/jobs-most-at-risk-from-ai/">Most at risk</a><a href="/jobs-safe-from-ai/">Safer jobs</a><a href="/methodology/">How scores work</a></div>
      <div class="article-body grouped-jobs">${grouped}</div>
    </main>`
  });
}

function renderClusterPage(c) {
  const selected = roles.filter(c.filter).sort((a, b) => c.slug.includes("safe") ? a.risk - b.risk : b.risk - a.risk);
  const content = c.slug === "best-ai-skills-to-learn"
    ? `<section><h2>The core skills</h2>${list(["Prompting with context, constraints, and examples", "Checking AI output for facts, gaps, bias, and tone", "Workflow automation with spreadsheets, forms, docs, and task tools", "Data judgement: knowing what the numbers can and cannot prove", "Domain expertise that lets you spot nonsense quickly", "Communication: turning AI-assisted work into decisions people trust"])}</section><section><h2>A practical learning order</h2>${list(["Week 1: use AI for summaries, checklists, and first drafts only.", "Week 2: build one repeatable workflow for your current job.", "Week 3: learn how to verify sources, numbers, and claims.", "Week 4: document one example where AI helped you produce a better outcome.", "Month 2: learn the specialist tool most relevant to your profession."])}</section>`
    : `<section><h2>Roles in this group</h2><div class="job-grid">${selected.map((r) => jobCard(r)).join("")}</div></section>`;
  return pageShell({
    title: c.title,
    description: c.description,
    canonical: `${baseUrl}/${c.slug}/`,
    body: `<main id="main" class="article-page wide-page">
      <p class="eyebrow">AI career guide</p>
      <h1>${esc(c.h1)}</h1>
      <p class="lead">${esc(c.intro)}</p>
      <div class="article-body">
        ${content}
        <section><h2>How to use this</h2><p>Look at tasks, not just job titles. The same job can be safer or riskier depending on whether the worker owns judgement, customers, compliance, physical delivery, quality, or business outcomes.</p><p>A useful career move is rarely "learn AI" in the abstract. It is learning how AI changes your actual workflow, then moving toward the parts of the work where trust, responsibility, and context matter.</p></section>
        <section><h2>Sources and context</h2>${sourceList()}</section>
      </div>
    </main>`
  });
}

function renderMethodology() {
  return pageShell({
    title: "Methodology: How the AI Job Risk Scores Work",
    description: "How Will AI Take My Job estimates AI risk using task exposure, physical presence, judgement, regulation, relationships, and adoption speed.",
    canonical: `${baseUrl}/methodology/`,
    body: `<main id="main" class="article-page">
      <p class="eyebrow">Methodology</p>
      <h1>How the AI risk scores work</h1>
      <p class="lead">The score is a practical signal, not a prophecy. It estimates how much of a role's task mix could be changed by AI and automation, then turns that into career guidance.</p>
      <div class="review-note"><span>Last reviewed ${today}</span><span>Based on task exposure, not job-title panic</span><span>Designed for UK workers and job seekers</span></div>
      <div class="article-body">
        <section><h2>The short version</h2><p>We do not score a job as risky just because AI can produce something that looks similar. We score risk higher when a large share of the role is digital, repeatable, draftable, searchable, checkable, or routable by software, and lower when the role depends on physical presence, regulated accountability, human trust, care, persuasion, leadership, or messy real-world judgement.</p></section>
        <section><h2>What raises risk</h2>${list(["Repeatable text or admin tasks", "High volume support, routing, or summarising", "Clear rules and low ambiguity", "Digital-only work with few physical constraints", "Low accountability if the first draft is wrong"])}</section>
        <section><h2>What lowers risk</h2>${list(["Physical presence and manual skill", "Regulated accountability", "Human care, trust, and persuasion", "Complex real-world context", "Leadership, judgement, taste, and ownership"])}</section>
        <section><h2>Score bands</h2><p><strong>0-34:</strong> lower change. AI is more likely to support the role than replace it. <strong>35-64:</strong> medium change. Some tasks are exposed, but human judgement remains a major part of value. <strong>65-100:</strong> high change. High change does not mean worthless; it means the task mix is likely to be reshaped faster.</p></section>
        <section><h2>How to read the score</h2>${list(["A score is about task exposure, not personal worth.", "A high score can still be an opportunity if you move into review, strategy, trust, or ownership.", "A low score does not mean ignore AI; it means use it to remove admin drag.", "Local labour markets, regulation, employer budgets, and customer expectations can change the outcome.", "The safest workers are usually those who combine AI fluency with domain expertise."])}</section>
        <section><h2>Editorial limits</h2><p>We avoid pretending that anyone can predict the labour market perfectly. Scores are deliberately directional and should be used for career planning, not as a guarantee about redundancy, hiring, salary, or investment decisions.</p></section>
        <section><h2>Sources</h2>${sourceList()}</section>
      </div>
    </main>`
  });
}

function renderStaticPage(slug, title, description, body) {
  return pageShell({ title, description, canonical: `${baseUrl}/${slug}/`, body });
}

function renderScript() {
  return `const roles = window.WILL_AI_ROLES || ${JSON.stringify(roles, null, 2)};
const fallback = { risk: 49, outlook: "This role likely contains a mix of automatable tasks and human judgement. The safest move is to identify repeatable desk work, automate it, and double down on the parts involving trust, responsibility, and context.", change: ["Drafting and summarising", "Research and comparison", "Admin and reporting", "Simple quality checks"], safer: ["Learn practical AI tools", "Get closer to customers", "Specialise in a niche", "Own outcomes, not just tasks"] };
const roleInput = document.querySelector("#role-input");
const roleForm = document.querySelector("#role-form");
const suggestions = document.querySelector("#role-suggestions");
const resultPanel = document.querySelector("#result-panel");
const newsletterForm = document.querySelector("#newsletter-form");
const newsletterStatus = document.querySelector("#newsletter-status");
function normalise(value) { return value.trim().toLowerCase(); }
function findRole(value) {
  const query = normalise(value);
  return roles.find((role) => normalise(role.title) === query || role.slug === query.replaceAll(" ", "-"))
    || roles.find((role) => normalise(role.title).includes(query) || query.includes(normalise(role.title)))
    || { title: value.trim() || "Your role", slug: "your-role", ...fallback };
}
function riskLabel(score) { if (score >= 70) return "High change"; if (score >= 45) return "Medium change"; return "Lower change"; }
function renderResult(role) {
  if (!resultPanel) return;
  const marker = \`calc(\${role.risk}% - 0.325rem)\`;
  resultPanel.innerHTML = \`
    <article class="result-card">
      <div class="risk-topline">
        <div><p class="eyebrow">\${riskLabel(role.risk)}</p><h2>\${role.title}</h2><p>\${role.outlook}</p></div>
        <div class="risk-score" aria-label="AI change risk score \${role.risk} out of 100"><div><strong>\${role.risk}</strong><span>/ 100 risk</span></div></div>
      </div>
      <div class="risk-meter" aria-hidden="true"><div class="risk-marker" style="--risk-position: \${marker}"></div></div>
      <div><h3>Tasks likely to change first</h3><ul class="result-list">\${role.change.map((item) => \`<li>\${item}</li>\`).join("")}</ul></div>
      <div><h3>Moves that make you safer</h3><ul class="result-list">\${role.safer.map((item) => \`<li>\${item}</li>\`).join("")}</ul></div>
      <div class="result-actions"><a href="/\${role.guide || "jobs/"}">Read the full guide</a><a class="secondary" href="#newsletter">Track this role</a></div>
    </article>\`;
}
function selectRole(title) { const role = findRole(title); if (roleInput) roleInput.value = role.title; renderResult(role); if (location.pathname === "/") history.replaceState(null, "", \`#\${role.slug}\`); }
if (suggestions) roles.forEach((role) => { const option = document.createElement("option"); option.value = role.title; suggestions.appendChild(option); });
if (roleForm) roleForm.addEventListener("submit", (event) => { event.preventDefault(); selectRole(roleInput.value); });
document.addEventListener("click", (event) => { const button = event.target.closest("[data-role]"); if (!button) return; selectRole(button.dataset.role); const checker = document.querySelector("#checker"); if (checker) checker.scrollIntoView({ behavior: "smooth", block: "start" }); });
if (newsletterForm) newsletterForm.addEventListener("submit", (event) => { event.preventDefault(); const email = document.querySelector("#email-input").value; const signups = JSON.parse(localStorage.getItem("willai-signups") || "[]"); signups.push({ email, date: new Date().toISOString() }); localStorage.setItem("willai-signups", JSON.stringify(signups)); newsletterStatus.textContent = "You are on the list. Swap this form for Beehiiv, ConvertKit, Mailchimp, or Buttondown before launch."; newsletterForm.reset(); });
const hashRole = decodeURIComponent(location.hash.replace("#", "").replaceAll("-", " "));
if (hashRole) selectRole(hashRole);
`;
}

function write(file, content) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
}

function writePage(slug, html) {
  write(path.join(slug, "index.html"), html);
}

function sitemap() {
  const urls = [
    "",
    "jobs/",
    "methodology/",
    "about/",
    "editorial-policy/",
    "advertise/",
    "privacy/",
    ...clusters.map((c) => `${c.slug}/`),
    ...roles.map((r) => r.guide)
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${baseUrl}/${url}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
}

write("index.html", renderIndex());
write("script.js", renderScript());
write("sitemap.xml", sitemap());
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
write("CNAME", "willaitakemyjob.co.uk\n");
write(".nojekyll", "");
write("404.html", pageShell({
  title: "Page Not Found",
  description: "The page was not found. Search your job title or browse the AI job risk library.",
  canonical: `${baseUrl}/404.html`,
  body: `<main id="main" class="article-page"><p class="eyebrow">404</p><h1>Page not found</h1><p class="lead">Try the checker or browse every AI job risk guide.</p><div class="article-cta"><a href="/">Use the checker</a><a href="/jobs/">Browse jobs</a></div></main>`
}));
writePage("jobs", renderJobsIndex());
writePage("methodology", renderMethodology());
writePage("about", renderStaticPage("about", "About Will AI Take My Job", "Will AI Take My Job is a practical career resource for workers who want clear, sourced guidance on how AI may change their role.", `<main id="main" class="article-page"><p class="eyebrow">About</p><h1>AI career advice without the panic theatre.</h1><p class="lead">Will AI Take My Job? helps workers understand which parts of their role are exposed to AI, which parts remain human, and what to do next.</p><div class="article-body"><section><h2>What we believe</h2>${list(["AI changes tasks before it changes whole careers.", "A job title is less useful than a task mix.", "Fear is a poor career strategy, but so is denial.", "The safest workers combine AI fluency with judgement, trust, and domain expertise.", "Good guidance should tell people what to do next, not just scare them."])}</section><section><h2>How the site is built</h2><p>Each guide combines a structured risk model with published labour market research, task-level AI exposure thinking, and practical career advice. The goal is to be useful enough for a worker to make a better decision this week.</p></section><section><h2>Who it is for</h2><p>The site is written for UK workers, students, career changers, managers, recruiters, and anyone trying to separate real AI risk from vague headlines.</p></section><section><h2>Contact</h2><p>Email <a href="mailto:hello@willaitakemyjob.co.uk">hello@willaitakemyjob.co.uk</a>.</p></section></div></main>`));
writePage("editorial-policy", renderStaticPage("editorial-policy", "Editorial Policy", "How Will AI Take My Job researches, writes, reviews, and updates AI career guidance.", `<main id="main" class="article-page"><p class="eyebrow">Editorial policy</p><h1>How we keep the guidance useful.</h1><p class="lead">The site is designed to be practical, sourced, and honest about uncertainty.</p><div class="article-body"><section><h2>Research standards</h2>${list(["We prioritise official, primary, or reputable sources for labour market context.", "We separate task exposure from total job replacement.", "We do not present a score as a prediction of redundancy.", "We update the model when better evidence becomes available.", "We avoid advice that depends on panic, miracle tools, or guaranteed outcomes."])}</section><section><h2>Review process</h2><p>Pages are reviewed for clarity, internal consistency, source quality, and whether the recommended actions match the risk profile of the role. The last reviewed date appears on role and methodology pages.</p></section><section><h2>Corrections</h2><p>If a score, source, or recommendation looks wrong, email <a href="mailto:hello@willaitakemyjob.co.uk">hello@willaitakemyjob.co.uk</a>. Corrections should include the page URL and the evidence you think should be considered.</p></section><section><h2>Commercial independence</h2><p>Future sponsorships or affiliate links should be disclosed where they appear. Commercial relationships should not decide a role's risk score.</p></section></div></main>`));
writePage("advertise", renderStaticPage("advertise", "Advertise on Will AI Take My Job", "Reach UK workers searching for AI job risk, career moves, tools, training, and safer skills.", `<main id="main" class="article-page"><p class="eyebrow">Advertise</p><h1>Reach workers already thinking about AI and their career.</h1><p class="lead">Good-fit sponsors include AI tools, training providers, CV services, recruiters, career coaches, bootcamps, and productivity software.</p><div class="article-body"><section><h2>Available placements</h2>${list(["Homepage sponsor strip", "Role guide recommendation blocks", "Newsletter sponsorship", "Dedicated guide sponsorship", "Affiliate placement with disclosure"])}</section><section><h2>Contact</h2><p>Email <a href="mailto:sponsor@willaitakemyjob.co.uk">sponsor@willaitakemyjob.co.uk</a>.</p></section></div></main>`));
writePage("privacy", renderStaticPage("privacy", "Privacy Policy", "Privacy policy for Will AI Take My Job.", `<main id="main" class="article-page"><p class="eyebrow">Privacy</p><h1>Privacy policy</h1><p class="lead">This site is designed to collect as little data as possible until real analytics, email, or advertising tools are added.</p><div class="article-body"><section><h2>Email</h2><p>The demo waitlist stores email addresses in your browser only. Replace it with a real provider before launch.</p></section><section><h2>Advertising and affiliates</h2><p>Future affiliate or sponsored placements should be disclosed clearly on the page where they appear.</p></section><section><h2>Contact</h2><p>Email <a href="mailto:hello@willaitakemyjob.co.uk">hello@willaitakemyjob.co.uk</a>.</p></section></div></main>`));
clusters.forEach((cluster) => writePage(cluster.slug, renderClusterPage(cluster)));
roles.forEach((r) => writePage(r.guide.replace(/\/$/, ""), renderRolePage(r)));

console.log(`Built ${roles.length} role pages, ${clusters.length} cluster pages, and sitemap.xml`);
