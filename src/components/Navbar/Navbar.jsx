import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Phone } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { to: '/',            label: 'Home' },
  { to: '/about',       label: 'About' },
  { to: '/amenities',   label: 'Amenities' },
  { to: '/floor-plans', label: 'Floor Plans' },
  { to: '/gallery',     label: 'Gallery' },
  { to: '/contact',     label: 'Contact' },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100"
        style={{
          background: '#FFFFFF',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <NavLink to="/" aria-label="Marvel Infra Home" className="flex-shrink-0">
              <img
                src="/images/logo.jpg"
                alt="Marvel Infra"
                style={{ height: '2.8rem', width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                      isActive
                        ? 'text-accent'
                        : 'text-[#2a4a8a] hover:text-[#000e4b]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-full pointer-events-none"
                          style={{
                            background: 'var(--accent-tint)',
                            border: '1px solid var(--border-gold)',
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2 flex-shrink-0">

              {/* Phone — desktop only */}
              <a
                href="tel:+919133311586"
                className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-[#2a4a8a] hover:text-accent transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-[rgba(0,183,251,0.08)]"
              >
                <Phone size={14} strokeWidth={2} />
                <span>+91 91333 11586</span>
              </a>

              {/* Theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-[#2a4a8a] hover:text-accent hover:border-[var(--border-gold)] hover:bg-[rgba(0,183,251,0.08)] transition-all duration-200"
                aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* CTA — desktop only */}
              <NavLink
                to="/contact"
                className="hidden lg:flex btn-gold text-sm !py-2 !px-5"
              >
                Register Interest
              </NavLink>

              {/* Hamburger — mobile only */}
              <button
                type="button"
                onClick={() => setMobileOpen(o => !o)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-[#2a4a8a] hover:text-accent transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 z-40 rounded-2xl overflow-hidden border border-[var(--border-gold)] shadow-[var(--shadow-card)]"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-150 ${
                      isActive
                        ? 'text-accent bg-[var(--accent-tint)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-tint)]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] flex flex-col gap-2">
                <a
                  href="tel:+919133311586"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-secondary)]"
                >
                  <Phone size={14} />
                  +91 91333 11586
                </a>
                <NavLink to="/contact" className="btn-gold text-center text-sm !py-2.5">
                  Register Interest
                </NavLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
