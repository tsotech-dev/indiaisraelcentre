export const PILLARS = [
  {
    code: 'identity',
    numeral: 'I',
    label: 'Civilizational Resilience & National Renewal',
    subtitle: 'Identity & Heritage. Nation-building, identity and continuity in two post-colonial states.',
    shortFraming: 'Nation-building, identity and continuity in two post-colonial states.',
    path: '/research/themes/identity/',
    framing:
      "India and Israel emerged within a year of each other from the end of British rule. Both inherited deep civilisational traditions and the practical task of forging modern political community out of them. Neither founding was uncontested, and each carried into independence a population that did not share a single religious, linguistic or ethnic identity.\n\nThis pillar studies the comparative history of those national projects. It treats nation-building, diasporic identity, and the relationship between civilisational tradition and constitutional democracy as live and serious subjects. The Jewish communities of India, Bene Israel, Cochin and Baghdadi, carry continuous histories of approximately two thousand years and remain the empirical anchor for much of the comparative work in this domain. The modern Indian community in Israel adds a contemporary register to the same conversation.\n\nThe comparative work has been under-attempted by existing scholarship, partly because the parallel is sharper than the common framings allow. Jawaharlal Nehru's vision of a plural Indian republic and David Ben-Gurion's vision of a Jewish democratic state share more, on close reading, than either national historiography has tended to acknowledge.",
  },
  {
    code: 'governance',
    numeral: 'II',
    label: 'Democratic Transformation & Sovereign Governance',
    subtitle: 'Governance. Constitutional design, democratic institutions and the politics of governance.',
    shortFraming: 'Constitutional design, democratic institutions and the politics of governance.',
    path: '/research/themes/governance/',
    framing:
      'The Indian and Israeli constitutions take different forms. India operates under a written constitution adopted in 1950, with a wide bill of rights and a judiciary that has developed the doctrine of unamendable basic structure. Israel has accumulated Basic Laws since 1958 and has spent the period since 2023 working through a public contest about the role of judicial review.\n\nBoth traditions engage the same family of questions. How does a constitutional democracy respond to political pressure for change in its core without losing the constraint that gives the constitution its function. How do parliamentary majorities and judicial review reach accommodation when they reach opposing conclusions. How does federalism, or its absence, shape the conduct of national politics when contestation runs along regional and communal lines. How do democracies sustain the standing of minorities under majoritarian pressure.',
  },
  {
    code: 'security',
    numeral: 'III',
    label: 'Security, Stability & Counter-Terror Cooperation',
    subtitle: 'Security Affairs. Defence, intelligence and the shared analysis of threats to constitutional democracies.',
    shortFraming: 'Defence, intelligence and the shared analysis of threats.',
    path: '/research/themes/security/',
    framing:
      'India and Israel established full diplomatic relations in January 1992. The defence and security relationship has expanded substantially in the period since, particularly from the late 1990s and again after 2014. It now spans defence procurement, intelligence sharing, joint research and development, training, counter-terror cooperation, maritime security from the Mediterranean to the Indian Ocean, cybersecurity, and a wider set of strategic conversations between the two governments and their militaries.\n\nThe cooperation rests on a convergence of threat assessment and capability. Both states confront sustained political violence directed against civilian populations. Both have built substantial expertise in counter-terrorism that the other has found useful. The relationship is not symmetrical, given that Israel\'s compact-state defence and India\'s continental and maritime defence operate at different scales, but the practical record is substantial.',
  },
  {
    code: 'technology',
    numeral: 'IV',
    label: 'Innovation, Technology & Strategic Competitiveness',
    subtitle: 'Technology. The India-Israel technology corridor and the strategic geopolitics of innovation.',
    shortFraming: 'The India-Israel technology corridor and the geopolitics of innovation.',
    path: '/research/themes/technology/',
    framing:
      "Israel's dense innovation ecosystem and India's continental-scale technology economy meet at several practical points: defence and dual-use technology, cybersecurity, agritech and watertech, biotech and pharma, AI and emerging computing technologies, and the wider conversation about supply-chain sovereignty that has acquired new seriousness since 2020.\n\nThe bilateral relationship in technology has matured beyond government-to-government memoranda. Private firms in both countries have built operational relationships at significant scale. Indian engineers and entrepreneurs working in Israel, and Israeli firms working with Indian system integrators, form a real if uneven corridor of innovation. Joint research funds run by the two governments support a substantial body of academic and applied work.",
  },
  {
    code: 'development',
    numeral: 'V',
    label: 'Sustainable & Inclusive Development',
    subtitle: 'Development. Water, agriculture, energy and the practical record of bilateral development cooperation.',
    shortFraming: 'Water, agriculture, energy and the practical record of development cooperation.',
    path: '/research/themes/development/',
    framing:
      'India and Israel have built one of the most operationally substantive development relationships either holds. It spans water management at scale, drip and precision irrigation, soil and horticulture, dairy and animal husbandry, renewable energy, urban development, healthcare cooperation, and humanitarian and disaster response. The Centres of Excellence programme, agreed between the two governments and now operating across multiple Indian states, is one of the most concrete examples of bilateral technical cooperation in either country\'s development record.\n\nThe practical record of the bilateral programmes is uneven across states, sectors and time. Cases where Israeli techniques have transferred well at Indian scale are worth understanding; so are cases where the transfer has been partial or where Indian conditions have required adaptations that have not always been made.',
  },
  {
    code: 'culture',
    numeral: 'VI',
    label: 'Shared Cultural & Spiritual Heritage',
    subtitle: 'Culture. Historical exchange, religious traditions and the cultural ground on which the relationship rests.',
    shortFraming: 'Historical exchange, religious traditions and the cultural ground on which the relationship rests.',
    path: '/research/themes/culture/',
    framing:
      'The cultural and historical relationship between India and the Jewish world predates the modern bilateral relationship by a substantial margin. Jewish communities have lived in India for approximately two thousand years, with the Bene Israel, Cochin, Baghdadi and other communities carrying their own histories, liturgical traditions and relationships with the wider Indian society. India is one of the few places in the world where Jewish communities have lived continuously without sustained persecution by the surrounding majority.\n\nThe Indian Ocean trade history that connected the Red Sea, the Arabian Sea and the western Indian coast across two millennia is the long backdrop. The pre-modern relationship between Indian and Jewish worlds ran through commerce, scholarly exchange of a limited kind, and the practical accommodations of religious minorities in plural societies.\n\nContemporary cultural exchange includes a substantial cinema relationship, growing tourism and pilgrimage, and an emerging set of literary and academic exchanges. Research covers these and the older histories on which they rest.',
  },
] as const

export type PillarCode = (typeof PILLARS)[number]['code']
