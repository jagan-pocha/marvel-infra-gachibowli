import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Building2, MapPin, Layers, Star,
  Clock, Users, CheckCircle, ChevronRight, Wifi, Shield,
  TreePine, Dumbbell, Car, Zap,
} from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import SectionTitle from '../../components/ui/SectionTitle'
import Card3D from '../../components/ui/Card3D'
import CounterStat from '../../components/ui/CounterStat'

/* ─── Data ─── */
const stats = [
  { icon: Clock,    value: 15,  suffix: '+', label: 'Years Experience' },
  { icon: Users,    value: 50,  suffix: '+', label: 'Expert Team' },
  { icon: Building2,value: 100, suffix: '+', label: 'Projects Delivered' },
  { icon: Star,     value: 4.9, suffix: '',  label: 'Customer Rating' },
]

const highlights = [
  {
    icon: Building2,
    title: 'Single Tower',
    value: '1.75 Acres',
    desc: 'Thoughtfully designed residential address on 1.75 acres in the heart of Gachibowli.',
    color: '#C9960A',
  },
  {
    icon: Layers,
    title: '3 BHK Residences',
    value: '1817 – 3675 Sq.Ft',
    desc: 'Spacious 3 BHK homes designed for modern living with premium finishes throughout.',
    color: '#9D7209',
  },
  {
    icon: Star,
    title: 'Starting Price',
    value: '₹10,999/sq.ft',
    desc: 'Competitive pricing at ₹10,999 per sq.ft. Expression of Interest open — secure priority now.',
    color: '#C9960A',
  },
  {
    icon: TreePine,
    title: 'Lifestyle Amenities',
    value: '50+ Curated',
    desc: 'Over 50 thoughtfully planned lifestyle amenities for wellness, recreation, and community.',
    color: '#9D7209',
  },
]

const locationHighlights = [
  { icon: MapPin,   label: 'Gachibowli Flyover',   desc: 'Right beside',       color: 'rgba(29,237,84,0.15)' },
  { icon: Car,      label: 'Outer Ring Road',        desc: '200 Metres away',    color: 'rgba(29,237,84,0.12)' },
  { icon: Wifi,     label: 'IT Hubs & Tech Parks',   desc: 'Within 1 KM',        color: 'rgba(29,237,84,0.10)' },
  { icon: Shield,   label: 'Schools & Hospitals',    desc: 'Within 2 KM',        color: 'rgba(29,237,84,0.12)' },
  { icon: Zap,      label: 'Financial District',     desc: 'Minutes away',       color: 'rgba(29,237,84,0.10)' },
  { icon: Building2,label: 'Gachibowli Circle',      desc: 'Prime landmark',     color: 'rgba(29,237,84,0.15)' },
]

const amenityPreviews = [
  { icon: Dumbbell, label: 'Gymnasium & Fitness' },
  { icon: TreePine, label: 'Landscaped Gardens' },
  { icon: Shield,   label: '24/7 Security' },
  { icon: Wifi,     label: 'Community Wi-Fi' },
  { icon: Car,      label: 'EV Charging Points' },
  { icon: Star,     label: 'Grand Clubhouse' },
]

/* ─── Page ─── */
const START_SEC = 45
const END_SEC   = 120

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth < 768
}

export default function Home() {
  const heroRef    = useRef(null)
  const ytDivRef   = useRef(null)
  const playerRef  = useRef(null)
  const isMobile   = useRef(isMobileDevice())
  const [videoReady, setVideoReady] = useState(isMobile.current) // mobile: skip cover immediately

  useEffect(() => {
    if (isMobile.current) return // skip YouTube on mobile — use animated orb background

    let checkInterval = null

    function onReady(e) {
      e.target.mute()
      e.target.playVideo()
      const iframe = e.target.getIframe()
      if (iframe) {
        iframe.style.pointerEvents = 'none'
        iframe.style.userSelect    = 'none'
        iframe.setAttribute('tabindex', '-1')
        iframe.setAttribute('aria-hidden', 'true')
      }
      // Fade out the loading cover once video is actually playing
      setTimeout(() => setVideoReady(true), 600)
    }

    function onStateChange(e) {
      // When segment ends (state ENDED=0), loop back to start
      if (e.data === 0) {
        e.target.seekTo(START_SEC, true)
        e.target.playVideo()
      }
    }

    function initPlayer() {
      if (!ytDivRef.current) return
      playerRef.current = new window.YT.Player(ytDivRef.current, {
        videoId: 'Ge8WnXCPyLs',
        playerVars: {
          autoplay: 1, mute: 1, controls: 0,
          start: START_SEC, end: END_SEC,
          loop: 0, showinfo: 0, rel: 0,
          disablekb: 1, iv_load_policy: 3,
          modestbranding: 1, playsinline: 1, fs: 0,
          vq: 'hd2160',
        },
        events: { onReady, onStateChange },
      })

      // Polling fallback — in case onStateChange fires late
      checkInterval = setInterval(() => {
        const p = playerRef.current
        if (p?.getCurrentTime && p.getCurrentTime() >= END_SEC) {
          p.seekTo(START_SEC, true)
        }
      }, 300)
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      clearInterval(checkInterval)
      playerRef.current?.destroy?.()
    }
  }, [])

  return (
    <main className="w-full overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: '#020814' }}
      >
        {/* Mobile image background */}
        {isMobile.current && (
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <img
              src="/images/High-Rise-Gated-Community-Project.jpg"
              alt=""
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(2,8,20,0.18) 0%, rgba(2,8,20,0.08) 40%, rgba(2,8,20,0.60) 100%)',
            }} />
          </div>
        )}

        {/* ── Animated orb background (desktop only) ── */}
        {!isMobile.current && <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>

          {/* Orb 1 — sky blue, top-left */}
          <div style={{
            position: 'absolute', top: '-10%', left: '-8%',
            width: '650px', height: '650px', borderRadius: '50%',
            background: 'radial-gradient(circle, #00b7fb 0%, transparent 70%)',
            opacity: 0.28, filter: 'blur(72px)',
            animation: 'orb1 12s ease-in-out infinite',
          }} />

          {/* Orb 2 — parrot green, top-right */}
          <div style={{
            position: 'absolute', top: '5%', right: '-10%',
            width: '580px', height: '580px', borderRadius: '50%',
            background: 'radial-gradient(circle, #1ded54 0%, transparent 70%)',
            opacity: 0.22, filter: 'blur(80px)',
            animation: 'orb2 15s ease-in-out infinite',
          }} />

          {/* Orb 3 — teal mix, center */}
          <div style={{
            position: 'absolute', top: '35%', left: '35%',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, #00d4cc 0%, transparent 70%)',
            opacity: 0.14, filter: 'blur(90px)',
            animation: 'orb3 18s ease-in-out infinite',
          }} />

          {/* Orb 4 — deep blue, bottom-left */}
          <div style={{
            position: 'absolute', bottom: '-5%', left: '20%',
            width: '480px', height: '480px', borderRadius: '50%',
            background: 'radial-gradient(circle, #0066ff 0%, transparent 70%)',
            opacity: 0.18, filter: 'blur(80px)',
            animation: 'orb4 20s ease-in-out infinite',
          }} />

          {/* Dot grid overlay — subtle architectural depth */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

          {/* Vignette — darker at edges for text clarity */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2,8,20,0.75) 100%)',
          }} />

          {/* Bottom fade so content sections connect smoothly */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px',
            background: 'linear-gradient(to bottom, transparent, #020814)',
          }} />
        </div>}

        {/* YouTube player — 0:45 → 2:00 loop (desktop only) */}
        {!isMobile.current && (
          <div className="absolute inset-0" style={{ zIndex: 1, overflow: 'hidden' }}>
            {/* YT API replaces this div with an iframe */}
            <div ref={ytDivRef} style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '100vw', height: '56.25vw',
              minHeight: '100%', minWidth: '177.78vh',
              transform: 'translate(-50%, -50%) scale(1.05)',
              pointerEvents: 'none',
            }} />
          </div>
        )}

        {/* Loading cover — hides YouTube's initial play button until video starts */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: '#020814',
          opacity: videoReady ? 0 : 1,
          transition: 'opacity 1.2s ease',
          pointerEvents: 'none',
        }} />

        {/* ── Absorbs ALL pointer events so the iframe never sees hover/click ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4,
          background: 'transparent', pointerEvents: 'all', cursor: 'default',
        }} />

        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.65) 100%)',
        }} />

        {/* Content */}
        <motion.div
          className="relative z-20 container-site text-center py-32"
        >
          {/* EOI Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <span className="badge badge-gold text-xs tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
              Expression of Interest Now Open
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-tight mb-2"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)', color: '#fff' }}
          >
            Build Your{' '}
            <span className="text-gold-shimmer">Dreams</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl mx-auto mb-2 leading-relaxed font-medium"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: 'rgba(255,255,255,0.90)' }}
          >
            Marvel Infra Gachibowli — Gachibowli's Emerging Landmark
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-lg mx-auto mb-3 leading-relaxed"
            style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)' }}
          >
            A thoughtfully designed premium residential address right beside the Gachibowli Flyover — redefining luxury living in Hyderabad's prime IT corridor.
          </motion.p>

          {/* Price tag */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-accent font-semibold text-sm tracking-wide mb-8"
          >
            Starting at ₹10,999/sq.ft &nbsp;·&nbsp; 3 BHK &nbsp;·&nbsp; 1817 – 3675 Sq.Ft
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-3 justify-center mb-16"
          >
            <Link to="/floor-plans" className="btn-gold">
              Explore Floor Plans
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Register Interest
            </Link>
          </motion.div>

          {/* Floating 3 glass info cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: 'Configuration', value: '3 BHK', sub: 'Premium residences' },
              { label: 'Area Range', value: '1817–3675', sub: 'Sq.Ft per unit' },
              { label: 'Limited Units', value: 'EOI Open', sub: 'Secure your priority' },
            ].map((item, i) => (
              <Card3D key={i} className="glass-gold rounded-2xl">
                <div className="px-5 py-4 text-center">
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-1 font-semibold">{item.label}</div>
                  <div className="font-display font-semibold text-accent text-xl mb-0.5">{item.value}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{item.sub}</div>
                </div>
              </Card3D>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[var(--text-muted)] text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="w-0.5 h-8 rounded-full"
            style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="section-y-sm" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ icon: Icon, value, suffix, label }, i) => (
              <GlassCard key={label} delay={i * 0.08} className="p-6 text-center" variant="gold">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)' }}
                >
                  <Icon size={18} className="text-accent" />
                </motion.div>
                <div
                  className="font-display font-bold text-[var(--text-primary)] mb-1"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                >
                  <CounterStat value={value} suffix={suffix} />
                </div>
                <div className="text-xs text-[var(--text-muted)] font-medium tracking-wide uppercase">{label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECT HIGHLIGHTS ─── */}
      <section className="section-y" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-site">
          <SectionTitle
            badge="Project Highlights"
            title="Everything You Deserve, Right Here"
            subtitle="Marvel Infra Gachibowli delivers a landmark living experience crafted with precision — where modern design meets strategic location."
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map(({ icon: Icon, title, value, desc, color }, i) => (
              <GlassCard key={title} delay={i * 0.1} className="p-6 relative overflow-hidden group" variant="raised">
                {/* Background accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-8 translate-x-8 transition-transform duration-500 group-hover:scale-150"
                  style={{ background: `radial-gradient(circle, rgba(29,237,84,0.10) 0%, transparent 70%)` }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)' }}
                >
                  <Icon size={20} className="text-accent" />
                </div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-1 font-semibold">{title}</div>
                <div className="font-display font-bold text-accent text-xl mb-2 leading-tight">{value}</div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCATION ─── */}
      <section className="section-y relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        {/* Decorative orb */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(29,237,84,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <div className="container-site relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Text side */}
            <div>
              <SectionTitle
                badge="Strategic Location"
                title="Where Every Destination is Minutes Away"
                subtitle="Positioned beside the Gachibowli Flyover, Marvel Infra Gachibowli places you at the epicenter of Hyderabad's most vibrant corridor."
                align="left"
              />

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {locationHighlights.map(({ icon: Icon, label, desc }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.07, duration: 0.45 }}
                    className="flex items-start gap-3 p-3 rounded-xl glass hover:bg-[var(--glass-bg-hover)] transition-all duration-200"
                  >
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)' }}>
                      <Icon size={14} className="text-accent" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{label}</div>
                      <div className="text-xs text-accent font-medium mt-0.5">{desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <a
                  href="https://maps.app.goo.gl/7R9GheBDPfRKzwsd8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost inline-flex"
                >
                  <MapPin size={16} />
                  View on Map
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            </div>

            {/* 3D card side */}
            <Card3D className="rounded-2xl" maxTilt={8} autoHeight>
              <div className="w-full rounded-2xl overflow-hidden relative">
                <img
                  src="/images/poster.jpg"
                  alt="Gachibowli project"
                  className="w-full h-auto block"
                />
                {/* Location overlay card */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-gold rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-accent flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-primary)]">Beside Gachibowli Flyover</div>
                        <div className="text-xs text-[var(--text-muted)]">Gachibowli, Hyderabad, Telangana</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* ─── AMENITIES PREVIEW ─── */}
      <section className="section-y" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-site">
          <SectionTitle
            badge="Lifestyle Amenities"
            title="50+ Curated Lifestyle Experiences"
            subtitle="Every detail of Marvel Infra Gachibowli is designed to elevate your everyday — from wellness to recreation, community to convenience."
          />

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {amenityPreviews.map(({ icon: Icon, label }, i) => (
              <GlassCard
                key={label}
                delay={i * 0.07}
                className="p-5 flex flex-col items-center gap-3 text-center group"
                variant="gold"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)' }}>
                  <Icon size={22} className="text-accent" />
                </div>
                <span className="text-xs font-medium text-[var(--text-secondary)] leading-snug">{label}</span>
              </GlassCard>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/amenities" className="btn-ghost inline-flex">
              View All 50+ Amenities
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DEVELOPER STRIP ─── */}
      <section className="section-y-sm" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="glass-gold rounded-2xl p-8 lg:p-12 text-center max-w-3xl mx-auto"
          >
            <div className="badge badge-gold mx-auto mb-4">About the Developer</div>
            <h3 className="font-display font-semibold text-[var(--text-primary)] mb-3" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
              Marvel Infra — 15+ Years of Trusted Excellence
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Led by Sri P. Krishna Reddy, Marvel Infra delivers quality residential and commercial spaces with precision,
              integrity, and a deep commitment to customer satisfaction. Over 100 projects delivered across Hyderabad.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {['Quality Craftsmanship', 'Timely Delivery', 'Transparent Process', 'Modern Design'].map(f => (
                <span key={f} className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                  <CheckCircle size={14} className="text-accent flex-shrink-0" />
                  {f}
                </span>
              ))}
            </div>
            <Link to="/about" className="btn-gold">
              Learn More About Marvel Infra
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="relative section-y overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(29,237,84,0.06) 0%, transparent 70%)' }}
        />
        <div className="container-site relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2
              className="font-display font-bold text-[var(--text-primary)] mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Secure Your Priority Unit Today
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-8 leading-relaxed">
              Limited units available. Register your Expression of Interest now for early pricing advantage and priority unit selection.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-gold">
                Register Expression of Interest
                <ArrowRight size={16} />
              </Link>
              <a href="tel:+919133311586" className="btn-ghost">
                Call: +91 91333 11586
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
