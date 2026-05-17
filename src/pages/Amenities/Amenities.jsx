import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dumbbell, TreePine, Shield, Wifi, Car, Star,
  Baby, Heart, Music, Coffee, Zap, Droplets,
  BookOpen, Users, Sun, Moon, Wind, Flame,
  Bike, Activity, Eye, Home, Leaf, Dog,
} from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import SectionTitle from '../../components/ui/SectionTitle'

const categories = ['All', 'Recreation', 'Wellness', 'Kids & Family', 'Community', 'Utilities & Safety']

const amenities = [
  // Recreation
  { icon: Droplets,  label: 'Swimming Pool',          category: 'Recreation' },
  { icon: Droplets,  label: "Kids' Pool",              category: 'Recreation' },
  { icon: Dumbbell,  label: 'Gymnasium',               category: 'Recreation' },
  { icon: Activity,  label: 'Jogging Track',           category: 'Recreation' },
  { icon: Bike,      label: 'Cycling Track',           category: 'Recreation' },
  { icon: Dumbbell,  label: 'Open Air Gym',            category: 'Recreation' },
  { icon: Star,      label: 'Squash Court',            category: 'Recreation' },
  { icon: Star,      label: 'Basketball Court',        category: 'Recreation' },
  { icon: Star,      label: 'Tennis Court',            category: 'Recreation' },
  { icon: Star,      label: 'Badminton Court',         category: 'Recreation' },
  { icon: Star,      label: 'Cricket Practice Net',    category: 'Recreation' },
  { icon: Activity,  label: 'Reflexology Path',        category: 'Recreation' },

  // Wellness
  { icon: Heart,     label: 'Yoga Deck',               category: 'Wellness' },
  { icon: Moon,      label: 'Meditation Garden',       category: 'Wellness' },
  { icon: Flame,     label: 'Spa & Sauna',             category: 'Wellness' },
  { icon: Wind,      label: 'Steam Room',              category: 'Wellness' },
  { icon: Droplets,  label: 'Jacuzzi',                 category: 'Wellness' },
  { icon: Activity,  label: 'Aerobics Studio',         category: 'Wellness' },

  // Kids & Family
  { icon: Baby,      label: "Kids' Play Area",         category: 'Kids & Family' },
  { icon: Baby,      label: 'Toddler Zone',            category: 'Kids & Family' },
  { icon: Baby,      label: 'Creche / Day Care',       category: 'Kids & Family' },
  { icon: Droplets,  label: 'Splash Pad',              category: 'Kids & Family' },
  { icon: Baby,      label: 'Sandpit Area',            category: 'Kids & Family' },
  { icon: Star,      label: 'Teen Hub',                category: 'Kids & Family' },
  { icon: TreePine,  label: 'Tree House',              category: 'Kids & Family' },
  { icon: Dog,       label: 'Pet Park',                category: 'Kids & Family' },

  // Community
  { icon: Star,      label: 'Grand Clubhouse',         category: 'Community' },
  { icon: Users,     label: 'Multipurpose Hall',       category: 'Community' },
  { icon: Music,     label: 'Party Hall',              category: 'Community' },
  { icon: Music,     label: 'Amphitheater',            category: 'Community' },
  { icon: Eye,       label: 'Sky Lounge',              category: 'Community' },
  { icon: BookOpen,  label: 'Business Center',         category: 'Community' },
  { icon: Wifi,      label: 'Co-Working Space',        category: 'Community' },
  { icon: BookOpen,  label: 'Library & Reading Room',  category: 'Community' },
  { icon: Star,      label: 'Mini Theater',            category: 'Community' },
  { icon: Star,      label: 'Indoor Games Room',       category: 'Community' },
  { icon: Star,      label: 'Billiards Room',          category: 'Community' },
  { icon: Star,      label: 'Table Tennis',            category: 'Community' },
  { icon: Coffee,    label: 'Convenience Store',       category: 'Community' },
  { icon: Users,     label: 'Senior Citizen Lounge',  category: 'Community' },

  // Utilities & Safety
  { icon: Shield,    label: 'CCTV Surveillance 24/7', category: 'Utilities & Safety' },
  { icon: Shield,    label: 'Intercom System',         category: 'Utilities & Safety' },
  { icon: Shield,    label: '24/7 Security',           category: 'Utilities & Safety' },
  { icon: Eye,       label: 'Visitor Management',      category: 'Utilities & Safety' },
  { icon: Zap,       label: 'Power Backup 100%',       category: 'Utilities & Safety' },
  { icon: Car,       label: 'EV Charging Points',      category: 'Utilities & Safety' },
  { icon: Sun,       label: 'Solar Power',             category: 'Utilities & Safety' },
  { icon: Droplets,  label: 'Rainwater Harvesting',   category: 'Utilities & Safety' },
  { icon: Leaf,      label: 'STP Plant',               category: 'Utilities & Safety' },
  { icon: Flame,     label: 'Firefighting System',     category: 'Utilities & Safety' },
  { icon: Home,      label: 'Smart Home Features',     category: 'Utilities & Safety' },
  { icon: Wifi,      label: 'Community Wi-Fi',         category: 'Utilities & Safety' },

  // More landscape (Community / Recreation)
  { icon: TreePine,  label: 'Landscaped Gardens',      category: 'Community' },
  { icon: TreePine,  label: 'Rooftop Garden',          category: 'Community' },
  { icon: Leaf,      label: 'Flower Garden',           category: 'Community' },
  { icon: TreePine,  label: 'Seating Alcoves',         category: 'Community' },
  { icon: Activity,  label: 'Walking Path',            category: 'Community' },
]

export default function Amenities() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? amenities
    : amenities.filter(a => a.category === active)

  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(29,237,84,0.07) 0%, transparent 60%)' }} />
        <div className="container-site relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="badge badge-gold mb-4 inline-flex mx-auto">50+ Amenities</span>
            <h1
              className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Every{' '}
              <span className="text-gold-gradient">Lifestyle Amenity</span>{' '}
              You Can Imagine
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed text-lg">
              Marvel Infra Gachibowli offers 50+ curated amenities spanning wellness, recreation, community, and smart utilities — a complete lifestyle ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-16 z-30 py-4" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-site">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === cat
                    ? 'text-white shadow-[var(--glow-gold)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] glass'
                }`}
                style={active === cat ? { background: 'var(--gold-gradient)' } : {}}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({amenities.filter(a => a.category === cat).length})
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-y">
        <div className="container-site">
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(({ icon: Icon, label, category }, i) => (
                <motion.div
                  key={label}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25, delay: i < 24 ? i * 0.02 : 0 }}
                >
                  <div className="glass-gold rounded-2xl p-4 flex flex-col items-center gap-2.5 text-center group hover:-translate-y-1 transition-transform duration-300 cursor-default h-full">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)' }}>
                      <Icon size={18} className="text-accent" />
                    </div>
                    <span className="text-xs font-medium text-[var(--text-secondary)] leading-snug">{label}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Count */}
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center text-sm text-[var(--text-muted)]"
          >
            Showing <span className="text-accent font-semibold">{filtered.length}</span> of {amenities.length} amenities
          </motion.div>
        </div>
      </section>
    </main>
  )
}
