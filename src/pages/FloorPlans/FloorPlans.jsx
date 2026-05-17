import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Download, Maximize2, Layers, Home, Check, Phone, Eye, X } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import SectionTitle from '../../components/ui/SectionTitle'
import Card3D from '../../components/ui/Card3D'

const units = [
  {
    id: 'standard',
    label: '3 BHK — Standard',
    tag: 'Best Value',
    sqft: 1817,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    price: 1817 * 10999,
    features: ['Master Bedroom with Walk-in Closet', 'Open Plan Living & Dining', 'Modular Kitchen', '2 Covered Balconies', 'Premium Tile Flooring'],
    gradient: 'linear-gradient(135deg, rgba(29,237,84,0.15) 0%, rgba(201,150,10,0.05) 100%)',
  },
  {
    id: 'premium',
    label: '3 BHK — Premium',
    tag: 'Most Popular',
    sqft: 2400,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    price: 2400 * 10999,
    features: ['Larger Master Bedroom Suite', 'Open Plan Living & Dining', 'Spacious Modular Kitchen', '3 Private Balconies', 'Imported Marble Flooring'],
    gradient: 'linear-gradient(135deg, rgba(29,237,84,0.20) 0%, rgba(29,237,84,0.08) 100%)',
  },
  {
    id: 'grand',
    label: '3 BHK — Grand',
    tag: 'Luxury',
    sqft: 3675,
    bedrooms: 3,
    bathrooms: 4,
    balconies: 3,
    price: 3675 * 10999,
    features: ['Expansive Living Spaces', 'Private Study / Home Office', 'Chef\'s Kitchen with Island', '3 Wrap-Around Balconies', 'Premium Hardwood Flooring'],
    gradient: 'linear-gradient(135deg, rgba(29,237,84,0.25) 0%, rgba(29,237,84,0.10) 100%)',
  },
]

function formatPrice(p) {
  const cr = p / 10000000
  return `₹${cr.toFixed(2)} Cr`
}

function PriceCalculator() {
  const [sqft, setSqft] = useState(2000)
  const price = sqft * 10999

  return (
    <GlassCard className="p-6 lg:p-8" variant="gold">
      <h3 className="font-display font-semibold text-[var(--text-primary)] text-xl mb-1">Price Calculator</h3>
      <p className="text-sm text-[var(--text-muted)] mb-6">Estimate your investment at ₹10,999 per sq.ft</p>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-[var(--text-secondary)]">Unit Size</label>
          <span className="text-sm font-bold text-accent">{sqft.toLocaleString()} Sq.Ft</span>
        </div>
        <input
          type="range"
          min={1817}
          max={3675}
          step={1}
          value={sqft}
          onChange={e => setSqft(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${((sqft - 1817) / (3675 - 1817)) * 100}%, var(--border-subtle) ${((sqft - 1817) / (3675 - 1817)) * 100}%, var(--border-subtle) 100%)`,
            outline: 'none',
          }}
        />
        <div className="flex justify-between mt-1.5 text-xs text-[var(--text-muted)]">
          <span>1,817 Sq.Ft</span>
          <span>3,675 Sq.Ft</span>
        </div>
      </div>

      <div
        className="rounded-xl p-5 mb-5 text-center"
        style={{ background: 'rgba(29,237,84,0.08)', border: '1px solid var(--border-gold)' }}
      >
        <div className="text-xs text-[var(--text-muted)] mb-1 uppercase tracking-widest">Estimated Price</div>
        <div className="font-display font-bold text-accent text-3xl">{formatPrice(price)}</div>
        <div className="text-xs text-[var(--text-muted)] mt-1">
          {sqft.toLocaleString()} × ₹10,999 = ₹{price.toLocaleString()}
        </div>
      </div>

      <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
        * Estimated indicative pricing. Final pricing subject to unit selection, floor premium, and GST. Contact our team for exact quotes.
      </p>
      <Link to="/contact" className="btn-gold w-full justify-center">
        Get Exact Pricing <ArrowRight size={15} />
      </Link>
    </GlassCard>
  )
}

const isMobile = () => window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)

export default function FloorPlans() {
  const [selected, setSelected]      = useState('premium')
  const [previewOpen, setPreviewOpen] = useState(false)
  const unit = units.find(u => u.id === selected)

  const handlePreview = () => {
    if (isMobile()) {
      // Mobile: open in new tab so native PDF viewer handles zoom
      window.open('/floorplans.pdf', '_blank')
    } else {
      setPreviewOpen(true)
    }
  }

  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(29,237,84,0.07) 0%, transparent 60%)' }} />
        <div className="container-site relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="badge badge-gold mb-4 inline-flex mx-auto">Floor Plans</span>
            <h1
              className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Choose Your{' '}
              <span className="text-gold-gradient">Perfect Home</span>
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              Three distinct 3 BHK configurations from 1,817 to 3,675 Sq.Ft — each designed for spacious modern living at ₹10,999/sq.ft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Unit Type Tabs */}
      <section className="section-y">
        <div className="container-site">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {units.map(u => (
              <motion.button
                key={u.id}
                onClick={() => setSelected(u.id)}
                whileTap={{ scale: 0.97 }}
                className={`relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selected === u.id ? 'text-white' : 'text-[var(--text-secondary)] glass hover:text-[var(--text-primary)]'
                }`}
                style={selected === u.id ? { background: 'var(--gold-gradient)', boxShadow: 'var(--glow-gold)' } : {}}
              >
                {u.id === selected && (
                  <motion.span
                    layoutId="unit-tab"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'var(--gold-gradient)' }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{u.label}</span>
                {u.tag && (
                  <span className={`relative z-10 ml-2 text-xs px-2 py-0.5 rounded-full ${
                    selected === u.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[rgba(29,237,84,0.12)] text-accent'
                  }`}>
                    {u.tag}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Unit detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-8 items-start"
            >
              {/* Left — floor plan visual */}
              <Card3D maxTilt={6} className="rounded-2xl">
                <div
                  className="rounded-2xl p-8 lg:p-12 flex flex-col items-center justify-center min-h-64 relative overflow-hidden"
                  style={{
                    background: unit.gradient,
                    border: '1px solid var(--border-gold)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  {/* Decorative floor plan lines */}
                  <svg viewBox="0 0 320 200" className="w-full max-w-sm opacity-60" fill="none">
                    <rect x="20" y="20" width="280" height="160" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
                    <rect x="20" y="20" width="100" height="90" rx="2" stroke="currentColor" strokeWidth="1" className="text-accent" strokeDasharray="4 2" />
                    <rect x="120" y="20" width="90" height="90" rx="2" stroke="currentColor" strokeWidth="1" className="text-accent" strokeDasharray="4 2" />
                    <rect x="210" y="20" width="90" height="90" rx="2" stroke="currentColor" strokeWidth="1" className="text-accent" strokeDasharray="4 2" />
                    <rect x="20" y="110" width="180" height="70" rx="2" stroke="currentColor" strokeWidth="1" className="text-accent" strokeDasharray="4 2" />
                    <rect x="200" y="110" width="100" height="70" rx="2" stroke="currentColor" strokeWidth="1" className="text-accent" strokeDasharray="4 2" />
                    <text x="55" y="62" fontSize="9" fill="currentColor" className="text-accent" textAnchor="middle">Bedroom 1</text>
                    <text x="162" y="62" fontSize="9" fill="currentColor" className="text-accent" textAnchor="middle">Bedroom 2</text>
                    <text x="252" y="62" fontSize="9" fill="currentColor" className="text-accent" textAnchor="middle">Bedroom 3</text>
                    <text x="108" y="148" fontSize="9" fill="currentColor" className="text-accent" textAnchor="middle">Living &amp; Dining</text>
                    <text x="248" y="148" fontSize="9" fill="currentColor" className="text-accent" textAnchor="middle">Kitchen</text>
                  </svg>
                  <div className="mt-3 text-xs text-[var(--text-muted)] text-center">
                    Indicative layout — actual floor plan may vary
                  </div>

                  {/* Preview + Download */}
                  <div className="mt-5 flex items-center gap-3">
                    <motion.button
                      type="button"
                      onClick={handlePreview}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
                      style={{ background: 'var(--gold-gradient)', color: '#000e4b', boxShadow: 'var(--glow-gold)' }}
                    >
                      <Eye size={14} />
                      Preview PDF
                    </motion.button>

                    <a
                      href="/floorplans.pdf"
                      download
                      className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-accent transition-colors duration-150"
                    >
                      <Download size={14} />
                      Download
                    </a>
                  </div>
                </div>
              </Card3D>

              {/* Right — specs */}
              <div>
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-display font-bold text-[var(--text-primary)] text-2xl">{unit.label}</h2>
                    <span className="badge badge-gold">{unit.tag}</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-accent mb-1">{formatPrice(unit.price)}</div>
                  <div className="text-sm text-[var(--text-muted)]">Approx. at ₹10,999/sq.ft</div>
                </div>

                {/* Quick specs */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { icon: Maximize2, label: 'Area',      value: `${unit.sqft.toLocaleString()} Sq.Ft` },
                    { icon: Home,      label: 'Bedrooms',  value: unit.bedrooms },
                    { icon: Layers,    label: 'Bathrooms', value: unit.bathrooms },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="glass-gold rounded-xl p-3 text-center">
                      <Icon size={16} className="text-accent mx-auto mb-1" />
                      <div className="font-bold text-[var(--text-primary)] text-sm">{value}</div>
                      <div className="text-xs text-[var(--text-muted)]">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">Unit Features</h3>
                  <ul className="space-y-2.5">
                    {unit.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check size={15} className="text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--text-secondary)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-gold">
                    Register Interest <ArrowRight size={15} />
                  </Link>
                  <a href="tel:+919133311586" className="btn-ghost">
                    <Phone size={15} /> Call Us
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="section-y-sm" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <SectionTitle
                badge="Pricing"
                title="Transparent, Competitive Pricing"
                subtitle="At ₹10,999 per sq.ft., Marvel Infra Gachibowli offers exceptional value in one of Hyderabad's most sought-after locations."
                align="left"
              />
              <ul className="mt-6 space-y-3">
                {[
                  '3 BHK Standard — 1,817 Sq.Ft — Approx. ₹1.99 Cr',
                  '3 BHK Premium — 2,400 Sq.Ft — Approx. ₹2.64 Cr',
                  '3 BHK Grand — 3,675 Sq.Ft — Approx. ₹4.04 Cr',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <PriceCalculator />
          </div>
        </div>
      </section>

      {/* ── PDF Preview Modal ── */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
            onClick={() => setPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{   scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.18, duration: 0.35 }}
              className="relative w-full rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-gold)',
                height: 'calc(100vh - 2rem)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-5 py-3 border-b flex-shrink-0"
                style={{ borderColor: 'var(--border-subtle)' }}>
                <div>
                  <h3 className="font-display font-semibold text-[var(--text-primary)] text-base">
                    Floor Plans — Marvel Infra Gachibowli
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    3 BHK · 1,817 – 3,675 Sq.Ft · ₹10,999/Sq.Ft
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/floorplans.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-150"
                    style={{ background: 'var(--accent-tint)', color: 'var(--accent)', border: '1px solid var(--border-gold)' }}
                  >
                    <Eye size={12} />
                    Open in Tab
                  </a>
                  <a
                    href="/floorplans.pdf"
                    download
                    className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-accent transition-colors px-2 py-1.5"
                  >
                    <Download size={12} />
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-colors"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* PDF iframe — fills all remaining height */}
              <div className="flex-1 min-h-0">
                <iframe
                  src="/floorplans.pdf#toolbar=0&navpanes=0&scrollbar=1"
                  className="w-full h-full border-0 block"
                  title="Marvel Infra Gachibowli Floor Plans"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
