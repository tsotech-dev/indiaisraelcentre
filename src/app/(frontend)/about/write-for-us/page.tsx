import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Write For Us',
  description:
    'Writing submission guidelines for contributors to the India Israel Centre: scope, categories, submission procedure, citation standards and editorial process.',
}

const EMAIL = 'research@indiaisraelcentre.org'

const PILLARS = [
  'Civilizational Resilience and National Renewal',
  'Democratic Transformation and Sovereign Governance',
  'Security, Stability and Counter-Terrorism Cooperation',
  'Innovation, Technology and Strategic Competitiveness',
  'Sustainable and Inclusive Development',
  'Shared Culture and Spiritual Heritage',
]

const CATEGORIES = [
  { label: 'Op-Ed', body: '700–900 words. Concise, thesis-driven pieces that offer timely analysis, a clear argument, and policy-relevant insight.' },
  { label: 'Commentary', body: 'Up to a maximum of 3,000 words. Longer-form analytical essays that provide deeper contextualisation, historical perspective, empirical evidence, and structured recommendations.' },
]

const BODY_REQUIREMENTS = [
  'Full name of the author(s) and institutional affiliation (if any);',
  'A brief biographical note (approximately 50–100 words);',
  'Explicit classification of the piece as either Op-Ed or Commentary;',
  'Exact word count of the main text;',
  'Confirmation that the work is original, unpublished, and not under consideration elsewhere;',
  'Disclosure of any relevant funding sources, affiliations, or potential conflicts of interest.',
]

const VISUALS = [
  'All visual elements must be accompanied by a clear caption and full source credits.',
  'Authors are responsible for securing any necessary permissions and for confirming that the material may be reproduced.',
  'Visuals should be numbered, titled, and referenced within the text; source attribution must appear with each item.',
]

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mt-12 mb-4">{children}</h2>
}

function Mail() {
  return (
    <a href={`mailto:${EMAIL}`} className="text-iic-navy underline-anim">
      {EMAIL}
    </a>
  )
}

export default function WriteForUsPage() {
  return (
    <>
      <StaticPageHero
        accent="saffron"
        eyebrow="Contribute"
        title="Writing Submission Guidelines"
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Write For Us' }]}
      />
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14 text-stone-700 leading-relaxed text-lg [&_p]:mb-5">
          <Reveal>
            <p>
              The India Israel Centre is an independent forum dedicated to rigorous academic dialogue, policy-oriented
              research, and the public dissemination of authoritative scholarship on India–Israel relations. The Centre
              invites original contributions that advance informed understanding of the bilateral relationship and the
              wider West Asia region.
            </p>

            <Heading>Scope of Submissions</Heading>
            <p>
              The Centre welcomes submissions addressing the broader India–Israel relationship across the following six
              pillars, as well as analyses of West Asia more generally:
            </p>
            <ol className="list-decimal pl-6 mb-5 space-y-1">
              {PILLARS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            <p>
              Contributions that situate India–Israel ties within the broader strategic, economic, security, or cultural
              dynamics of West Asia are equally encouraged.
            </p>

            <Heading>Categories of Contribution</Heading>
            <p>Authors must clearly classify their submission as one of the following:</p>
            <ul className="list-disc pl-6 mb-5 space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.label}>
                  <strong className="text-stone-900">{c.label}:</strong> {c.body}
                </li>
              ))}
            </ul>

            <Heading>Submission Procedure</Heading>
            <p>
              All submissions are to be sent by email to <Mail />.
            </p>
            <p>
              The subject line of the email should follow this format:{' '}
              <strong className="text-stone-900">[Op-Ed / Commentary] – [Short Title] – [Author Name]</strong>
            </p>
            <p>The body of the email (or an accompanying cover note) must include:</p>
            <ul className="list-disc pl-6 mb-5 space-y-1">
              {BODY_REQUIREMENTS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            <Heading>Scholarly Standards and Citation Requirements</Heading>
            <p>
              Submissions must adhere to the highest standards of scholarly integrity. All data, facts, figures,
              statistics, quotations, and substantive claims are required to be fully and accurately cited.
            </p>
            <p>
              Citations must conform to the Chicago Manual of Style (either notes-and-bibliography or author-date system,
              applied consistently throughout). Complete bibliographic details, including URLs and access dates for
              electronic sources, are mandatory. Preference is given to primary sources, official documents, peer-reviewed
              scholarship, and reports issued by reputable institutions.
            </p>

            <Heading>Visual Material</Heading>
            <p>
              Images, charts, maps, tables, or other illustrative material may be included when they substantively enhance
              the analysis.
            </p>
            <ul className="list-disc pl-6 mb-5 space-y-1">
              {VISUALS.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>

            <Heading>Originality, Integrity, and Editorial Process</Heading>
            <p>
              All submissions must be the author’s original work. Plagiarism and self-plagiarism are not permitted. The use
              of generative artificial intelligence tools for writing is prohibited. Any assistance from AI tools in
              quantitative research must be clearly disclosed.
            </p>
            <p>
              The Centre reserves the right to edit accepted manuscripts for clarity, length, house style and factual
              accuracy. Authors will be consulted where substantive revisions are required. Views expressed in published
              pieces are those of the author(s) alone and do not necessarily reflect the position of the India Israel
              Centre.
            </p>
            <p>
              By submitting a manuscript, the author grants the Centre a non-exclusive licence to publish the work in
              electronic and related formats, with appropriate attribution. Copyright remains with the author.
            </p>
            <p>
              Owing to the high volume of submissions received, authors will be notified only if their piece is selected
              for publication on the Centre’s platform. Non-selection will not be communicated.
            </p>
            <p>
              These guidelines draw on established practices at leading policy research institutions and are intended to
              uphold analytical rigour, transparency and professional standards.
            </p>
            <p>
              Enquiries may be directed to <Mail />.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
