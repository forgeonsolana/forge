"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image src="/images/forge-logo.png" alt="FORGE Logo" fill className="object-contain" priority />
          </div>
          <span className="text-orange-500 font-pixel text-xl tracking-wider">FORGE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#about" className="nav-link">
            About
          </Link>
          <Link href="/#token" className="nav-link">
            $FORGE
          </Link>
          <Link href="/map" className="nav-link">
            Map
          </Link>
          <Link href="/colosseum" className="nav-link">
            Colosseum
          </Link>
          <Link
            href="https://forge-7.gitbook.io/forgesolana"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Gitbook
          </Link>
          <Link href="https://x.com/forgeonsolana" target="_blank" rel="noopener noreferrer" className="nav-link">
            Follow
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-amber-200 hover:text-orange-400"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-black/95 border-t border-amber-800 py-4 px-6 flex flex-col gap-4">
          <Link href="/#about" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link href="/#token" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>
            $FORGE
          </Link>
          <Link href="/map" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>
            Map
          </Link>
          <Link href="/colosseum" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>
            Colosseum
          </Link>
          <Link
            href="https://forge-7.gitbook.io/forgesolana"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Gitbook
          </Link>
          <Link
            href="https://x.com/forgeonsolana"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Follow
          </Link>
        </nav>
      )}
    </header>
  )
}
