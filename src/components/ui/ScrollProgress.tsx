import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'

function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  })

  return (
    <div
      className="pointer-events-none fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center"
      aria-hidden="true"
    >
      {/* Top label */}

      <span className="mb-4 text-[7px] font-bold uppercase tracking-[0.3em] text-white/25 [writing-mode:vertical-rl]">
        Scroll
      </span>

      {/* Track */}

      <div className="relative h-28 w-px overflow-hidden bg-white/10">
        <motion.div
          style={
            shouldReduceMotion
              ? {
                  scaleY: scrollYProgress,
                }
              : {
                  scaleY,
                }
          }
          className="absolute inset-0 origin-top bg-white"
        />

        {/* Red progress accent */}

        <motion.div
          style={
            shouldReduceMotion
              ? {
                  scaleY: scrollYProgress,
                }
              : {
                  scaleY,
                }
          }
          className="absolute left-0 top-0 h-full w-px origin-top bg-red-600 blur-[2px]"
        />
      </div>

      {/* Dot */}

      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8],
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mt-4 h-1.5 w-1.5 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
      />

      {/* Brand */}

      <span className="mt-4 text-[7px] font-bold uppercase tracking-[0.3em] text-white/20 [writing-mode:vertical-rl]">
        ZNJ
      </span>
    </div>
  )
}

export default ScrollProgress