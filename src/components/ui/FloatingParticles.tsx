import { motion, useReducedMotion } from 'motion/react'

const particles = [
  { left: '8%', top: '18%', size: 3, delay: 0, duration: 5 },
  { left: '17%', top: '72%', size: 2, delay: 1.1, duration: 7 },
  { left: '27%', top: '35%', size: 4, delay: 0.6, duration: 6 },
  { left: '39%', top: '82%', size: 2, delay: 2, duration: 5.5 },
  { left: '48%', top: '14%', size: 3, delay: 1.4, duration: 6.5 },
  { left: '58%', top: '67%', size: 2, delay: 0.4, duration: 7.5 },
  { left: '69%', top: '24%', size: 4, delay: 1.8, duration: 6 },
  { left: '78%', top: '78%', size: 2, delay: 0.8, duration: 5 },
  { left: '88%', top: '38%', size: 3, delay: 2.3, duration: 7 },
  { left: '94%', top: '63%', size: 2, delay: 1.2, duration: 6 },
  { left: '12%', top: '47%', size: 2, delay: 2.6, duration: 8 },
  { left: '84%', top: '12%', size: 2, delay: 0.3, duration: 5.8 },
]

function FloatingParticles() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
          }}
          animate={
            shouldReduceMotion
              ? {
                  opacity: 0.25,
                }
              : {
                  y: [0, -30, 8, -18, 0],
                  x: [0, 10, -7, 5, 0],
                  opacity: [0.1, 0.7, 0.25, 0.6, 0.1],
                  scale: [1, 1.6, 0.8, 1.3, 1],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full bg-white"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            boxShadow:
              index % 3 === 0
                ? '0 0 14px rgba(220,38,38,0.8)'
                : '0 0 10px rgba(255,255,255,0.5)',
          }}
        />
      ))}

      {/* Floating red fragments */}

      <motion.span
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -20, 0],
                rotate: [35, 75, 35],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-[20%] top-[25%] h-[1px] w-10 bg-red-600/40"
      />

      <motion.span
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, 25, 0],
                rotate: [-25, -65, -25],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-[18%] top-[62%] h-[1px] w-14 bg-red-600/30"
      />
    </div>
  )
}

export default FloatingParticles