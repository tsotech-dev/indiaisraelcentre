'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Research', href: '/research/' },
  { label: 'Forum', href: '/forum/' },
  { label: 'About', href: '/about/' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-stone-200/80 shadow-[0_1px_0_0_rgba(0,0,0,0.02)]'
          : 'bg-white/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="tricolor-bar h-[3px] w-full" />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-9 h-9 bg-iic-navy rounded-sm flex items-center justify-center group-hover:bg-iic-saffron transition-colors duration-300">
              <span className="text-white text-[11px] font-bold font-sans tracking-tight">IIC</span>
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-iic-gold" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[13px] font-semibold text-stone-900 font-sans tracking-tight">
              India Israel Centre
            </span>
            <span className="text-[10px] font-sans text-stone-400 uppercase tracking-[0.15em]">
              Research · Forum · Engagement
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-sans font-medium tracking-wide transition-colors rounded-full ${
                  active ? 'text-iic-navy' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-1 w-1 h-1 rounded-full bg-iic-saffron" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/about/contact/"
            className="text-sm font-sans font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/#newsletter"
            className="group inline-flex items-center gap-2 text-sm font-sans font-semibold bg-iic-navy text-white pl-4 pr-1 py-1 rounded-full hover:bg-iic-saffron transition-colors duration-300"
          >
            Subscribe
            <span className="bg-white text-iic-navy group-hover:text-iic-saffron rounded-full w-7 h-7 flex items-center justify-center transition-colors">
              →
            </span>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-stone-700 hover:text-stone-900"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-6 py-4 flex flex-col gap-1 animate-fade-in">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-sans font-medium text-stone-800 hover:text-iic-saffron py-2 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/about/contact/"
            className="text-base font-sans font-medium text-stone-800 hover:text-iic-saffron py-2 transition-colors border-t border-stone-100 mt-2 pt-3"
          >
            Contact
          </Link>
          <Link
            href="/#newsletter"
            className="mt-3 inline-flex items-center justify-center gap-2 text-sm font-sans font-semibold bg-iic-saffron text-white px-4 py-3 rounded-full hover:bg-iic-saffron-deep transition-colors"
          >
            Subscribe to the newsletter →
          </Link>
        </div>
      )}
    </header>
  )
}
