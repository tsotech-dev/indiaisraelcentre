'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
      className={`sticky top-0 z-50 text-white transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? 'bg-[#001a3d]/95 border-b border-white/10 shadow-[0_2px_24px_0_rgba(0,10,40,0.6)]'
          : 'bg-[#001a3d]/90 border-b border-white/5'
      }`}
    >
      <div className="tricolor-bar h-[3px] w-full" />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 overflow-hidden flex items-center justify-center">
            <Image
              src="/logo/iic_logo_light.png"
              alt="India Israel Centre"
              width={52}
              height={52}
              className="object-cover scale-[1.22]"
            />
          </div>
          <span className="hidden sm:block text-[12px] font-bold text-white font-sans tracking-[0.12em] uppercase">
            India Israel Centre
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-[11px] font-sans font-bold uppercase tracking-[0.15em] transition-colors rounded-full group/nav text-white`}
              >
                {item.label}
                <span className={`absolute left-4 right-4 bottom-1 h-[2px] bg-iic-saffron rounded-full transition-transform duration-200 origin-left ${active ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'}`} />
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/about/contact/"
            className="group/contact relative text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-white"
          >
            Contact
            <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-iic-saffron rounded-full scale-x-0 group-hover/contact:scale-x-100 transition-transform duration-200 origin-left" />
          </Link>
          <Link
            href="/#newsletter"
            className="group inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-[0.15em] border border-white/30 text-white pl-4 pr-1 py-1 rounded-full hover:border-iic-saffron hover:text-iic-saffron transition-colors duration-300"
          >
            Subscribe
            <span className="bg-white/10 group-hover:bg-iic-saffron/20 rounded-full w-7 h-7 flex items-center justify-center transition-colors">
              →
            </span>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-stone-400 hover:text-white transition-colors"
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
        <div className="md:hidden border-t border-white/10 bg-[#001a3d] px-6 py-4 flex flex-col gap-1 animate-fade-in">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-sans font-medium text-stone-300 hover:text-white py-2 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/about/contact/"
            className="text-base font-sans font-medium text-stone-300 hover:text-white py-2 transition-colors border-t border-white/10 mt-2 pt-3"
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
