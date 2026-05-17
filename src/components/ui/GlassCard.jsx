import { motion } from 'framer-motion'

/**
 * GlassCard — glassmorphism card wrapper.
 * variant: 'default' | 'gold' | 'raised'
 */
export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  hover = true,
  animate = true,
  delay = 0,
  style = {},
  ...props
}) {
  const variants = {
    default: 'glass',
    gold: 'glass-gold',
    raised: 'glass',
  }

  const raisedStyle =
    variant === 'raised'
      ? { background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }
      : {}

  const base = `rounded-2xl ${variants[variant]} ${className}`

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        whileHover={hover ? { y: -4, boxShadow: 'var(--shadow-card-hover)' } : undefined}
        className={base}
        style={{ ...raisedStyle, ...style }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={base} style={{ ...raisedStyle, ...style }} {...props}>
      {children}
    </div>
  )
}
