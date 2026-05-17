import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

const categories = ['All', 'Exterior', 'Interior', 'Amenities', 'Location']

// Gallery items — poster.jpg is our real image; others are styled placeholder divs
const galleryItems = [
  {
    id: 1,
    src: '/images/poster.jpg',
    title: 'Marvel Infra Gachibowli — Tower View',
    category: 'Exterior',
    isReal: true,
  },
  { id: 2,  src: null, title: 'Grand Lobby',                category: 'Interior',  bg: 'linear-gradient(135deg,#1a1a2e,#16213e)' },
  { id: 3,  src: null, title: 'Master Bedroom Suite',       category: 'Interior',  bg: 'linear-gradient(135deg,#0d0d1a,#1c1c2e)' },
  { id: 4,  src: null, title: 'Modern Kitchen',             category: 'Interior',  bg: 'linear-gradient(135deg,#14141e,#1e1e30)' },
  { id: 5,  src: null, title: 'Living & Dining Space',      category: 'Interior',  bg: 'linear-gradient(135deg,#12121c,#1a1a28)' },
  { id: 6,  src: null, title: 'Swimming Pool Area',         category: 'Amenities', bg: 'linear-gradient(135deg,#0e1a2e,#1a2e42)' },
  { id: 7,  src: null, title: 'Grand Clubhouse',            category: 'Amenities', bg: 'linear-gradient(135deg,#1a120e,#2e1a0e)' },
  { id: 8,  src: null, title: 'Landscaped Gardens',         category: 'Amenities', bg: 'linear-gradient(135deg,#0e1a0e,#1a2e1a)' },
  { id: 9,  src: null, title: 'Gymnasium',                  category: 'Amenities', bg: 'linear-gradient(135deg,#1a0e1a,#2e1a2e)' },
  { id: 10, src: null, title: 'Gachibowli Flyover',         category: 'Location',  bg: 'linear-gradient(135deg,#1a1410,#2e241a)' },
  { id: 11, src: null, title: 'IT Hub Proximity',           category: 'Location',  bg: 'linear-gradient(135deg,#0e141a,#1a2028)' },
  { id: 12, src: null, title: 'ORR Connectivity',           category: 'Location',  bg: 'linear-gradient(135deg,#141a14,#202e20)' },
]

function PlaceholderImage({ item, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      style={{
        background: item.bg || 'var(--surface)',
        border: '1px solid var(--border-subtle)',
        aspectRatio: '4/3',
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: item.bg }}
      >
        <div className="text-center p-6">
          <div
            className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
            style={{ background: 'rgba(29,237,84,0.15)', border: '1px solid rgba(29,237,84,0.30)' }}
          >
            <ZoomIn size={20} style={{ color: '#1ded54' }} />
          </div>
          <div className="text-sm font-medium text-white/80">{item.title}</div>
          <div className="text-xs text-white/40 mt-1">{item.category}</div>
          <div className="text-xs text-white/30 mt-2 italic">Render coming soon</div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
        <ZoomIn size={24} className="text-white" />
      </div>
    </motion.div>
  )
}

function RealImage({ item, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-2xl cursor-pointer group"
      style={{ border: '1px solid var(--border-gold)' }}
    >
      <img
        src={item.src}
        alt={item.title}
        className="w-full h-auto block transition-opacity duration-300"
      />
      <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div>
          <div className="text-white font-medium text-sm">{item.title}</div>
          <div className="text-white/60 text-xs">{item.category}</div>
        </div>
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <ZoomIn size={14} className="text-white" />
        </div>
      </div>
    </motion.div>
  )
}

function Lightbox({ item, items, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.15 }}
          className="relative max-w-4xl w-full"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute -top-10 right-0 text-white/60 hover:text-white">
            <X size={24} />
          </button>

          {item.isReal ? (
            <img src={item.src} alt={item.title} className="w-full rounded-2xl max-h-[75vh] object-contain" />
          ) : (
            <div
              className="w-full rounded-2xl flex items-center justify-center"
              style={{ background: item.bg, aspectRatio: '4/3' }}
            >
              <div className="text-center text-white/60 p-8">
                <div className="text-6xl mb-4 font-accent font-light">Render</div>
                <div className="text-xl font-medium text-white/80">{item.title}</div>
                <div className="text-sm mt-2">Coming soon</div>
              </div>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-white font-medium">{item.title}</div>
              <div className="text-white/50 text-sm">{item.category}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={onPrev} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={onNext} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxItem, setLightboxItem] = useState(null)

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeCategory)

  const lightboxIndex = lightboxItem ? filtered.findIndex(i => i.id === lightboxItem.id) : -1

  const openLightbox = (item) => setLightboxItem(item)
  const closeLightbox = () => setLightboxItem(null)
  const prevItem = () => setLightboxItem(filtered[(lightboxIndex - 1 + filtered.length) % filtered.length])
  const nextItem = () => setLightboxItem(filtered[(lightboxIndex + 1) % filtered.length])

  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(29,237,84,0.07) 0%, transparent 60%)' }} />
        <div className="container-site relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-gold mb-4 inline-flex mx-auto">Gallery</span>
            <h1
              className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              A Glimpse of{' '}
              <span className="text-gold-gradient">Your Future Home</span>
            </h1>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
              Explore the vision behind Marvel Infra Gachibowli — from architectural exteriors to curated interiors and world-class amenities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-16 z-30 py-4" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-site">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] glass'
                }`}
                style={activeCategory === cat ? { background: 'var(--gold-gradient)' } : {}}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-y">
        <div className="container-site">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i < 9 ? i * 0.04 : 0 }}
                >
                  {item.isReal
                    ? <RealImage item={item} onClick={() => openLightbox(item)} />
                    : <PlaceholderImage item={item} onClick={() => openLightbox(item)} />
                  }
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-10 text-center">
            <div className="glass-gold rounded-xl p-6 max-w-md mx-auto">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                High-resolution renders and construction progress photos will be added as the project progresses.
                Register your interest to receive updates directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          items={filtered}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </main>
  )
}
