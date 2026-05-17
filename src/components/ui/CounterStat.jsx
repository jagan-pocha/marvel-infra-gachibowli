import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * CounterStat — animates a number from 0 to `value` when it enters the viewport.
 */
export default function CounterStat({ value, suffix = '', prefix = '', duration = 1800 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = parseFloat(value)
    const startTime = performance.now()

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * eased
      setDisplay(Number.isInteger(end) ? Math.floor(current) : parseFloat(current.toFixed(1)))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}
