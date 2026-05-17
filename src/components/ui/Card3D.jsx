import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Card3D — wraps children in a 3D perspective tilt that tracks mouse position.
 * maxTilt: max degrees of rotation (default 12)
 */
export default function Card3D({
  children,
  className = '',
  maxTilt = 10,
  glowEffect = true,
  autoHeight = false,
  style = {},
}) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width   // 0..1
    const y = (e.clientY - rect.top) / rect.height    // 0..1
    setRotateY((x - 0.5) * maxTilt * 2)
    setRotateX((0.5 - y) * maxTilt * 2)
    setGlowPos({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlowPos({ x: 50, y: 50 })
  }

  return (
    <div
      style={{ perspective: '1000px', ...style }}
      className={className}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.5 }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', overflow: 'hidden' }}
        className={autoHeight ? 'w-full' : 'w-full h-full'}
      >
        {glowEffect && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              pointerEvents: 'none',
              borderRadius: 'inherit',
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(29,237,84,0.12) 0%, transparent 65%)`,
              opacity: Math.sqrt(Math.pow(rotateX / maxTilt, 2) + Math.pow(rotateY / maxTilt, 2)) * 1.2,
            }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 2, height: autoHeight ? 'auto' : '100%' }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}
