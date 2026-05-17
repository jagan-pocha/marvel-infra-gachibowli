import { motion } from 'framer-motion'

export default function SectionTitle({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  titleClassName = '',
}) {
  const alignClass = {
    center: 'items-center text-center',
    left: 'items-start text-left',
  }[align]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${alignClass} gap-3 ${className}`}
    >
      {badge && (
        <span className="badge badge-gold">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          {badge}
        </span>
      )}

      <h2
        className={`font-display font-semibold leading-tight text-[var(--text-primary)] ${titleClassName}`}
        style={{ fontSize: 'clamp(1.625rem, 3.5vw, 2.5rem)' }}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="max-w-xl text-[var(--text-secondary)] leading-relaxed" style={{ fontSize: '1.0625rem' }}>
          {subtitle}
        </p>
      )}

      <div className={`divider-gold mt-1 ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  )
}
