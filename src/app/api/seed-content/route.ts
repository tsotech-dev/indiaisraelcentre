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
      eyebrow: 'An Independent Policy Research Forum',
      title: 'India Israel Centre',
      subtitle: 'Advancing Scholarship and Policy on India-Israel Relations',
      openingFraming:
        'The India Israel Centre is an independent forum dedicated to rigorous academic inquiry, substantive policy engagement, and the informed public dissemination of knowledge concerning the bilateral relationship between India and Israel.',
      newsletterHeading: 'Subscribe',
      newsletterDescription: "Monthly updates on the Centre's publications and convenings.",
      newsletterPrivacyNote: 'We confirm subscriptions by email. Your address is never shared.',
    } as any,
  })
  results.push('Seeded: home')

  // ─── ABOUT ────────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about' as any,
    data: {
      eyebrow: 'An Independent Policy Research Forum',
      title: 'India Israel Centre',
      subtitle: 'Advancing Scholarship and Policy on India-Israel Relations',
      openingFraming:
        'The India Israel Centre is an independent forum dedicated to rigorous academic inquiry, substantive policy engagement, and the informed public dissemination of knowledge concerning the bilateral relationship between India and Israel. Drawing on shared civilisational heritage, democratic values, and complementary strategic interests, the Centre provides a structured space for sustained intellectual exchange between the two nations.',
      aboutBodyParagraphs: [
        {
          body: 'The India Israel Centre was established to address a significant lacuna in the institutional architecture of India-Israel relations: the absence of a dedicated, research-driven platform capable of sustaining long-term intellectual and policy engagement between the two countries.',
        },
        {
          body: 'The Centre operates at the intersection of academic scholarship, strategic affairs, and public communication. Its mandate encompasses the production and dissemination of authoritative research, the convening of expert forums, and the cultivation of a broad network of scholars, practitioners, and opinion-formers engaged with the bilateral relationship.',
        },
        {
          body: 'Guided by a commitment to intellectual rigour and analytical independence, the Centre seeks to produce scholarship and policy analysis that informs decision-makers, enriches public debate, and contributes to a durable, evidence-based understanding of India-Israel ties.',
        },
      ],
      chairSummary:
        "Professor Khinvraj Jangid, Professor and Director of the Centre for Israel Studies at O.P. Jindal Global University, chairs the Forum at the India Israel Centre. His comparative scholarship on India and Israel as post-colonial democracies anchors the Centre's intellectual programme.",
    } as any,
  })
  results.push('Seeded: about')

  // ─── ABOUT STRATEGIC OBJECTIVE ───────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-strategic-objective' as any,
    data: {
      paragraph1:
        "To consolidate and advance the India-Israel bilateral relationship through sustained academic inquiry, evidence-based policy engagement, and informed public discourse, establishing the partnership as a strategically consequential, institutionally grounded, and enduring pillar of India's foreign policy architecture in a rapidly evolving international order.",
      paragraph2:
        "The Centre pursues this objective through its research programme, its convening work under the Forum, and its public-dissemination work across the six thematic pillars that organise the Centre's intellectual life.",
    } as any,
  })
  results.push('Seeded: about-strategic-objective')

  // ─── ABOUT AREAS OF ENGAGEMENT ───────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-areas-of-engagement' as any,
    data: {
      intro: "The Centre's work runs across five areas, which overlap in practice.",
      areas: [
        {
          label: 'Academic Dialogue',
          body: 'Sustained exchange between scholars of India and Israel, hosted under the Forum and conducted in a register suited to research rather than to public communication. Convenings under this heading are typically closed-door and produce written outputs.',
        },
        {
          label: 'Policy Conversations',
          body: 'Structured engagement between policy professionals, practitioners and researchers on questions where research and practice meet productively. The format is more deliberative than a public lecture and produces briefs or background papers intended to inform decision-makers.',
        },
        {
          label: 'Public Dissemination',
          body: "Publication and circulation of authoritative scholarship to journalists, policy audiences and informed citizens. The Centre's website hosts every publication and convening record in formats designed for citation, retrieval and re-use, including machine-readable forms suited to academic citation managers.",
        },
        {
          label: 'Research and Analysis',
          body: 'Long papers, policy briefs and commentary commissioned by the Centre, organised across the six thematic pillars and authored by researchers with subject-matter standing.',
          href: '/research/',
        },
        {
          label: 'Events and Roundtables',
          body: "The Forum's convening programme, including closed-door roundtables, dialogues and public lectures.",
          href: '/forum/',
        },
      ],
    } as any,
  })
  results.push('Seeded: about-areas-of-engagement')

  // ─── ABOUT ACADEMIC PARTNERS ─────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-academic-partners' as any,
    data: {
      partnerName: 'Centre for Israel Studies, O.P. Jindal Global University',
      paragraph1:
        'The India Israel Centre is established in academic partnership with the Centre for Israel Studies at O.P. Jindal Global University in Sonipat, Haryana. The Director of the Centre for Israel Studies, Professor Khinvraj Jangid, chairs the Forum at the India Israel Centre.',
      paragraph2:
        "The Centre for Israel Studies is one of the few research and teaching centres on Israel and on India-Israel comparative scholarship at any Indian university. The partnership joins the India Israel Centre's policy-engagement and convening work with the Centre for Israel Studies' research and teaching programme on Israel and on comparative studies.",
      addressLine1: 'Centre for Israel Studies',
      addressLine2: 'O.P. Jindal Global University',
      addressLine3: 'Sonipat, Haryana, India',
    } as any,
  })
  results.push('Seeded: about-academic-partners')

  // ─── ABOUT GOVERNANCE (kept for route compatibility) ─────────────────────
  await payload.updateGlobal({
    slug: 'about-governance' as any,
    data: {
      paragraph1:
        "The India Israel Centre is governed by a board of directors constituted under its registered entity. The board is responsible for the Centre's institutional direction, financial oversight, and the appointment of executive leadership.",
      paragraph2:
        "Editorial independence is a constitutional feature of the Centre's structure, not a managerial policy. The board does not commission, review, approve, or withdraw research publications.",
      paragraph3:
        'The board is composed of individuals with professional backgrounds in research, law, business, and public service.',
    } as any,
  })
  results.push('Seeded: about-governance')

  // ─── ABOUT CONTACT ───────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-contact' as any,
    data: {
      intro:
        'The Centre maintains a small number of contact routes appropriate to the form of engagement.',
      routes: [
        { title: 'Editorial inquiries', description: 'For commissioning, submissions and editorial correspondence.' },
        { title: 'Media inquiries', description: 'For journalists.' },
        { title: 'Partner with us', description: 'For institutional partnership inquiries.' },
      ],
    } as any,
  })
  results.push('Seeded: about-contact')

  // ─── ABOUT CONTACT EDITORIAL ─────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-contact-editorial' as any,
    data: {
      intro:
        "Researchers proposing a paper, brief or commentary piece are invited to write with a short description of the proposed work, an indication of which pillar the work sits within, and a brief note on the author's relevant background.",
      responseNote: 'We aim to respond within five working days.',
    } as any,
  })
  results.push('Seeded: about-contact-editorial')

  // ─── ABOUT CONTACT MEDIA ─────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-contact-media' as any,
    data: {
      intro:
        "For journalists seeking comment from Centre affiliates or background on the Centre's work.",
      pressNote: 'Press materials and media resources will be added in due course.',
    } as any,
  })
  results.push('Seeded: about-contact-media')

  // ─── ABOUT PARTNER WITH US ───────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-partner-with-us' as any,
    data: {
      paragraph1:
        'The Centre considers institutional partnerships individually and welcomes inquiries from research institutions, universities, foundations and other bodies whose work intersects with its pillars.',
      paragraph2:
        "Partnership is agreed only where the work of the partnering institution and the work of the Centre complement one another, and where the operational terms preserve both institutions' editorial independence.",
      paragraph3: 'Please write with a short introduction to your institution and the collaboration you have in mind.',
    } as any,
  })
  results.push('Seeded: about-partner-with-us')

  // ─── ABOUT WORK WITH US ──────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about-work-with-us' as any,
    data: {
      openPositionsNote:
        "No open positions at this time. Speculative inquiries from researchers working in the Centre's pillar areas are welcome.",
      intro:
        'The Centre offers three categories of fellowship and an affiliation route for researchers whose work fits within its pillars.',
      fellowshipsHeading: 'Fellowships and affiliation',
      fellowships: [
        {
          title: 'Senior Fellows',
          body: "Lead the Centre's intellectual programme within a pillar. By invitation.",
        },
        {
          title: 'Visiting Fellows',
          body: 'Join the Centre for a defined period to pursue a specific research project. Applications reviewed twice a year.',
        },
        {
          title: 'Non-resident Fellows',
          body: "Contribute regularly to the Centre's research and convening work without a residential position. By invitation.",
        },
        {
          title: 'Affiliated Researchers',
          body: 'By invitation, following application or recommendation from existing affiliates.',
        },
      ],
      affiliationIntro: 'Introduce yourself and describe the research you would bring to the Centre.',
    } as any,
  })
  results.push('Seeded: about-work-with-us')

  // ─── FORUM ───────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'forum' as any,
    data: {
      chairParagraph1:
        'The Forum at the India Israel Centre brings sustained intellectual attention to the questions that the comparative study of India and Israel rewards. Two states emerged from empire within a year of each other, each carrying old civilisational traditions into modern constitutional democracies, and each has spent its first three quarters of a century working out the relationship between inherited tradition and the practical demands of national politics.',
      chairParagraph2:
        "The Forum's programme proceeds from a conviction that this comparison has been under-attempted, that it is sharper when conducted carefully than when conducted by analogy, and that the Indian and Israeli intellectual communities have much to learn from each other.",
      chairParagraph3:
        'The Forum hosts convenings in the formats appropriate to the work. Closed-door roundtables under the Chatham House rule allow scholars and practitioners to speak frankly on questions where public attribution would constrain the conversation. Public lectures and dialogues bring the Forum\'s intellectual programme into wider circulation.',
      chairSignature: '— Professor Khinvraj Jangid, Chair of the Forum',
    } as any,
  })
  results.push('Seeded: forum')

  // ─── FORUM ARCHIVE ───────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'forum-archive' as any,
    data: {
      description:
        "The full record of the Forum's convening programme. Each entry carries date, location (or \"By invitation, location not disclosed\" for closed events), participants where attribution is permitted, and a written summary where one exists.",
    } as any,
  })
  results.push('Seeded: forum-archive')

  // ─── RESEARCH ────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'research' as any,
    data: {
      formatCards: [
        { label: 'Papers', body: 'Long-form research.' },
        { label: 'Briefs', body: 'Policy and issue briefs.' },
        { label: 'Commentary', body: 'Analytical commentary.' },
      ],
    } as any,
  })
  results.push('Seeded: research')

  // ─── RESEARCH PAPERS ─────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'research-papers' as any,
    data: {
      description:
        'Long-form research from the Centre. Each Paper carries an abstract, downloadable PDF, citation blocks in major academic formats, and structured metadata supporting indexing by Google Scholar and major citation managers.',
    } as any,
  })
  results.push('Seeded: research-papers')

  // ─── RESEARCH BRIEFS ─────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'research-briefs' as any,
    data: {
      description: 'Policy and issue briefs, written for working professionals.',
    } as any,
  })
  results.push('Seeded: research-briefs')

  // ─── RESEARCH COMMENTARY ─────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'research-commentary' as any,
    data: {
      description:
        "Short-form analytical writing from the Centre's affiliates. Each piece carries a named byline and reflects the author's view.",
    } as any,
  })
  results.push('Seeded: research-commentary')

  // ─── PRIVACY ─────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'privacy' as any,
    data: {
      lastReviewed: '2026-05-11',
      sections: [
        {
          heading: 'What personal data the Centre processes',
          body: "Newsletter subscriptions. Email addresses provided on subscription, together with the date and (if recorded) the page from which the subscription was made.\n\nContact form submissions. Information provided through the site's contact forms, including name, email address, affiliation if entered, subject and message content.\n\nEditorial communications. Correspondence with the Centre's editorial team and any personal data shared in that correspondence.\n\nAuthor and affiliate records. Where a person is published by or affiliated with the Centre, professional information including name, affiliation, biographical details, publication record and contact details, as required to operate the affiliation.\n\nAnalytics data. Page views, navigation events, form submissions and PDF downloads, recorded anonymously through a self-hosted analytics platform. No user identifiers, no session replay, no cross-session tracking.",
        },
        {
          heading: 'Lawful bases',
          body: 'Consent, for newsletter subscriptions and contact form submissions. Legitimate interest, for editorial and publication functions and the operation of the website. Legal obligation, where applicable.',
        },
        {
          heading: 'Retention',
          body: 'Newsletter subscriptions retained until the subscriber unsubscribes or requests deletion. Contact form submissions retained for as long as the editorial conversation requires, not exceeding three years from last correspondence. Author and affiliate records retained for the duration of the affiliation and a reasonable period afterwards for historical and citation purposes.',
        },
        {
          heading: 'Sharing',
          body: 'The Centre does not sell personal data. The Centre shares personal data with third parties only as required to operate its newsletter platform and (where applicable) its other operational services. No personal data is shared for advertising or marketing.',
        },
        {
          heading: 'Rights',
          body: 'Persons whose personal data is processed by the Centre have the rights established by the Indian Digital Personal Data Protection Act 2023, including access, correction, erasure where applicable, and nomination. Requests to research@indiaisraelcentre.org.',
        },
        {
          heading: 'Changes',
          body: 'The Centre updates this Notice as required by law or by changes to its practices.',
        },
        {
          heading: 'Contact',
          body: 'research@indiaisraelcentre.org',
        },
      ],
    } as any,
  })
  results.push('Seeded: privacy')

  // ─── TERMS ───────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'terms' as any,
    data: {
      lastReviewed: '2026-05-11',
      sections: [
        {
          heading: 'Use of content',
          body: 'Content on this site is published by the Centre and its affiliated authors. Centre publications are made available for academic, professional and personal use. Citation is welcomed and encouraged.\n\nSubstantial reproduction, redistribution or commercial use of Centre content without prior written permission is not permitted. Reproduction of Centre content for non-commercial educational and journalistic purposes is permitted where the Centre and the relevant author are clearly attributed and the original URL is provided.',
        },
        {
          heading: 'Linking',
          body: 'Links to this site and to specific pieces of Centre content are welcomed. No specific permission is required.',
        },
        {
          heading: 'Accuracy',
          body: 'Authors are responsible for the accuracy of their own pieces. Errors discovered after publication are addressed through dated corrections appended to the relevant piece.',
        },
        {
          heading: 'External content',
          body: "The Centre's site links to and embeds content hosted elsewhere. The Centre does not guarantee the availability or accuracy of external content.",
        },
        {
          heading: 'Liability',
          body: 'Content on this site is provided for research, policy analysis and informed public discussion. It does not constitute legal, financial, medical, security or other professional advice. The Centre does not accept liability for actions taken on the basis of its publications.',
        },
        {
          heading: 'Governing law',
          body: 'These Terms of Use are governed by the laws of India.',
        },
        {
          heading: 'Contact',
          body: 'research@indiaisraelcentre.org',
        },
      ],
    } as any,
  })
  results.push('Seeded: terms')

  // ─── NOT FOUND ───────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'not-found' as any,
    data: {
      heading: 'Page not found',
      description:
        'The page you were looking for is not available at this address. If you arrived here by following a link, the link may be out of date. If you continue to encounter this error, please write to research@indiaisraelcentre.org.',
    } as any,
  })
  results.push('Seeded: not-found')

  // ─── PILLARS COLLECTION ───────────────────────────────────────────────────
  const PILLAR_SEEDS = [
    {
      code: 'identity',
      numeral: 'I',
      label: 'Civilizational Resilience & National Renewal',
      subtitle:
        'Identity & Heritage. Nation-building, identity and continuity in two post-colonial states.',
      shortFraming: 'Nation-building, identity and continuity in two post-colonial states.',
      framing:
        "India and Israel emerged within a year of each other from the end of British rule. Both inherited deep civilisational traditions and the practical task of forging modern political community out of them. Neither founding was uncontested, and each carried into independence a population that did not share a single religious, linguistic or ethnic identity.\n\nThis pillar studies the comparative history of those national projects. It treats nation-building, diasporic identity, and the relationship between civilisational tradition and constitutional democracy as live and serious subjects. The Jewish communities of India, Bene Israel, Cochin and Baghdadi, carry continuous histories of approximately two thousand years and remain the empirical anchor for much of the comparative work in this domain. The modern Indian community in Israel adds a contemporary register to the same conversation.\n\nThe comparative work has been under-attempted by existing scholarship, partly because the parallel is sharper than the common framings allow. Jawaharlal Nehru's vision of a plural Indian republic and David Ben-Gurion's vision of a Jewish democratic state share more, on close reading, than either national historiography has tended to acknowledge.",
    },
    {
      code: 'governance',
      numeral: 'II',
      label: 'Democratic Transformation & Sovereign Governance',
      subtitle:
        'Governance. Constitutional design, democratic institutions and the politics of governance.',
      shortFraming: 'Constitutional design, democratic institutions and the politics of governance.',
      framing:
        'The Indian and Israeli constitutions take different forms. India operates under a written constitution adopted in 1950, with a wide bill of rights and a judiciary that has developed the doctrine of unamendable basic structure. Israel has accumulated Basic Laws since 1958 and has spent the period since 2023 working through a public contest about the role of judicial review.\n\nBoth traditions engage the same family of questions. How does a constitutional democracy respond to political pressure for change in its core without losing the constraint that gives the constitution its function. How do parliamentary majorities and judicial review reach accommodation when they reach opposing conclusions. How does federalism, or its absence, shape the conduct of national politics when contestation runs along regional and communal lines. How do democracies sustain the standing of minorities under majoritarian pressure.',
    },
    {
      code: 'security',
      numeral: 'III',
      label: 'Security, Stability & Counter-Terror Cooperation',
      subtitle:
        'Security Affairs. Defence, intelligence and the shared analysis of threats to constitutional democracies.',
      shortFraming: 'Defence, intelligence and the shared analysis of threats.',
      framing:
        "India and Israel established full diplomatic relations in January 1992. The defence and security relationship has expanded substantially in the period since, particularly from the late 1990s and again after 2014. It now spans defence procurement, intelligence sharing, joint research and development, training, counter-terror cooperation, maritime security from the Mediterranean to the Indian Ocean, cybersecurity, and a wider set of strategic conversations between the two governments and their militaries.\n\nThe cooperation rests on a convergence of threat assessment and capability. Both states confront sustained political violence directed against civilian populations. Both have built substantial expertise in counter-terrorism that the other has found useful. The relationship is not symmetrical, given that Israel's compact-state defence and India's continental and maritime defence operate at different scales, but the practical record is substantial.",
    },
    {
      code: 'technology',
      numeral: 'IV',
      label: 'Innovation, Technology & Strategic Competitiveness',
      subtitle:
        'Technology. The India-Israel technology corridor and the strategic geopolitics of innovation.',
      shortFraming: 'The India-Israel technology corridor and the geopolitics of innovation.',
      framing:
        "Israel's dense innovation ecosystem and India's continental-scale technology economy meet at several practical points: defence and dual-use technology, cybersecurity, agritech and watertech, biotech and pharma, AI and emerging computing technologies, and the wider conversation about supply-chain sovereignty that has acquired new seriousness since 2020.\n\nThe bilateral relationship in technology has matured beyond government-to-government memoranda. Private firms in both countries have built operational relationships at significant scale. Indian engineers and entrepreneurs working in Israel, and Israeli firms working with Indian system integrators, form a real if uneven corridor of innovation. Joint research funds run by the two governments support a substantial body of academic and applied work.",
    },
    {
      code: 'development',
      numeral: 'V',
      label: 'Sustainable & Inclusive Development',
      subtitle:
        'Development. Water, agriculture, energy and the practical record of bilateral development cooperation.',
      shortFraming: 'Water, agriculture, energy and the practical record of development cooperation.',
      framing:
        "India and Israel have built one of the most operationally substantive development relationships either holds. It spans water management at scale, drip and precision irrigation, soil and horticulture, dairy and animal husbandry, renewable energy, urban development, healthcare cooperation, and humanitarian and disaster response. The Centres of Excellence programme, agreed between the two governments and now operating across multiple Indian states, is one of the most concrete examples of bilateral technical cooperation in either country's development record.\n\nThe practical record of the bilateral programmes is uneven across states, sectors and time. Cases where Israeli techniques have transferred well at Indian scale are worth understanding; so are cases where the transfer has been partial or where Indian conditions have required adaptations that have not always been made.",
    },
    {
      code: 'culture',
      numeral: 'VI',
      label: 'Shared Cultural & Spiritual Heritage',
      subtitle:
        'Culture. Historical exchange, religious traditions and the cultural ground on which the relationship rests.',
      shortFraming:
        'Historical exchange, religious traditions and the cultural ground on which the relationship rests.',
      framing:
        'The cultural and historical relationship between India and the Jewish world predates the modern bilateral relationship by a substantial margin. Jewish communities have lived in India for approximately two thousand years, with the Bene Israel, Cochin, Baghdadi and other communities carrying their own histories, liturgical traditions and relationships with the wider Indian society. India is one of the few places in the world where Jewish communities have lived continuously without sustained persecution by the surrounding majority.\n\nThe Indian Ocean trade history that connected the Red Sea, the Arabian Sea and the western Indian coast across two millennia is the long backdrop. The pre-modern relationship between Indian and Jewish worlds ran through commerce, scholarly exchange of a limited kind, and the practical accommodations of religious minorities in plural societies.\n\nContemporary cultural exchange includes a substantial cinema relationship, growing tourism and pilgrimage, and an emerging set of literary and academic exchanges. Research covers these and the older histories on which they rest.',
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
      await payload.update({
        collection: 'pillars' as any,
        id: existing.docs[0].id,
        data: pillar as any,
      })
      results.push(`Updated pillar: ${pillar.code}`)
    }
  }

  return NextResponse.json({ ok: true, results })
}
