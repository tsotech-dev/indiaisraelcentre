import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getGlobal } from '@/lib/payload'

const LINKS = [
  { label: 'Research', href: '/research/' },
  { label: 'Forum', href: '/forum/' },
  { label: 'About', href: '/about/' },
  { label: 'Homepage', href: '/' },
]

export default async function NotFound() {
  const c = await getGlobal('not-found')
  return (
    <>
      <Header />
      <main className="relative min-h-[80vh] flex items-center justify-center px-6 bg-mesh overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #FF671F 0%, transparent 65%)' }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #003D7A 0%, transparent 65%)' }}
        />
        <div className="relative text-center max-w-xl">
          <div className="font-display font-bold text-[10rem] md:text-[14rem] leading-none tracking-tight text-stone-900 mb-4 animate-fade-up">
            4<span className="text-iic-saffron">0</span>4
          </div>
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-3 animate-fade-up delay-1">
            / Page not found
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-5 animate-fade-up delay-2">
            {(c?.heading as string | undefined) ?? 'This page does not exist or has moved.'}
          </h1>
          <p className="text-stone-600 mb-10 leading-relaxed animate-fade-up delay-3">
            {(c?.description as string | undefined) ?? 'If you followed a link from an external source, the URL may have changed. All published content remains accessible — please browse from the sections below.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3 animate-fade-up delay-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-sans font-semibold border border-stone-300 bg-white px-5 py-2.5 rounded-full hover:border-iic-saffron hover:text-iic-saffron-deep transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
