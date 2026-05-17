import { NavLink } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Logo from '../Logo/Logo'

const footerLinks = {
  'Quick Links': [
    { label: 'Home',        to: '/' },
    { label: 'About Project', to: '/about' },
    { label: 'Amenities',  to: '/amenities' },
    { label: 'Floor Plans', to: '/floor-plans' },
    { label: 'Gallery',    to: '/gallery' },
    { label: 'Contact',    to: '/contact' },
  ],
  'Project Info': [
    { label: '3 BHK Residences',     to: '/floor-plans' },
    { label: '1817 – 3675 Sq.Ft',    to: '/floor-plans' },
    { label: '₹10,999 / Sq.Ft',      to: '/floor-plans' },
    { label: '50+ Amenities',         to: '/amenities' },
    { label: 'Expression of Interest', to: '/contact' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook,  href: '#', label: 'Facebook' },
  { icon: Youtube,   href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer
      className="relative mt-auto"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}
    >
      {/* Top section */}
      <div className="container-site pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Logo height={40} />
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
              Gachibowli's emerging landmark — a single-tower premium residential address beside the Gachibowli Flyover, Hyderabad.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full glass text-[var(--text-muted)] hover:text-accent transition-colors duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-[var(--text-muted)] tracking-widest uppercase mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <NavLink
                      to={to}
                      className="text-sm text-[var(--text-secondary)] hover:text-accent transition-colors duration-150 flex items-center gap-1 group"
                    >
                      <span>{label}</span>
                      <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-60 transition-opacity -translate-y-0.5" />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--text-muted)] tracking-widest uppercase mb-4">
              Contact
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a href="tel:+919133311586" className="flex items-start gap-3 group">
                  <span className="mt-0.5 w-7 h-7 flex items-center justify-center rounded-lg glass-gold flex-shrink-0">
                    <Phone size={13} className="text-accent" />
                  </span>
                  <div>
                    <div className="text-xs text-[var(--text-muted)] mb-0.5">Sales Enquiry</div>
                    <div className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-150">
                      +91 91333 11586
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@marvelinfra.com" className="flex items-start gap-3 group">
                  <span className="mt-0.5 w-7 h-7 flex items-center justify-center rounded-lg glass-gold flex-shrink-0">
                    <Mail size={13} className="text-accent" />
                  </span>
                  <div>
                    <div className="text-xs text-[var(--text-muted)] mb-0.5">Email</div>
                    <div className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-150">
                      info@marvelinfra.com
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/7R9GheBDPfRKzwsd8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <span className="mt-0.5 w-7 h-7 flex items-center justify-center rounded-lg glass-gold flex-shrink-0">
                    <MapPin size={13} className="text-accent" />
                  </span>
                  <div>
                    <div className="text-xs text-[var(--text-muted)] mb-0.5">Location</div>
                    <div className="text-sm text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-150 leading-snug">
                      Beside Gachibowli Flyover,<br />Hyderabad, Telangana
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 Marvel Infra. All Rights Reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Marvel Infra Gachibowli — RERA Registration: <span className="text-accent">Applied / Pending</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
