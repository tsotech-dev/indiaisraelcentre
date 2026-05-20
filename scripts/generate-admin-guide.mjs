import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'http://localhost:3000/admin'
const EMAIL = 'admin@admin.com'
const PASSWORD = 'adminadmin'
const OUT_DIR = path.join(__dirname, '../admin-guide-assets')
const PDF_OUT = path.join(__dirname, '../IIC-Admin-Guide.pdf')

fs.mkdirSync(OUT_DIR, { recursive: true })

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: { width: 1440, height: 900 },
})
const page = await browser.newPage()

async function shot(filename, waitFor = 1200) {
  await new Promise(r => setTimeout(r, waitFor))
  const p = path.join(OUT_DIR, filename)
  await page.screenshot({ path: p, fullPage: false })
  console.log('  📸', filename)
  return p
}

async function goto(url, waitFor = 2000) {
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
  await new Promise(r => setTimeout(r, waitFor))
}

console.log('🔑 Logging in...')
await goto(`${BASE_URL}/login`)
await page.waitForSelector('input[id="field-email"], input[type="email"], input[name="email"]', { timeout: 20000 })
const loginShot = await shot('01-login.png')
const emailSel = await page.$('input[id="field-email"]') ? 'input[id="field-email"]' : 'input[type="email"]'
const passSel = await page.$('input[id="field-password"]') ? 'input[id="field-password"]' : 'input[type="password"]'
await page.type(emailSel, EMAIL)
await page.type(passSel, PASSWORD)
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }),
  page.click('button[type="submit"]'),
])
await new Promise(r => setTimeout(r, 2000))

console.log('🏠 Dashboard...')
await goto(`${BASE_URL}`)
const dashShot = await shot('02-dashboard.png')

console.log('📚 Publications list...')
await goto(`${BASE_URL}/collections/publications`)
const pubListShot = await shot('03-publications-list.png')

console.log('📝 Create publication...')
await goto(`${BASE_URL}/collections/publications/create`)
const pubCreateShot = await shot('04-publication-create-top.png')
await page.evaluate(() => window.scrollTo(0, 600))
await new Promise(r => setTimeout(r, 500))
const pubCreateMidShot = await shot('05-publication-create-body.png')
await page.evaluate(() => window.scrollTo(0, 9999))
await new Promise(r => setTimeout(r, 500))
const pubCreateBotShot = await shot('06-publication-create-bottom.png')

console.log('👥 People list...')
await goto(`${BASE_URL}/collections/people`)
const peopleListShot = await shot('07-people-list.png')

console.log('👤 Create person...')
await goto(`${BASE_URL}/collections/people/create`)
const peopleCreateShot = await shot('08-people-create.png')

console.log('📅 Convenings list...')
await goto(`${BASE_URL}/collections/convenings`)
const convListShot = await shot('09-convenings-list.png')

console.log('📅 Create convening...')
await goto(`${BASE_URL}/collections/convenings/create`)
const convCreateShot = await shot('10-convenings-create.png')

console.log('📧 Newsletter subscribers...')
await goto(`${BASE_URL}/collections/newsletter-subscribers`)
const newsletterShot = await shot('11-newsletter-subscribers.png')

console.log('🖼  Media...')
await goto(`${BASE_URL}/collections/media`)
const mediaListShot = await shot('12-media-list.png')

console.log('🏛  Pillars...')
await goto(`${BASE_URL}/collections/pillars`)
const pillarsShot = await shot('13-pillars-list.png')

console.log('🌐 Homepage global...')
await goto(`${BASE_URL}/globals/home`)
const homeGlobalShot = await shot('14-global-home.png')

console.log('ℹ️  About global...')
await goto(`${BASE_URL}/globals/about`)
const aboutGlobalShot = await shot('15-global-about.png')

console.log('🎤 Forum global...')
await goto(`${BASE_URL}/globals/forum`)
const forumGlobalShot = await shot('16-global-forum.png')

await browser.close()
console.log('✅ All screenshots taken.')

// ── Build HTML ──────────────────────────────────────────────────────────────

function img(p) {
  const data = fs.readFileSync(p)
  return `data:image/png;base64,${data.toString('base64')}`
}

function section(num, title, desc, shots) {
  const imgs = shots.map(({ src, caption }) => `
    <figure>
      <img src="${img(src)}" alt="${caption}" />
      <figcaption>${caption}</figcaption>
    </figure>
  `).join('')
  return `
    <section class="section">
      <div class="section-header">
        <span class="section-num">${num}</span>
        <h2>${title}</h2>
      </div>
      <p class="section-desc">${desc}</p>
      ${imgs}
    </section>
  `
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; color: #1a1a2e; background: #fff; }

  /* Cover */
  .cover {
    width: 100%; height: 100vh; min-height: 900px;
    background: linear-gradient(135deg, #001a3d 0%, #003580 60%, #002060 100%);
    display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
    padding: 80px 90px; position: relative; overflow: hidden;
    page-break-after: always;
  }
  .cover::before {
    content: ''; position: absolute; top: -200px; right: -200px;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, #FF671F33 0%, transparent 70%);
  }
  .cover::after {
    content: ''; position: absolute; bottom: -200px; left: -100px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, #FFD70022 0%, transparent 70%);
  }
  .cover-eyebrow {
    font-size: 11px; font-weight: 700; letter-spacing: 0.22em;
    text-transform: uppercase; color: #FF671F; margin-bottom: 24px;
  }
  .cover h1 {
    font-size: 56px; font-weight: 800; color: #fff; line-height: 1.05;
    letter-spacing: -0.02em; margin-bottom: 16px; max-width: 700px;
  }
  .cover-subtitle {
    font-size: 20px; color: rgba(255,255,255,0.6); margin-bottom: 48px;
    max-width: 560px; line-height: 1.5;
  }
  .cover-meta {
    display: flex; gap: 32px; margin-top: auto; padding-top: 60px;
    border-top: 1px solid rgba(255,255,255,0.12); width: 100%;
  }
  .cover-meta-item { color: rgba(255,255,255,0.4); font-size: 12px; }
  .cover-meta-item strong { display: block; color: rgba(255,255,255,0.8); font-size: 13px; margin-bottom: 4px; }

  /* TOC */
  .toc {
    padding: 72px 90px; page-break-after: always; min-height: 80vh;
  }
  .toc h2 { font-size: 28px; font-weight: 700; margin-bottom: 36px; color: #001a3d; }
  .toc ol { list-style: none; counter-reset: toc; }
  .toc ol li {
    counter-increment: toc; display: flex; align-items: baseline;
    gap: 12px; padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px;
  }
  .toc ol li::before {
    content: counter(toc, decimal-leading-zero);
    font-size: 11px; font-weight: 700; color: #FF671F; min-width: 28px;
    letter-spacing: 0.1em;
  }
  .toc ol li span { color: #555; font-size: 13px; margin-left: auto; }

  /* Intro */
  .intro {
    padding: 72px 90px; page-break-after: always;
  }
  .intro h2 { font-size: 28px; font-weight: 700; margin-bottom: 20px; color: #001a3d; }
  .intro p { font-size: 15px; line-height: 1.75; color: #444; margin-bottom: 16px; max-width: 700px; }
  .intro .note {
    background: #FFF8F0; border-left: 3px solid #FF671F;
    padding: 16px 20px; border-radius: 4px; margin-top: 24px;
    font-size: 14px; color: #555; line-height: 1.65;
  }
  .intro .url-box {
    background: #f6f8fb; border: 1px solid #e0e6f0; border-radius: 8px;
    padding: 20px 24px; margin: 24px 0; font-size: 14px;
  }
  .intro .url-box strong { display: block; font-size: 12px; text-transform: uppercase;
    letter-spacing: 0.1em; color: #888; margin-bottom: 8px; }
  .intro .url-box code { font-family: monospace; font-size: 15px; color: #001a3d; }

  /* Sections */
  .section { padding: 60px 90px; page-break-before: always; }
  .section-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
  .section-num {
    width: 36px; height: 36px; border-radius: 50%;
    background: #001a3d; color: #fff; font-size: 13px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .section h2 { font-size: 26px; font-weight: 700; color: #001a3d; }
  .section-desc { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 32px; max-width: 720px; }

  figure { margin: 0 0 32px 0; }
  figure img { width: 100%; border: 1px solid #e5e7eb; border-radius: 8px; display: block; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
  figcaption { font-size: 12px; color: #888; margin-top: 8px; text-align: center; font-style: italic; }

  /* Steps */
  .steps { margin: 24px 0 32px 0; }
  .step {
    display: flex; gap: 16px; margin-bottom: 16px; align-items: flex-start;
  }
  .step-num {
    min-width: 28px; height: 28px; border-radius: 50%; background: #FF671F20;
    color: #FF671F; font-size: 12px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;
  }
  .step-content { font-size: 14px; color: #444; line-height: 1.7; }
  .step-content strong { color: #1a1a2e; }

  /* Tips */
  .tip {
    background: #f0f7ff; border-left: 3px solid #003580;
    padding: 14px 18px; border-radius: 4px; margin: 20px 0;
    font-size: 13.5px; color: #333; line-height: 1.65;
  }
  .tip strong { color: #001a3d; }

  .field-table { width: 100%; border-collapse: collapse; margin: 20px 0 32px 0; font-size: 13.5px; }
  .field-table th { background: #001a3d; color: #fff; padding: 10px 14px; text-align: left; font-weight: 600; font-size: 12px; letter-spacing: 0.05em; }
  .field-table td { padding: 10px 14px; border-bottom: 1px solid #f0f0f0; color: #444; vertical-align: top; }
  .field-table tr:nth-child(even) td { background: #fafafa; }
  .required { color: #e53e3e; font-weight: 700; }
  .optional { color: #888; }
</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
  <div class="cover-eyebrow">Content Management Guide</div>
  <h1>India Israel Centre<br/>Admin Guide</h1>
  <p class="cover-subtitle">A complete reference for managing publications, people, convenings, and site content through the Payload CMS admin panel.</p>
  <div class="cover-meta">
    <div class="cover-meta-item"><strong>Platform</strong>Payload CMS 3 + Next.js</div>
    <div class="cover-meta-item"><strong>Audience</strong>IIC Editorial Team</div>
    <div class="cover-meta-item"><strong>Version</strong>May 2026</div>
  </div>
</div>

<!-- TABLE OF CONTENTS -->
<div class="toc">
  <h2>Contents</h2>
  <ol>
    <li>Introduction &amp; Accessing the Admin <span>Overview, login, navigation</span></li>
    <li>Publications <span>Papers, Briefs, Commentary</span></li>
    <li>People <span>Profiles, bios, roles</span></li>
    <li>Convenings <span>Events, roundtables, lectures</span></li>
    <li>Media Library <span>Images and PDFs</span></li>
    <li>Newsletter Subscribers <span>Viewing subscriber list</span></li>
    <li>Pillars <span>Managing research pillars</span></li>
    <li>Page Content Globals <span>Homepage, About, Forum, Research</span></li>
    <li>Tips &amp; Best Practices <span>Slugs, images, publishing workflow</span></li>
  </ol>
</div>

<!-- INTRO -->
<div class="intro">
  <h2>Introduction</h2>
  <p>The India Israel Centre website is powered by <strong>Payload CMS</strong>, a headless content management system. All site content — publications, people profiles, convenings, and static page copy — is managed through the admin panel.</p>
  <p>This guide walks through every section of the admin panel with screenshots. You do not need any technical knowledge to use it — if you can fill in a form, you can manage the site.</p>

  <div class="url-box">
    <strong>Admin URL</strong>
    <code>https://indiaisraelcentre.org/admin</code>
  </div>
  <div class="url-box">
    <strong>Local development URL</strong>
    <code>http://localhost:3000/admin</code>
  </div>

  <div class="note">
    <strong>Note:</strong> Always use the live URL (indiaisraelcentre.org/admin) for real content. The localhost URL is only for development and testing on your own machine.
  </div>
</div>

${section('01', 'Logging In', 'Navigate to the admin URL and enter your email and password. Each team member should have their own login — do not share credentials.', [
  { src: loginShot, caption: 'The Payload CMS login screen — enter your email and password to access the admin.' },
])}

${section('02', 'Dashboard & Navigation', `After logging in you land on the dashboard. The left sidebar lists every section of the admin:
<br/><br/>
<strong>Collections</strong> (dynamic content with multiple entries): Users, Media, Publications, People, Convenings, Newsletter Subscribers, Pillars.
<br/><br/>
<strong>Page Content / Globals</strong> (single-entry pages): Homepage, About, Forum, Research, Privacy, Terms, and more.`, [
  { src: dashShot, caption: 'The admin dashboard and navigation sidebar. Collections are top-left; page globals are below.' },
])}

${section('03', 'Publications', `Publications are the Centre\'s research output. There are three types: <strong>Papers</strong>, <strong>Briefs</strong>, and <strong>Commentary</strong>. Each publication appears on the relevant research page on the site.
<br/><br/>
Click <strong>Publications</strong> in the left sidebar to see all entries.`, [
  { src: pubListShot, caption: 'The Publications list — all papers, briefs, and commentaries in the database.' },
])}

<section class="section" style="page-break-before: avoid;">
  <div class="section-header"><span class="section-num" style="background:#FF671F">03</span><h2>Creating a Publication</h2></div>
  <p class="section-desc">Click <strong>Create New</strong> (top right) to add a publication. Fill in each field:</p>

  <table class="field-table">
    <tr><th>Field</th><th>Required?</th><th>Notes</th></tr>
    <tr><td><strong>Title</strong></td><td class="required">Required</td><td>Full title of the publication. Used in the page heading and browser tab.</td></tr>
    <tr><td><strong>Slug</strong></td><td class="required">Required</td><td>URL-friendly ID, e.g. <code>india-israel-water-tech</code>. Only lowercase letters, numbers, and hyphens. Must be unique.</td></tr>
    <tr><td><strong>Type</strong></td><td class="required">Required</td><td>Paper, Brief, or Commentary. Determines which listing page it appears on.</td></tr>
    <tr><td><strong>Pillar</strong></td><td class="required">Required</td><td>Select the research pillar this publication belongs to.</td></tr>
    <tr><td><strong>Authors</strong></td><td class="required">Required (min 1)</td><td>Add one or more authors. Each has a Name and optional Affiliation.</td></tr>
    <tr><td><strong>Published Date</strong></td><td class="required">Required</td><td>The publication date — appears on cards and the article page.</td></tr>
    <tr><td><strong>Abstract</strong></td><td class="optional">Optional</td><td>1–3 sentence summary shown on listing cards and previews.</td></tr>
    <tr><td><strong>Body</strong></td><td class="optional">Optional</td><td>Full article text with rich formatting (headings, bold, links, lists). Paste or type here.</td></tr>
    <tr><td><strong>PDF (Supporting files)</strong></td><td class="optional">Optional</td><td>Upload a PDF version. Expand the "Supporting files" section at the bottom.</td></tr>
    <tr><td><strong>DOI</strong></td><td class="optional">Optional</td><td>Digital Object Identifier string if available.</td></tr>
  </table>

  <div class="tip"><strong>Slug tip:</strong> Make it short and descriptive. The URL will be <code>/research/papers/your-slug/</code>. Once published and shared, avoid changing the slug.</div>
</section>

<section class="section" style="page-break-before: avoid;">
  <div class="section-header"><span class="section-num" style="background:#FF671F">03</span><h2>Publication Form — Screenshots</h2></div>
  <figure>
    <img src="${img(pubCreateShot)}" alt="Top of publication form" />
    <figcaption>Top of the Create Publication form — Title, Slug, Type, Pillar, Authors, Published Date.</figcaption>
  </figure>
  <figure>
    <img src="${img(pubCreateMidShot)}" alt="Publication body editor" />
    <figcaption>The Body rich-text editor — paste or type full article content. Toolbar supports headings, bold, italic, links, and lists.</figcaption>
  </figure>
  <figure>
    <img src="${img(pubCreateBotShot)}" alt="Publication supporting files" />
    <figcaption>The Supporting Files section (collapsed by default) — expand to upload a PDF or add a DOI.</figcaption>
  </figure>
</section>

${section('04', 'People', `The People collection manages researcher and team profiles that appear on the About → People page.
<br/><br/>
Each person has a name, role, short bio (rich text), and an optional photo.`, [
  { src: peopleListShot, caption: 'The People list — all profiles currently in the system.' },
  { src: peopleCreateShot, caption: 'Create a new person profile — fill in name, role, bio, and upload a photo.' },
])}

<section class="section" style="page-break-before: avoid;">
  <div class="section-header"><span class="section-num" style="background:#003580">04</span><h2>People Fields Reference</h2></div>
  <table class="field-table">
    <tr><th>Field</th><th>Required?</th><th>Notes</th></tr>
    <tr><td><strong>Name</strong></td><td class="required">Required</td><td>Full name as it should appear publicly.</td></tr>
    <tr><td><strong>Slug</strong></td><td class="required">Required</td><td>Used in the URL: <code>/about/people/slug/</code>. Lowercase, hyphens only.</td></tr>
    <tr><td><strong>Role / Title</strong></td><td class="optional">Optional</td><td>Their position, e.g. "Chair of the Forum" or "Research Fellow".</td></tr>
    <tr><td><strong>Affiliation</strong></td><td class="optional">Optional</td><td>Institutional affiliation, e.g. "O.P. Jindal Global University".</td></tr>
    <tr><td><strong>Bio</strong></td><td class="optional">Optional</td><td>Full biographical text in rich text. Shown on their profile page.</td></tr>
    <tr><td><strong>Photo</strong></td><td class="optional">Optional</td><td>Upload a portrait photo. JPEG or PNG, ideally square or portrait orientation.</td></tr>
  </table>
</section>

${section('05', 'Convenings', `Convenings are the Centre\'s events — roundtables, public lectures, and dialogues. They appear on the Forum page.
<br/><br/>
Upcoming convenings (future event dates) are shown prominently. Past convenings move to the archive.`, [
  { src: convListShot, caption: 'The Convenings list — all past and upcoming events.' },
  { src: convCreateShot, caption: 'Create a new convening — fill in title, date, format, description, and optional location.' },
])}

<section class="section" style="page-break-before: avoid;">
  <div class="section-header"><span class="section-num" style="background:#003580">05</span><h2>Convenings Fields Reference</h2></div>
  <table class="field-table">
    <tr><th>Field</th><th>Required?</th><th>Notes</th></tr>
    <tr><td><strong>Title</strong></td><td class="required">Required</td><td>Name of the event.</td></tr>
    <tr><td><strong>Slug</strong></td><td class="required">Required</td><td>URL: <code>/forum/slug/</code>. Lowercase, hyphens.</td></tr>
    <tr><td><strong>Format</strong></td><td class="optional">Optional</td><td>Roundtable, Public Lecture, or Dialogue.</td></tr>
    <tr><td><strong>Event Date</strong></td><td class="required">Required</td><td>Date of the event. Upcoming events (future dates) are highlighted on the forum page.</td></tr>
    <tr><td><strong>Location</strong></td><td class="optional">Optional</td><td>Physical venue or "Online".</td></tr>
    <tr><td><strong>Description</strong></td><td class="optional">Optional</td><td>Rich text description of the event, agenda, and participants.</td></tr>
    <tr><td><strong>Cover Image</strong></td><td class="optional">Optional</td><td>Upload an event photo or banner.</td></tr>
  </table>
  <div class="tip"><strong>Past vs upcoming:</strong> The site automatically shows convenings with a future Event Date as "upcoming" and past ones in the archive. Simply set the correct date — no toggle needed.</div>
</section>

${section('06', 'Media Library', `The Media collection is a central library for all uploaded files — images and PDFs. Files uploaded here can be reused across multiple publications and pages.
<br/><br/>
You can upload directly via a publication or person form, or come here first to upload and organise files.`, [
  { src: mediaListShot, caption: 'The Media library — all uploaded images and PDFs.' },
])}

<section class="section" style="page-break-before: avoid;">
  <div class="section-header"><span class="section-num" style="background:#003580">06</span><h2>Uploading Media</h2></div>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Click <strong>Media</strong> in the left sidebar.</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Click <strong>Create New</strong> in the top right.</div></div>
    <div class="step"><div class="step-num">3</div><div class="step-content">Drag and drop a file, or click the upload area to browse. Supported formats: JPEG, PNG, WebP, GIF, PDF.</div></div>
    <div class="step"><div class="step-num">4</div><div class="step-content">Add an <strong>Alt text</strong> for images — this is important for accessibility and SEO.</div></div>
    <div class="step"><div class="step-num">5</div><div class="step-content">Click <strong>Save</strong>. The file is now available to attach to any publication, person, or convening.</div></div>
  </div>
  <div class="tip"><strong>Image sizing:</strong> For publication covers and people photos, use images at least 800px wide. For PDFs, any size is fine.</div>
</section>

${section('07', 'Newsletter Subscribers', `This collection stores everyone who has signed up for the Centre\'s newsletter via the website footer or homepage form.
<br/><br/>
This is a <strong>read-only</strong> list for admin reference. Subscribers are added automatically when someone signs up on the site.`, [
  { src: newsletterShot, caption: 'The Newsletter Subscribers list — name, email, and sign-up date for each subscriber.' },
])}

${section('08', 'Pillars', `The Pillars collection defines the six research pillars of the Centre. These appear in the research navigation and on publication cards.
<br/><br/>
The six pillars are pre-configured. Only edit them if the Centre formally redefines its research areas.`, [
  { src: pillarsShot, caption: 'The Pillars list — the six research themes of the India Israel Centre.' },
])}

${section('09', 'Page Content — Globals', `Globals are single-entry records that control the copy on specific pages. Unlike collections (which have many entries), each global has exactly one version.
<br/><br/>
Use globals to update page headings, introductory text, and featured descriptions without a developer.`, [
  { src: homeGlobalShot, caption: 'The Homepage global — edit the hero heading, subtitle, framing text, and newsletter section.' },
  { src: aboutGlobalShot, caption: 'The About global — manage the about page heading and description.' },
  { src: forumGlobalShot, caption: 'The Forum global — control the Forum landing page heading and intro text.' },
])}

<section class="section" style="page-break-before: avoid;">
  <div class="section-header"><span class="section-num" style="background:#001a3d">09</span><h2>Available Page Globals</h2></div>
  <table class="field-table">
    <tr><th>Global</th><th>What it controls</th></tr>
    <tr><td><strong>Homepage</strong></td><td>Hero heading, subtitle, framing text, newsletter heading &amp; description.</td></tr>
    <tr><td><strong>About — Landing</strong></td><td>Heading and intro on the /about page.</td></tr>
    <tr><td><strong>About — Strategic Objective</strong></td><td>Text on the /about/strategic-objective page.</td></tr>
    <tr><td><strong>About — Areas of Engagement</strong></td><td>The five engagement areas and their descriptions.</td></tr>
    <tr><td><strong>About — Academic Partners</strong></td><td>Partnership description and partner details.</td></tr>
    <tr><td><strong>About — Governance</strong></td><td>Governance structure text.</td></tr>
    <tr><td><strong>About — Contact</strong></td><td>Contact page heading and address.</td></tr>
    <tr><td><strong>Forum — Landing</strong></td><td>Forum page hero text.</td></tr>
    <tr><td><strong>Forum — Archive</strong></td><td>Archive page intro.</td></tr>
    <tr><td><strong>Research — Landing</strong></td><td>Research overview page text.</td></tr>
    <tr><td><strong>Research — Papers / Briefs / Commentary</strong></td><td>Listing page headings and descriptions per type.</td></tr>
    <tr><td><strong>Privacy Policy / Terms of Use</strong></td><td>Full legal text for those pages.</td></tr>
  </table>
</section>

<section class="section">
  <div class="section-header"><span class="section-num" style="background:#FF671F">10</span><h2>Tips &amp; Best Practices</h2></div>
  <p class="section-desc">Follow these guidelines to keep content consistent and the site running smoothly.</p>

  <h3 style="font-size:16px; font-weight:600; color:#001a3d; margin:24px 0 12px;">Slugs</h3>
  <div class="tip">
    <strong>Keep slugs short and permanent.</strong> The slug becomes the URL. Once a publication is live and shared or indexed by Google, changing the slug breaks that link. Choose carefully before publishing.
    <br/><br/>
    Good: <code>bene-israel-diaspora-identity</code><br/>
    Avoid: <code>publication-1</code> or <code>draft-testing-123</code>
  </div>

  <h3 style="font-size:16px; font-weight:600; color:#001a3d; margin:24px 0 12px;">Publication Body — Rich Text</h3>
  <div class="tip">
    <strong>Pasting from Word or Google Docs:</strong> Use <em>Paste as plain text</em> (Ctrl+Shift+V / Cmd+Shift+V) to avoid carrying over invisible formatting. Then apply headings and bold within the editor.
    <br/><br/>
    Use the toolbar to add <strong>Heading 2</strong> and <strong>Heading 3</strong> for section titles, <strong>Bold</strong> for key terms, and the link icon for hyperlinks.
  </div>

  <h3 style="font-size:16px; font-weight:600; color:#001a3d; margin:24px 0 12px;">Images</h3>
  <div class="tip">
    <strong>Image formats:</strong> JPEG for photos, PNG for logos with transparency, WebP for optimised web images.
    <br/><br/>
    <strong>Alt text:</strong> Always fill in the alt text when uploading to the Media library. It describes the image for screen readers and search engines. Example: <em>"Professor Khinvraj Jangid at the India-Israel conference, 2024"</em>.
  </div>

  <h3 style="font-size:16px; font-weight:600; color:#001a3d; margin:24px 0 12px;">Saving</h3>
  <div class="tip">
    <strong>Always click Save.</strong> The admin does not auto-save. Changes are lost if you navigate away without saving. The Save button is at the top right of every form.
  </div>

  <h3 style="font-size:16px; font-weight:600; color:#001a3d; margin:24px 0 12px;">Publishing Workflow</h3>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content"><strong>Draft</strong> — Create the entry and fill in all fields. Save frequently.</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content"><strong>Review</strong> — Share the admin link with a colleague for a proof-read (they need an admin account).</div></div>
    <div class="step"><div class="step-num">3</div><div class="step-content"><strong>Publish</strong> — Once approved, save the final version. The entry goes live immediately on the public site.</div></div>
    <div class="step"><div class="step-num">4</div><div class="step-content"><strong>Announce</strong> — Share the published URL on the Centre's social channels.</div></div>
  </div>

  <h3 style="font-size:16px; font-weight:600; color:#001a3d; margin:32px 0 12px;">Getting Help</h3>
  <p style="font-size:14px; color:#555; line-height:1.75; max-width:660px;">
    If you encounter an issue with the admin panel or content is not displaying correctly on the site, contact the technical team at
    <a href="mailto:research@indiaisraelcentre.org" style="color:#001a3d; font-weight:600;">research@indiaisraelcentre.org</a>.
    Include a screenshot and a description of what you were trying to do.
  </p>
</section>

</body>
</html>`

const htmlPath = path.join(OUT_DIR, 'guide.html')
fs.writeFileSync(htmlPath, html)
console.log('📄 HTML built.')

// ── Render to PDF ────────────────────────────────────────────────────────────
console.log('🖨  Rendering PDF...')
const pdfBrowser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const pdfPage = await pdfBrowser.newPage()
await pdfPage.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 3000))
await pdfPage.pdf({
  path: PDF_OUT,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
})
await pdfBrowser.close()
console.log(`\n✅ Done! PDF saved to:\n   ${PDF_OUT}\n`)
