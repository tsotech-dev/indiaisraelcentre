export const PILLARS = [
  {
    code: 'identity',
    label: 'Identity, Heritage and Society',
    oneLineFraming: 'How shared civilisational memory shapes the India-Israel relationship.',
    path: '/research/themes/identity/',
    framing:
      'The India-Israel relationship has always carried a civilisational undertone that sits alongside its strategic logic. Both nations understand themselves as ancient peoples reconstituted as modern states — a self-understanding that generates both solidarity and a distinctive vocabulary for the bilateral. This pillar examines how shared historical memory, religious heritage, and questions of national identity shape the relationship.',
  },
  {
    code: 'governance',
    label: 'Governance and Public Policy',
    oneLineFraming: 'Comparative lessons in democratic governance and state capacity.',
    path: '/research/themes/governance/',
    framing:
      'India and Israel are parliamentary democracies that have sustained competitive elections under conditions of external threat and internal diversity. This pillar examines what each country can learn from the other in democratic governance, public administration, judicial independence, and the management of security and civil liberties.',
  },
  {
    code: 'security',
    label: 'Security and Strategy',
    oneLineFraming: 'Defence cooperation, counter-terrorism, and regional strategic alignments.',
    path: '/research/themes/security/',
    framing:
      'Defence and security cooperation is the most extensively documented dimension of the India-Israel relationship. This pillar examines the architecture of defence cooperation, the political constraints on both sides, and the broader strategic alignment between two countries that are neighbours of neither each other nor of any shared adversary.',
  },
  {
    code: 'technology',
    label: 'Technology and Innovation',
    oneLineFraming: 'Technology transfer, agri-tech, cyber, and the bilateral innovation ecosystem.',
    path: '/research/themes/technology/',
    framing:
      "Israel's innovation ecosystem has produced per-capita patent rates and unicorn density that India's policy establishment has studied carefully. This pillar examines the bilateral technology relationship across its principal domains: agricultural technology and water management, cyber and information security, defence technology, and the emerging life-sciences and climate-technology corridors.",
  },
  {
    code: 'development',
    label: 'Development and Economic Cooperation',
    oneLineFraming: 'Trade, investment, water, agriculture, and development partnership.',
    path: '/research/themes/development/',
    framing:
      'India and Israel have signed a series of trade and investment agreements, but the bilateral economic relationship remains underdeveloped relative to the strategic relationship. This pillar examines the economic relationship in its full scope — trade, investment, tourism, development cooperation in third countries.',
  },
  {
    code: 'culture',
    label: 'Culture and Soft Power',
    oneLineFraming: 'Arts, diaspora, people-to-people ties, and the cultural diplomacy of a growing partnership.',
    path: '/research/themes/culture/',
    framing:
      'Culture and soft power occupy an underanalysed corner of the India-Israel relationship. This pillar examines the cultural dimensions of the bilateral relationship: diaspora communities, artistic exchange, educational links, tourism, and the ways in which culture shapes public attitudes toward the other country.',
  },
] as const

export type PillarCode = (typeof PILLARS)[number]['code']
