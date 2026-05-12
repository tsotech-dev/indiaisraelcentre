'use client'

import { useState } from 'react'

interface CitationBlockProps {
  title: string
  authors: string[]
  year: string
  publisher?: string
  url: string
  doi?: string
}

function buildCitations({ title, authors, year, publisher, url, doi }: CitationBlockProps) {
  const authorStr = authors.join(', ')
  const doiOrUrl = doi ? `https://doi.org/${doi}` : url

  return {
    chicago: `${authorStr}. "${title}." ${publisher ?? 'India Israel Centre'}, ${year}. ${doiOrUrl}.`,
    apa: `${authorStr}. (${year}). ${title}. ${publisher ?? 'India Israel Centre'}. ${doiOrUrl}`,
    mla: `${authorStr}. "${title}." ${publisher ?? 'India Israel Centre'}, ${year}, ${doiOrUrl}.`,
    bibtex: `@article{iic${year},\n  author = {${authors.join(' and ')}},\n  title = {${title}},\n  year = {${year}},\n  publisher = {${publisher ?? 'India Israel Centre'}},\n  url = {${doiOrUrl}}\n}`,
  }
}

export default function CitationBlock(props: CitationBlockProps) {
  const [format, setFormat] = useState<'chicago' | 'apa' | 'mla' | 'bibtex'>('chicago')
  const [copied, setCopied] = useState(false)
  const citations = buildCitations(props)

  function copy() {
    navigator.clipboard.writeText(citations[format])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <aside className="border border-stone-200 rounded-sm bg-iic-paper p-6 my-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-iic-saffron" />
      <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron-deep mb-4">
        Cite this publication
      </h3>

      <div className="flex flex-wrap gap-2 mb-5">
        {(['chicago', 'apa', 'mla', 'bibtex'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`text-xs font-sans font-semibold px-3 py-1.5 rounded-full border transition-all ${
              format === f
                ? 'bg-iic-navy text-white border-iic-navy shadow-sm'
                : 'bg-white border-stone-300 text-stone-600 hover:border-iic-navy hover:text-iic-navy'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <pre className="text-xs text-stone-700 bg-white border border-stone-200 rounded-sm p-4 whitespace-pre-wrap break-words font-mono leading-relaxed">
        {citations[format]}
      </pre>

      <button
        onClick={copy}
        className="mt-4 text-xs font-sans font-semibold text-iic-saffron-deep hover:text-iic-saffron inline-flex items-center gap-1.5"
      >
        {copied ? (
          <>
            <span>✓</span> Copied to clipboard
          </>
        ) : (
          <>
            <span>⎘</span> Copy citation
          </>
        )}
      </button>
    </aside>
  )
}
