import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react'
import { useEffect, useState } from 'react'

interface IntroLoaderProps {
  onComplete?: () => void
}

function IntroLoader({
  onComplete,
}: IntroLoaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsVisible(false)
      onComplete?.()
      return
    }

    const timer = window.setTimeout(() => {
      setIsVisible(false)
    }, 2400)

    return () => {
      window.clearTimeout(timer)
    }
  }, [shouldReduceMotion, onComplete])

  return (
    <AnimatePresence
      onExitComplete={onComplete}
    >
      {isVisible && (
        <motion.div
          key="zenji-intro"
          className="fixed inset-0 z-[10000] overflow-hidden"
          initial={{
            opacity: 1,
          }}
          exit={{
            pointerEvents: 'none',
          }}
        >
          {/* ================================
              TOP PANEL
          ================================= */}

          <motion.div
            initial={{
              y: 0,
            }}
            exit={{
              y: '-100%',
            }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute left-0 top-0 h-1/2 w-full bg-[#050505]"
          />

          {/* ================================
              BOTTOM PANEL
          ================================= */}

          <motion.div
            initial={{
              y: 0,
            }}
            exit={{
              y: '100%',
            }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute bottom-0 left-0 h-1/2 w-full bg-[#050505]"
          />

          {/* ================================
              CENTER CONTENT
          ================================= */}

          <motion.div
            exit={{
              opacity: 0,
              scale: 1.08,
            }}
            transition={{
              duration: 0.35,
            }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="text-center">
              {/* Small top label */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                }}
                className="mb-5 text-[8px] font-semibold uppercase tracking-[0.45em] text-white/35 sm:text-[9px]"
              >
                Japanese Streetwear
              </motion.p>

              {/* ZENJI */}

              <div className="flex justify-center overflow-hidden">
                {'ZENJI'.split('').map(
                  (letter, index) => (
                    <motion.span
                      key={`${letter}-${index}`}
                      initial={{
                        y: '120%',
                        rotateX: -70,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.75,
                        delay:
                          0.25 + index * 0.07,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      style={{
                        transformOrigin:
                          'bottom',
                      }}
                      className="font-display text-[clamp(4rem,15vw,11rem)] uppercase leading-[0.8] tracking-[-0.08em]"
                    >
                      {letter}
                    </motion.span>
                  ),
                )}
              </div>

              {/* Red line */}

              <motion.div
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.75,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="mx-auto mt-6 h-[2px] w-20 origin-center bg-red-600"
              />

              {/* Tagline */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 12,
                  letterSpacing: '0.1em',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  letterSpacing: '0.4em',
                }}
                transition={{
                  duration: 0.8,
                  delay: 1,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="mt-5 text-[8px] font-semibold uppercase text-white/45 sm:text-[9px]"
              >
                Wear Your Story
              </motion.p>
            </div>
          </motion.div>

          {/* ================================
              CORNER DETAILS
          ================================= */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.7,
            }}
            className="absolute bottom-6 left-6 z-20 hidden text-[7px] font-semibold uppercase tracking-[0.3em] text-white/20 sm:block"
          >
            ZNJ / 001
          </motion.p>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.7,
            }}
            className="absolute bottom-6 right-6 z-20 hidden text-[7px] font-semibold uppercase tracking-[0.3em] text-white/20 sm:block"
          >
            AU / Limited Release
          </motion.p>

          {/* ================================
              LOADING PROGRESS
          ================================= */}

          <div className="absolute bottom-0 left-0 z-20 h-[2px] w-full bg-white/[0.05]">
            <motion.div
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 2.1,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="h-full w-full origin-left bg-red-600"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroLoader