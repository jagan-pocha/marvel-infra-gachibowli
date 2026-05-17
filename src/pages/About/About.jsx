import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Building2, MapPin, Users, Award, CheckCircle,
  ArrowRight, Phone, Car, Wifi, Shield, TreePine, Star,
} from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import SectionTitle from '../../components/ui/SectionTitle'
import Card3D from '../../components/ui/Card3D'
import CounterStat from '../../components/ui/CounterStat'

const connectivity = [
  { icon: MapPin,    label: 'Gachibowli Flyover', desc: 'Right Beside — the prime landmark address' },
  { icon: Car,       label: 'Outer Ring Road (ORR)', desc: 'Just 200 metres away for seamless city access' },
  { icon: Wifi,      label: 'IT Hubs & Tech Parks', desc: 'Within 1 KM — walk or quick drive to work' },
  { icon: Shield,    label: 'Schools & Hospitals', desc: 'Top institutions within a 2 KM radius' },
  { icon: TreePine,  label: 'Financial District', desc: 'Minutes away from HITEC City & Financial District' },
  { icon: Building2, label: 'Gachibowli Circle', desc: 'Central landmark connecting all major routes' },
]

const features = [
  'Experience Professional Construction',
  'Strong Safety Standards',
  'Client-Centric Approach',
  'Quality Construction',
  'Transparent Communication',
  'On-Time Delivery',
]

const milestones = [
  { value: 15, suffix: '+', label: 'Years in Real Estate', icon: Award },
  { value: 50, suffix: '+', label: 'Expert Team Members', icon: Users },
  { value: 100, suffix: '+', label: 'Projects Delivered', icon: Building2 },
  { value: 500, suffix: '+', label: 'Happy Homeowners', icon: Star },
]

export default function About() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      {/* Page Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(29,237,84,0.07) 0%, transparent 60%)' }}
        />
        <div className="container-site relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="badge badge-gold mb-4 inline-flex">About the Project</span>
            <h1
              className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Marvel Infra{' '}
              <span className="text-gold-gradient">Gachibowli</span>
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg mb-6">
              Presenting Hyderabad's most anticipated residential address — a single-tower premium development on 1.75 acres beside the Gachibowli Flyover.
            </p>
            <div className="flex gap-3">
              <Link to="/floor-plans" className="btn-gold">
                View Floor Plans <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-ghost">Register Interest</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-y-sm" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {milestones.map(({ value, suffix, label, icon: Icon }, i) => (
              <GlassCard key={label} delay={i * 0.08} className="p-6 text-center" variant="gold">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)' }}>
                  <Icon size={18} className="text-accent" />
                </div>
                <div className="font-display font-bold text-[var(--text-primary)] text-3xl mb-1">
                  <CounterStat value={value} suffix={suffix} />
                </div>
                <div className="text-xs text-[var(--text-muted)] font-medium tracking-wide uppercase">{label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="section-y" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Card3D className="rounded-2xl" maxTilt={7} autoHeight>
              <div className="w-full rounded-2xl overflow-hidden relative">
                <img src="/images/poster.jpg" alt="Marvel Infra Gachibowli Project" className="w-full h-auto block" />
                {/* Floating badge */}
                <div className="absolute top-4 left-4">
                  <span className="badge badge-gold backdrop-blur-md">Single Tower · 1.75 Acres</span>
                </div>
                {/* Bottom glass strip */}
                <div className="absolute bottom-0 left-0 right-0 glass px-5 py-4 rounded-b-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest">Starting from</div>
                      <div className="font-display font-bold text-accent text-xl">₹10,999/Sq.Ft</div>
                    </div>
                    <Link to="/contact" className="btn-gold text-sm !py-2 !px-4">EOI Open</Link>
                  </div>
                </div>
              </div>
            </Card3D>

            <div>
              <SectionTitle
                badge="Project Overview"
                title="Your Next Home. Your Defining Address."
                align="left"
              />
              <div className="mt-6 space-y-4">
                {[
                  { label: 'Project Type', value: 'Single Tower Residential' },
                  { label: 'Land Area', value: '1.75 Acres' },
                  { label: 'Configurations', value: '3 BHK Premium Residences' },
                  { label: 'Unit Sizes', value: '1817 – 3675 Sq.Ft' },
                  { label: 'Price', value: '₹10,999 / Sq.Ft' },
                  { label: 'Location', value: 'Beside Gachibowli Flyover, Hyderabad' },
                  { label: 'Amenities', value: '50+ Curated Lifestyle Amenities' },
                  { label: 'Status', value: 'Expression of Interest Open' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3 py-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                    <span className="text-sm text-[var(--text-muted)] font-medium w-40 flex-shrink-0">{label}</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connectivity */}
      <section className="section-y" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-site">
          <SectionTitle
            badge="Location & Connectivity"
            title="At the Heart of Hyderabad's Growth Corridor"
            subtitle="Every key destination — work, school, healthcare, and leisure — is within easy reach from your new home."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectivity.map(({ icon: Icon, label, desc }, i) => (
              <GlassCard key={label} delay={i * 0.07} className="p-5" variant="raised">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)' }}>
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)] text-sm mb-1">{label}</div>
                    <div className="text-sm text-[var(--text-secondary)] leading-snug">{desc}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Developer */}
      <section className="section-y" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionTitle
                badge="About Marvel Infra"
                title="Built on Trust. Delivered with Excellence."
                align="left"
              />
              <p className="mt-5 text-[var(--text-secondary)] leading-relaxed mb-4">
                Marvel Infra, led by Sri P. Krishna Reddy, is a trusted developer delivering quality residential and commercial spaces across Hyderabad with over 15 years of expertise.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Every Marvel Infra project reflects a deep commitment to quality craftsmanship, modern design, transparent processes, and timely delivery — values that have earned the trust of 500+ happy homeowners.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-accent flex-shrink-0" />
                    <span className="text-sm text-[var(--text-secondary)]">{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+919133311586" className="btn-gold">
                  <Phone size={15} />
                  +91 91333 11586
                </a>
                <Link to="/contact" className="btn-ghost">Send Enquiry</Link>
              </div>
            </div>
            <GlassCard className="p-8 lg:p-10" variant="gold">
              <div className="text-5xl font-accent font-light text-accent mb-4 leading-none">"</div>
              <p className="text-[var(--text-primary)] text-lg font-accent font-light leading-relaxed mb-6">
                Build Your Dreams with Modern Residential and Commercial Spaces Crafted with Precision and Expertise.
              </p>
              <div className="flex items-center gap-4 pt-5 border-t" style={{ borderColor: 'var(--border-gold)' }}>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-white text-lg flex-shrink-0"
                  style={{ background: 'var(--gold-gradient)' }}
                >
                  P
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-primary)] text-sm">Sri P. Krishna Reddy</div>
                  <div className="text-xs text-[var(--text-muted)]">Founder & Director, Marvel Infra</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </main>
  )
}
