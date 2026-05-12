import { getPayload } from 'payload'
import config from '../payload.config'

function richText(text: string) {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

function richTextMulti(paragraphs: string[]) {
  return {
    root: {
      children: paragraphs.map((text) => ({
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

async function main() {
  const payload = await getPayload({ config })

  // ─── PERSON ────────────────────────────────────────────────────────────────
  const existingPerson = await payload.find({
    collection: 'people',
    where: { slug: { equals: 'khinvraj-jangid' } },
    limit: 1,
  })

  if (existingPerson.totalDocs === 0) {
    await payload.create({
      collection: 'people',
      data: {
        name: 'Prof. Khinvraj Jangid',
        slug: 'khinvraj-jangid',
        role: 'Chair of the Forum',
        email: 'kjangid@jgu.edu.in',
        bio: richTextMulti([
          'Professor Khinvraj Jangid is Professor and Director of the Jindal Centre for Israel Studies at O.P. Jindal Global University. He is one of India\'s foremost scholars of the India-Israel bilateral relationship.',
          'He has published extensively on the political and diplomatic history of the relationship, the Jewish communities of India, and the intersection of South Asian and Israeli political thought. His work appears in leading peer-reviewed journals in history, political science, and Jewish studies.',
          'Professor Jangid chairs the Forum of the India Israel Centre, setting its intellectual programme and presiding over its convenings. He has held visiting positions at the Hebrew University of Jerusalem and Tel Aviv University.',
        ]),
      },
    })
    console.log('Created person: Prof. Khinvraj Jangid')
  } else {
    console.log('Person already exists: Prof. Khinvraj Jangid')
  }

  // ─── PAPER ─────────────────────────────────────────────────────────────────
  const existingPaper = await payload.find({
    collection: 'publications',
    where: { slug: { equals: 'india-israel-strategic-partnership-twenty-five-years' } },
    limit: 1,
  })

  if (existingPaper.totalDocs === 0) {
    await payload.create({
      collection: 'publications',
      data: {
        title: 'India-Israel Strategic Partnership: Twenty-Five Years and Beyond',
        slug: 'india-israel-strategic-partnership-twenty-five-years',
        type: 'paper',
        pillar: 'security',
        authors: [
          { name: 'Prof. Khinvraj Jangid', affiliation: 'O.P. Jindal Global University' },
          { name: 'Dr. Meera Sudhakar', affiliation: 'Jawaharlal Nehru University' },
        ],
        publishedDate: '2026-01-15',
        abstract:
          'This paper examines the evolution of the India-Israel strategic partnership in the twenty-five years since diplomatic normalisation in 1992, with particular attention to the defence technology dimension. We argue that the relationship has moved through three distinct phases — a convergence of interests phase, a formalisation phase, and an emerging strategic autonomy phase — and that the third phase is characterised by a shift from platform procurement to co-development. Drawing on interviews with serving and retired defence officials and a systematic analysis of defence trade data, we assess the structural conditions that have enabled this shift and the constraints that remain. We conclude with an assessment of the relationship\'s trajectory over the next decade.',
        body: richTextMulti([
          'The India-Israel bilateral relationship is among the more consequential and analytically neglected partnerships in contemporary international affairs. In the twenty-five years since diplomatic normalisation, the relationship has been transformed from a carefully managed low-profile engagement into one of India\'s most significant defence and technology partnerships.',
          'This paper examines that transformation across three analytical dimensions: the political-diplomatic dimension, the defence-technology dimension, and the people-to-people dimension. We are primarily concerned with the second of these, but we argue that a complete account of the defence relationship requires situating it within the broader political evolution.',
          'Our central argument is that the India-Israel defence relationship has moved through three analytically distinct phases. The first phase, running roughly from 1992 to 2000, was characterised by a convergence of interests but constrained institutionalisation. Both countries had reasons to maintain the relationship at a level below full public visibility, and the defence relationship accordingly operated in what practitioners describe as a "grey zone" — substantial in material terms, limited in formal terms.',
          'The second phase, from 2000 to approximately 2014, saw formalisation. A series of institutional mechanisms — joint working groups, framework agreements, ministerial-level meetings — gave the relationship formal architecture for the first time. Defence trade volumes rose substantially, and Israel became India\'s second-largest defence supplier after Russia.',
          'The third phase, which we date from 2014 and characterise as ongoing, is the most structurally significant. It is defined by a shift from platform procurement to co-development. This shift was enabled by India\'s Make in India initiative, Israel\'s own evolution from a predominantly export-oriented defence posture toward one that emphasises joint ventures and technology transfer, and a growing recognition on both sides that the relationship\'s long-term strategic value depends on deepening technological integration rather than repeated transactions.',
        ]),
      },
    })
    console.log('Created paper: India-Israel Strategic Partnership')
  } else {
    console.log('Paper already exists')
  }

  // ─── BRIEF ─────────────────────────────────────────────────────────────────
  const existingBrief = await payload.find({
    collection: 'publications',
    where: { slug: { equals: 'india-israel-water-technology-cooperation' } },
    limit: 1,
  })

  if (existingBrief.totalDocs === 0) {
    await payload.create({
      collection: 'publications',
      data: {
        title: 'Water Technology Cooperation: A Model for the India-Israel Development Partnership',
        slug: 'india-israel-water-technology-cooperation',
        type: 'brief',
        pillar: 'development',
        authors: [
          { name: 'Ananya Krishnan', affiliation: 'India Israel Centre' },
        ],
        publishedDate: '2026-02-20',
        abstract:
          'India and Israel have developed one of the most substantive bilateral water technology partnerships in the world. This brief examines the structure of that partnership — its institutional mechanisms, the technologies transferred, and the scale of deployment — and argues that it represents a model for development cooperation that other bilateral relationships would do well to study. It also identifies three constraints that limit the partnership\'s reach and proposes policy adjustments that could address them.',
        body: richTextMulti([
          'Water stress is among the most serious structural challenges facing India\'s agricultural economy. An estimated 600 million Indians face high to extreme water stress, and agriculture accounts for approximately 90 per cent of freshwater withdrawals. The productivity of Indian agriculture depends significantly on improving water use efficiency, and this is a domain in which Israel has genuine world-leading expertise.',
          'The India-Israel water technology partnership has its origins in the early 1990s, when irrigation officials from several Indian states began visiting Israeli agricultural research stations and returning with drip and sprinkler irrigation technologies. The partnership has since broadened considerably: it now encompasses desalination, wastewater treatment, and watershed management, and it operates through a mix of government-to-government programmes and private sector deployment.',
          'This brief draws on fieldwork conducted in Punjab, Haryana, and Maharashtra, and on interviews with officials at the National Mission for Sustainable Agriculture and the Israel Innovation Authority. We find that the partnership\'s reach is substantial but geographically uneven, and that its future growth is constrained by three structural factors: the limited absorptive capacity of state agricultural extension systems; intellectual property arrangements that create disincentives for technology adaptation; and a tendency to treat the partnership as a procurement relationship rather than a co-development one.',
          'We propose three policy adjustments: a dedicated bilateral water technology adaptation fund; revised IP protocols that create incentives for local modification; and a structured state-to-state partnership mechanism that routes technology deployment through state agriculture departments rather than central government channels.',
        ]),
      },
    })
    console.log('Created brief: Water Technology Cooperation')
  } else {
    console.log('Brief already exists')
  }

  // ─── COMMENTARY ────────────────────────────────────────────────────────────
  const existingCommentary = await payload.find({
    collection: 'publications',
    where: { slug: { equals: 'abraham-accords-india-strategic-calculus' } },
    limit: 1,
  })

  if (existingCommentary.totalDocs === 0) {
    await payload.create({
      collection: 'publications',
      data: {
        title: 'The Abraham Accords and India\'s Strategic Calculus',
        slug: 'abraham-accords-india-strategic-calculus',
        type: 'commentary',
        pillar: 'security',
        authors: [
          { name: 'Prof. Khinvraj Jangid', affiliation: 'O.P. Jindal Global University' },
        ],
        publishedDate: '2026-03-10',
        abstract:
          'The Abraham Accords reshaped the geometry of Middle Eastern diplomacy in ways that have direct consequences for India\'s relationship with both Israel and the Arab Gulf states. This commentary argues that India\'s response has been characterised by a studied ambiguity that serves its immediate interests but forecloses strategic opportunities.',
        body: richTextMulti([
          'The Abraham Accords were, from one analytical vantage, a triumph of what might be called convergence diplomacy — the formalisation of alignments that had existed in practice for years but lacked institutional expression. From another vantage, they were a fundamental restructuring of the normative architecture of Arab-Israeli relations, one whose consequences are still working themselves out.',
          'For India, the Accords presented a specific challenge: how to respond to a development that strengthened a key bilateral partner (Israel), deepened ties between Israel and other key bilateral partners (the UAE, Bahrain), and did so in a way that complicated India\'s traditional positioning on the Palestinian question.',
          'The Indian government\'s response was to say very little. The Ministry of External Affairs issued a statement that welcomed normalisation while reaffirming India\'s commitment to a two-state solution. This was, in the context of Indian diplomacy, a somewhat daring position — it represented more than the ritual reaffirmation of past positions that characterised India\'s earlier responses to developments in the Arab-Israeli conflict.',
          'I want to argue, however, that the response was insufficiently forward-looking. The Accords created a new strategic geography in which India has a significant interest — one that connects India\'s partnerships with Israel, the UAE, and the United States in ways that were less legible before September 2020. The India-Middle East-Europe Economic Corridor, announced in 2023, represents one institutionalisation of this geography. But India\'s diplomatic posture has not fully caught up with the strategic possibilities the Accords created.',
          'The risk of studied ambiguity, sustained over time, is that it becomes strategic incoherence. India has legitimate interests in both the Israeli relationship and in its relationships with Arab states, and these interests are not irreconcilable. The Accords demonstrated that Arab states themselves have found ways to hold them together. India should be capable of the same.',
        ]),
      },
    })
    console.log('Created commentary: Abraham Accords and India\'s Strategic Calculus')
  } else {
    console.log('Commentary already exists')
  }

  // ─── CONVENING ─────────────────────────────────────────────────────────────
  const existingConvening = await payload.find({
    collection: 'convenings',
    where: { slug: { equals: 'india-israel-technology-roundtable-2026' } },
    limit: 1,
  })

  if (existingConvening.totalDocs === 0) {
    await payload.create({
      collection: 'convenings',
      data: {
        title: 'Roundtable on India-Israel Technology Cooperation: Defence, Agriculture, and Water',
        slug: 'india-israel-technology-roundtable-2026',
        eventDate: '2026-04-08',
        format: 'roundtable',
        pillar: 'technology',
        description: richTextMulti([
          'The Forum convened a closed roundtable in April 2026 bringing together fifteen participants — serving and recently retired officials, researchers, and practitioners — to examine the state of India-Israel technology cooperation across three domains: defence manufacturing, agricultural technology, and water management.',
          'The roundtable was conducted under modified Chatham House rules: participants may be identified by category (official, academic, practitioner) but not by name or precise institutional affiliation. This summary reflects the analytical ground covered; it does not attribute positions to individuals.',
          'The discussion identified a central tension in the current architecture of technology cooperation: the most significant opportunities — co-development of dual-use technologies, joint ventures in frontier agriculture — require institutional frameworks that neither side has yet constructed, while the existing framework is well-suited to older modalities (platform procurement, unidirectional technology transfer) that both sides have an interest in moving beyond.',
          'Participants from the defence domain noted that the shift toward co-development articulated in India\'s Defence Acquisition Policy has created genuine new space for Israeli firms, but that utilising this space requires a different kind of engagement than Israeli defence companies are accustomed to — one that involves longer time horizons, more intensive relationship management, and a tolerance for the institutional complexity of India\'s defence procurement system.',
        ]),
      },
    })
    console.log('Created convening: Technology Roundtable 2026')
  } else {
    console.log('Convening already exists')
  }

  console.log('\nSeed complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
