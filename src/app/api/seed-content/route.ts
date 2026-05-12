import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Seed route disabled in production' }, { status: 403 })
  }

  const payload = await getPayload({ config })
  const results: string[] = []

  // ─── HOME ─────────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'home' as any,
    data: {
      missionHeading: 'A think tank built for the long argument.',
      missionBody: 'We exist because the India–Israel relationship is consequential enough to deserve serious intellectual attention. The Centre produces research that meets academic standards while remaining usable to policy professionals, and convenes the people who actually move the relationship.',
      missionCards: [
        { title: 'Research', body: 'Papers, briefs, and commentary across six thematic pillars that map the full scope of the relationship.' },
        { title: 'Convenings', body: 'Closed dialogues, roundtables, and public lectures — formats chosen to fit the question, not the calendar.' },
        { title: 'Network', body: 'In-house staff, fellows, and affiliated researchers across Indian and Israeli universities and think tanks.' },
      ],
      pillarsHeading: 'The full breadth of the relationship, organised.',
      pillarsBody: 'Each pillar is a coherent research programme — not a tag. Together they map the relationship across identity, governance, security, technology, development, and culture.',
      pullQuote: 'We bring people together around questions, not agendas. The output is the quality of understanding participants carry away — and occasionally, a written record of the ground that was covered.',
      pullQuoteAttribution: 'Professor Khinvraj Jangid',
      pullQuoteRole: 'Chair, IIC Forum',
      newsletterHeading: "Get the Centre's work, in your inbox.",
      newsletterDescription: 'One monthly note from the editors: new publications, upcoming convenings, and a brief read from the chair. No filler. Unsubscribe any time.',
      newsletterPrivacyNote: 'We confirm subscriptions by email. Your address is never shared.',
      partners: [
        { name: 'O.P. Jindal Global University' },
        { name: 'Hebrew University of Jerusalem' },
        { name: 'Tel Aviv University' },
        { name: 'Observer Research Foundation' },
        { name: 'Institute for National Security Studies' },
        { name: 'Carnegie India' },
        { name: 'Brookings India' },
        { name: 'IDSA' },
      ],
      marqueeItems: [
        { text: 'Six research pillars' },
        { text: 'Twelve convenings a year' },
        { text: 'Independent. Editorially.' },
        { text: 'Papers · Briefs · Commentary' },
        { text: 'New Delhi · Jerusalem · Tel Aviv' },
      ],
    } as any,
  })
  results.push('Seeded: home')

  // ─── ABOUT ────────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about' as any,
    data: {
      missionHeading: 'Knowledge, not advocacy.',
      missionParagraph1: 'The Centre produces research — papers, policy briefs, and commentary — that meets academic standards while remaining accessible to policy professionals, journalists, and engaged citizens. We convene practitioners, scholars, and policymakers in environments that enable candid analytical exchange.',
      missionParagraph2: "We are editorially independent. Our research represents the views of its authors. The Centre's institutional position is to build the knowledge base for serious engagement with the relationship — not to advocate for any particular policy outcome.",
      chairSummary: "One of India's foremost scholars of the India-Israel relationship. Has published extensively on its political history, the Jewish communities of India, and the intersection of South Asian and Israeli political thought. Chairs the Forum, setting its intellectual programme and presiding over its convenings.",
      whatWeDoHeading: 'Four programmes, one purpose.',
      whatWeDo: [
        { title: 'Research', body: 'Papers, Briefs, and Commentary across six thematic pillars, authored by in-house staff, fellows, and affiliated researchers from Indian and Israeli institutions.' },
        { title: 'Convenings', body: 'The Forum brings practitioners, scholars, and policymakers together in closed dialogues, roundtables, and public lectures. Format follows the question.' },
        { title: 'Network', body: 'A research community of staff, fellows — senior, visiting, non-resident — and affiliates across both countries and a range of disciplines.' },
        { title: 'Engagement', body: 'We engage journalists, parliamentary staff, diplomats, and business leaders who need reliable analysis of the relationship.' },
      ],
      governanceNote: "The Centre is governed by a board of directors. Editorial independence is a constitutional feature of the structure, not a managerial policy.",
    } as any,
  })
  results.push('Seeded: about')

  // ─── ABOUT GOVERNANCE ────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-governance' as any,
    data: {
      paragraph1: "The India Israel Centre is governed by a board of directors constituted under its registered entity. The board is responsible for the Centre's institutional direction, financial oversight, and the appointment of executive leadership. It meets formally twice a year and operates through a governance charter that sets out the separation between board authority and editorial authority.",
      paragraph2: "Editorial independence is a constitutional feature of the Centre's structure, not a managerial policy. The board does not commission, review, approve, or withdraw research publications. The editorial programme is the responsibility of the publication editor and commissioning editor, who report to the executive director on operational matters but to no one on editorial matters.",
      paragraph3: "The board is composed of individuals with professional backgrounds in research, law, business, and public service. No board member holds a position in any government that has an interest in the India-Israel relationship as a matter of official policy.",
    } as any,
  })
  results.push('Seeded: about-governance')

  // ─── ABOUT CONTACT ───────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-contact' as any,
    data: {
      intro: 'Please use the route that fits your purpose. Misdirected messages are forwarded internally but may be slower.',
      routes: [
        { title: 'Editorial inquiries', description: 'Proposals for publications, questions about research, corrections, and general editorial correspondence.' },
        { title: 'Media inquiries', description: 'Press contacts, background briefings, and requests for comment from journalists and media organisations.' },
        { title: 'Partner with us', description: 'Institutional partnership inquiries from research centres, universities, and foundations.' },
      ],
    } as any,
  })
  results.push('Seeded: about-contact')

  // ─── ABOUT CONTACT EDITORIAL ─────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-contact-editorial' as any,
    data: {
      intro: 'You may also write directly to',
      responseNote: 'We aim to respond within five working days.',
    } as any,
  })
  results.push('Seeded: about-contact-editorial')

  // ─── ABOUT CONTACT MEDIA ─────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-contact-media' as any,
    data: {
      intro: 'Write to',
      pressNote: 'Press materials and media resources will be added in due course.',
    } as any,
  })
  results.push('Seeded: about-contact-media')

  // ─── ABOUT PARTNER WITH US ───────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-partner-with-us' as any,
    data: {
      paragraph1: 'The Centre considers institutional partnerships with bodies that work on overlapping questions or complementary geographies.',
      paragraph2: 'We do not run a formal partnership programme. Each partnership is considered individually on the basis of intellectual fit, institutional independence, and the specific collaboration proposed. Arrangements may include joint convenings, co-authored research, visiting fellowships, or shared editorial projects.',
      paragraph3: 'Please use the form below to introduce your institution. We respond within ten working days.',
    } as any,
  })
  results.push('Seeded: about-partner-with-us')

  // ─── ABOUT WORK WITH US ──────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-work-with-us' as any,
    data: {
      openPositionsNote: 'No open positions at this time.',
      intro: 'We welcome speculative inquiries from researchers working in our pillar areas — please use the form below.',
      fellowshipsHeading: 'Three modes of affiliation.',
      fellowships: [
        { title: 'Senior Fellow', body: 'Established researchers with a significant publication record in one or more pillar areas. Expected to produce at least two publications per year and contribute to the Forum. Residential or non-residential.' },
        { title: 'Visiting Fellow', body: 'Three to twelve months in residence at the Centre, working on a specific research project that results in at least one publication. Open to doctoral candidates in the final stages and to established researchers on sabbatical.' },
        { title: 'Non-Resident Fellow', body: 'Based at the home institution and contributing to the Centre on a defined basis — typically one publication per year and participation in one or two Forum convenings.' },
      ],
      affiliationIntro: 'Introduce yourself and describe the research you would bring to the Centre.',
    } as any,
  })
  results.push('Seeded: about-work-with-us')

  // ─── FORUM ───────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'forum' as any,
    data: {
      chairBlockquote: 'The India-Israel relationship is consequential enough to deserve sustained, serious intellectual attention.',
      chairParagraph1: 'We convene people who have worked on the relationship — diplomats, defence professionals, scientists, scholars, business leaders — from India, from Israel, and from third countries where the relationship plays out. We bring them together around questions, not agendas.',
      chairParagraph2: 'The output is not a communiqué. It is the quality of understanding participants carry away, and occasionally a written record — a summary or a brief — of the ground that was covered.',
      chairParagraph3: 'The strongest proposals for the Forum come from people with a specific analytical puzzle, not a general interest in the subject.',
      chairSignature: '— Professor Khinvraj Jangid, Chair of the Forum',
      chairBio: 'Professor and Director, Jindal Centre for Israel Studies, O.P. Jindal Global University. Specialist in India-Israel relations, Jewish studies, and South Asian intellectual history.',
    } as any,
  })
  results.push('Seeded: forum')

  // ─── FORUM ARCHIVE ───────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'forum-archive' as any,
    data: {
      description: 'A record of every gathering the Forum has held — closed dialogues, roundtables, and public lectures.',
    } as any,
  })
  results.push('Seeded: forum-archive')

  // ─── RESEARCH ────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'research' as any,
    data: {
      formatCards: [
        { label: 'Papers', body: 'Extended analytical scholarship. Peer-reviewable arguments built from primary sources.' },
        { label: 'Briefs', body: 'Policy-oriented synthesis for working professionals. Short, sourced, decisive.' },
        { label: 'Commentary', body: 'Timely essays and analytical reactions to current questions on the relationship.' },
      ],
    } as any,
  })
  results.push('Seeded: research')

  // ─── RESEARCH PAPERS ─────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'research-papers' as any,
    data: {
      description: "Papers are the Centre's extended analytical publications — typically 5,000 to 12,000 words. They make an original scholarly contribution and are citable as research publications.",
      typicalLength: '5–12k',
      perYear: '8+',
    } as any,
  })
  results.push('Seeded: research-papers')

  // ─── RESEARCH BRIEFS ─────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'research-briefs' as any,
    data: {
      description: "Briefs are the Centre's policy-oriented publications — typically 2,000 to 4,000 words. They synthesise evidence and offer clear analytical conclusions.",
      typicalLength: '2–4k',
      perYear: '12+',
    } as any,
  })
  results.push('Seeded: research-briefs')

  // ─── RESEARCH COMMENTARY ─────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'research-commentary' as any,
    data: {
      description: "Commentary is the Centre's analytical essay format — typically 800 to 2,500 words, written on a current question or event.",
      typicalLength: '0.8–2.5k',
      perYear: '24+',
    } as any,
  })
  results.push('Seeded: research-commentary')

  // ─── PRIVACY ─────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'privacy' as any,
    data: {
      lastReviewed: '2026-05-01',
      sections: [
        { heading: 'Who we are', body: 'This website is operated by the India Israel Centre, a registered entity based in New Delhi, India. References to "we", "us", and "our" in this policy refer to the India Israel Centre.' },
        { heading: 'What data we collect and why', body: 'We collect the minimum personal data necessary for the operation of this website. Newsletter subscriptions: when you subscribe, we collect your email address. We use this to send publications and Forum announcements. We do not share it with any third party. Contact form submissions: when you use a contact form, we collect the information you provide (name, email, message) solely to respond to your inquiry. Analytics: we use self-hosted analytics (PostHog) to understand how the site is used. Analytics data is anonymised; we do not track individual users or use cookies for analytics.' },
        { heading: 'Legal basis for processing (Indian law)', body: 'We process personal data in accordance with the Digital Personal Data Protection Act 2023 (India). Our legal basis for processing newsletter subscriber data is consent, which you provide by subscribing. Our legal basis for processing contact form data is legitimate interest in responding to inquiries.' },
        { heading: 'How long we keep your data', body: 'Newsletter subscriber data is retained until you unsubscribe. Contact form data is retained for twelve months following the closure of the relevant correspondence.' },
        { heading: 'Your rights', body: 'Under the DPDP Act 2023, you have the right to access, correct, and erase personal data we hold about you, and to withdraw consent at any time. To exercise these rights, write to editorial@indiaisraelcentre.org.' },
        { heading: 'Cookies', body: 'This site uses no tracking cookies. A session cookie is set if you log in to the editorial CMS, but this is not accessible to visitors of the public-facing site.' },
        { heading: 'Changes to this policy', body: 'We may update this policy from time to time. The date of the most recent review is shown at the top of the page.' },
      ],
    } as any,
  })
  results.push('Seeded: privacy')

  // ─── TERMS ───────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'terms' as any,
    data: {
      lastReviewed: '2026-05-01',
      sections: [
        { heading: 'Acceptance', body: 'By accessing this website you agree to these terms. If you do not agree, please do not use the site.' },
        { heading: 'Intellectual property', body: 'All content published on this site — Papers, Briefs, Commentary, and descriptive text — is the property of the India Israel Centre or the individual authors as specified. Content may be cited, quoted (with attribution), and linked to freely. Reproduction in full requires written permission from the Centre. PDF downloads of Papers and Briefs are provided for personal, non-commercial research and reference use. They may not be redistributed or made available on other platforms without permission.' },
        { heading: 'No advice', body: "Nothing published on this site constitutes legal, financial, or policy advice. The Centre's publications represent the views of their authors and do not constitute the official position of the Indian or Israeli governments, or of any other institution." },
        { heading: 'External links', body: 'This site links to external publications and resources. The Centre is not responsible for the content of external sites. Links represent editorial recognition of the linked work; they do not constitute endorsement of the linked site as a whole.' },
        { heading: 'Availability', body: 'We aim to keep this site available at all times but make no warranty of continuous availability. Scheduled maintenance and unforeseen circumstances may cause temporary downtime.' },
        { heading: 'Governing law', body: 'These terms are governed by the laws of India. Disputes arising from the use of this site are subject to the exclusive jurisdiction of the courts of New Delhi.' },
      ],
    } as any,
  })
  results.push('Seeded: terms')

  // ─── NOT FOUND ───────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'not-found' as any,
    data: {
      heading: 'This page does not exist or has moved.',
      description: 'If you followed a link from an external source, the URL may have changed. All published content remains accessible — please browse from the sections below.',
    } as any,
  })
  results.push('Seeded: not-found')

  // ─── PILLARS COLLECTION ───────────────────────────────────────────────────
  const PILLAR_SEEDS = [
    {
      code: 'identity',
      label: 'Identity, Heritage and Society',
      framing: 'The India-Israel relationship has always carried a civilisational undertone that sits alongside its strategic logic. Both nations understand themselves as ancient peoples reconstituted as modern states — a self-understanding that generates both solidarity and a distinctive vocabulary for the bilateral. This pillar examines how shared historical memory, religious heritage, and questions of national identity shape the relationship.',
    },
    {
      code: 'governance',
      label: 'Governance and Public Policy',
      framing: 'India and Israel are parliamentary democracies that have sustained competitive elections under conditions of external threat and internal diversity. This pillar examines what each country can learn from the other in democratic governance, public administration, judicial independence, and the management of security and civil liberties.',
    },
    {
      code: 'security',
      label: 'Security and Strategy',
      framing: 'Defence and security cooperation is the most extensively documented dimension of the India-Israel relationship. This pillar examines the architecture of defence cooperation, the political constraints on both sides, and the broader strategic alignment between two countries that are neighbours of neither each other nor of any shared adversary.',
    },
    {
      code: 'technology',
      label: 'Technology and Innovation',
      framing: "Israel's innovation ecosystem has produced per-capita patent rates and unicorn density that India's policy establishment has studied carefully. This pillar examines the bilateral technology relationship across its principal domains: agricultural technology and water management, cyber and information security, defence technology, and the emerging life-sciences and climate-technology corridors.",
    },
    {
      code: 'development',
      label: 'Development and Economic Cooperation',
      framing: 'India and Israel have signed a series of trade and investment agreements, but the bilateral economic relationship remains underdeveloped relative to the strategic relationship. This pillar examines the economic relationship in its full scope — trade, investment, tourism, development cooperation in third countries.',
    },
    {
      code: 'culture',
      label: 'Culture and Soft Power',
      framing: 'Culture and soft power occupy an underanalysed corner of the India-Israel relationship. This pillar examines the cultural dimensions of the bilateral relationship: diaspora communities, artistic exchange, educational links, tourism, and the ways in which culture shapes public attitudes toward the other country.',
    },
  ]

  for (const pillar of PILLAR_SEEDS) {
    const existing = await payload.find({
      collection: 'pillars' as any,
      where: { code: { equals: pillar.code } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'pillars' as any, data: pillar as any })
      results.push(`Created pillar: ${pillar.code}`)
    } else {
      results.push(`Skipped pillar: ${pillar.code} (exists)`)
    }
  }

  return NextResponse.json({ ok: true, results })
}
