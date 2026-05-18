import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Phone, ArrowRight, MapPin } from 'lucide-react'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Orb decorations */}
      <div style={{
        position: 'fixed', top: '10%', right: '-5%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,183,251,0.10) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '10%', left: '-5%',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(29,237,84,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="relative z-10 max-w-lg w-full text-center">

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-bold leading-none mb-4 text-gold-gradient select-none"
          style={{ fontSize: 'clamp(6rem, 20vw, 9rem)' }}
        >
          404
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-bold mb-3"
          style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', color: 'var(--text-primary)' }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontSize: '0.975rem' }}
        >
          The page you're looking for doesn't exist or may have moved.
          Let us help you find what you need.
        </motion.p>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="glass-gold rounded-2xl px-6 py-5 mb-8 text-left"
        >
          <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: 'var(--text-muted)' }}>
            Explore the Site
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Floor Plans', to: '/floor-plans' },
              { label: 'Amenities',   to: '/amenities'   },
              { label: 'About Us',    to: '/about'        },
              { label: 'Gallery',     to: '/gallery'      },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(29,237,84,0.06)',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem', fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <ArrowRight size={13} color="var(--accent)" />
                {label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          <Link to="/" className="btn-gold">
            <Home size={15} />
            Back to Home
          </Link>
          <a href="tel:+919133311586" className="btn-ghost">
            <Phone size={15} />
            Call Us
          </a>
        </motion.div>

        {/* Location note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-1.5 text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          <MapPin size={12} color="var(--accent)" />
          Marvel Infra Gachibowli · Beside Gachibowli Flyover, Hyderabad
        </motion.p>
      </div>
    </main>
  )
}
