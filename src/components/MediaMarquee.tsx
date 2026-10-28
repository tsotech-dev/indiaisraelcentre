'use client'

const MENTIONS = [
  {
    name: 'PTI',
    href: 'https://www.ptinews.com/story/business/Israel-to-continue-working-with-India-to-defeat-terrorism-Envoy/4145693',
    logo: (
      <span className="flex items-center gap-1.5">
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#C8102E',
            color: '#fff',
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            fontSize: '15px',
            letterSpacing: '0.04em',
            padding: '4px 10px',
            borderRadius: '3px',
            lineHeight: 1,
          }}
        >
          PTI
        </span>
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '13px',
            fontWeight: 400,
            color: '#333',
            letterSpacing: '0.01em',
          }}
        >
          Press Trust of India
        </span>
      </span>
    ),
  },
  {
    name: 'Economic Times',
    href: 'https://m.economictimes.com/news/india/israel-to-continue-working-with-india-to-defeat-terrorism-envoy/articleshow/134798722.cms',
    logo: (
      <span className="flex items-center gap-0">
        <span
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '18px',
            fontWeight: 700,
            color: '#1a1a1a',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}
        >
          <span style={{ color: '#F15A22' }}>The</span>{' '}
          <span>Economic Times</span>
        </span>
      </span>
    ),
  },
  {
    name: 'Indian Express',
    href: 'https://indianexpress.com/article/opinion/columns/why-does-benjamin-netanyahu-still-dominate-israeli-politics-10937262/',
    logo: (
      <span className="flex items-center gap-0">
        <span
          style={{
            fontFamily: '"Times New Roman", Georgia, serif',
            fontSize: '17px',
            fontWeight: 700,
            color: '#1a1a1a',
            letterSpacing: '0.01em',
            lineHeight: 1,
          }}
        >
          The Indian Express
        </span>
      </span>
    ),
  },
  {
    name: 'News18',
    href: 'https://www.news18.com/agency-feeds/israel-to-continue-working-with-india-to-defeat-terrorism-envoy-10373591.html',
    logo: (
      <span className="flex items-center gap-0">
        <span
          style={{
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontSize: '20px',
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          <span style={{ color: '#E31E25' }}>news</span>
          <span
            style={{
              background: '#003087',
              color: '#fff',
              padding: '0 5px 1px',
              borderRadius: '2px',
              fontSize: '17px',
            }}
          >
            18
          </span>
        </span>
      </span>
    ),
  },
]

// Duplicate for seamless looping
const ITEMS = [...MENTIONS, ...MENTIONS, ...MENTIONS, ...MENTIONS]

export default function MediaMarquee() {
  return (
    <>
      <style>{`
        @keyframes iic-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .iic-marquee-track {
          animation: iic-marquee 22s linear infinite;
          will-change: transform;
        }
        .iic-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="bg-white border-b border-stone-200 overflow-hidden">
        <div className="flex items-stretch">
          {/* Label */}
          <div className="shrink-0 flex items-center gap-2 px-5 py-4 border-r border-stone-200 bg-stone-50 z-10">
            <span
              aria-hidden
              className="w-1.5 h-1.5 rounded-full bg-iic-saffron"
            />
            <span className="text-[9px] font-sans font-bold uppercase tracking-[0.22em] text-stone-500 whitespace-nowrap">
              Media Mentions
            </span>
          </div>

          {/* Scrolling track */}
          <div className="relative flex-1 overflow-hidden">
            {/* Left fade */}
            <div
              className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, white 0%, transparent 100%)',
              }}
            />
            {/* Right fade */}
            <div
              className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to left, white 0%, transparent 100%)',
              }}
            />

            <div className="iic-marquee-track flex items-center w-max">
              {ITEMS.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Read coverage on ${item.name}`}
                  className="flex items-center px-10 py-4 opacity-70 hover:opacity-100 transition-opacity duration-200 shrink-0"
                  style={{ textDecoration: 'none' }}
                >
                  {item.logo}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
