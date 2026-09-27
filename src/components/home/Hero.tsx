import {
  useRef,
  type MouseEvent,
} from 'react'
import { ArrowDownRight } from 'lucide-react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  /*
   * Mouse parallax values
   */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, {
    stiffness: 70,
    damping: 20,
    mass: 0.8,
  })

  const smoothY = useSpring(mouseY, {
    stiffness: 70,
    damping: 20,
    mass: 0.8,
  })

  /*
   * Scroll-linked animation
   */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const imageScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '12%'],
  )

  const contentScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '22%'],
  )

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, 0],
  )

  const backgroundNumberY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -100],
  )

  const handleMouseMove = (
    event: MouseEvent<HTMLElement>,
  ) => {
    if (
      shouldReduceMotion ||
      !window.matchMedia(
        '(hover: hover) and (pointer: fine)',
      ).matches
    ) {
      return
    }

    const bounds =
      event.currentTarget.getBoundingClientRect()

    const x =
      (event.clientX - bounds.left) /
      bounds.width

    const y =
      (event.clientY - bounds.top) /
      bounds.height

    /*
     * Range approximately -1 → 1
     */
    const normalizedX = (x - 0.5) * 2
    const normalizedY = (y - 0.5) * 2

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  /*
   * Different layers move different amounts,
   * producing the depth effect.
   */
  const imageX = useTransform(
    smoothX,
    [-1, 1],
    [-14, 14],
  )

  const imageY = useTransform(
    smoothY,
    [-1, 1],
    [-10, 10],
  )

  const textX = useTransform(
    smoothX,
    [-1, 1],
    [-4, 4],
  )

  const textY = useTransform(
    smoothY,
    [-1, 1],
    [-3, 3],
  )

  return (
    <motion.section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100svh-100px)] overflow-hidden bg-[#080808]"
    >
      {/* =========================================
          PARALLAX HERO IMAGE
      ========================================== */}
      <motion.div
        className="absolute -inset-5"
        style={
          shouldReduceMotion
            ? undefined
            : {
                x: imageX,
                y: imageScrollY,
              }
        }
      >
        <motion.div
          className="h-full w-full"
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: imageY,
                  scale: 1.06,
                }
          }
        >
          <img
            src="/images/hero/zenji-hero.webp"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="h-full w-full object-cover object-center lg:object-[65%_center]"
          />
        </motion.div>
      </motion.div>

      {/* =========================================
          CINEMATIC OVERLAYS
      ========================================== */}
      <div
        className="pointer-events-none absolute inset-0 bg-black/25"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/10"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30"
        aria-hidden="true"
      />

      {/* Subtle red atmospheric glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-red-600/[0.07] blur-[120px]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================
          DECORATIVE ELEMENTS
      ========================================== */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <p className="absolute right-[-3rem] top-1/2 hidden -translate-y-1/2 rotate-90 text-[9px] font-medium uppercase tracking-[0.5em] text-white/35 lg:block">
          Japanese Streetwear / Limited Release
        </p>

        <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />

        {/* Vertical grid line */}
        <div className="absolute bottom-0 left-[8%] top-0 hidden w-px bg-white/[0.04] lg:block" />

        <div className="absolute bottom-0 right-[8%] top-0 hidden w-px bg-white/[0.04] lg:block" />
      </div>

      {/* =========================================
          GIANT BACKGROUND NUMBER
      ========================================== */}
      <motion.p
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: backgroundNumberY,
              }
        }
        initial={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 0,
                scale: 0.8,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute right-4 top-10 hidden font-display text-[10rem] leading-none text-white/[0.035] lg:block xl:text-[14rem]"
        aria-hidden="true"
      >
        01
      </motion.p>

      {/* =========================================
          MAIN CONTENT
      ========================================== */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: contentScrollY,
                opacity: contentOpacity,
              }
        }
        className="relative mx-auto flex min-h-[calc(100svh-100px)] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16"
      >
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: textX,
                  y: textY,
                }
          }
        >
          {/* Drop label */}
          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: -30,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-6 flex items-center gap-3"
          >
            <motion.span
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      scaleX: 0,
                    }
              }
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              className="h-px w-8 origin-left bg-red-600"
              aria-hidden="true"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-xs">
              The Origin Drop / 01
            </p>
          </motion.div>

          {/* =====================================
              ANIMATED HEADLINE
          ====================================== */}
          <h1 className="font-display max-w-5xl text-[clamp(3.5rem,12vw,11rem)] uppercase leading-[0.82] tracking-[-0.075em]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: '110%',
                        rotateX: -30,
                      }
                }
                animate={{
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: 'bottom',
                }}
              >
                Wear
              </motion.span>
            </span>

            <span className="block overflow-hidden text-white/35">
              <motion.span
                className="block"
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: '110%',
                        rotateX: -30,
                      }
                }
                animate={{
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: 'bottom',
                }}
              >
                Your
              </motion.span>
            </span>

            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: '110%',
                        rotateX: -30,
                      }
                }
                animate={{
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: 'bottom',
                }}
              >
                Story.
              </motion.span>
            </span>
          </h1>

          {/* =====================================
              HERO BOTTOM AREA
          ====================================== */}
          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 30,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 flex flex-col gap-8 border-t border-white/20 pt-6 sm:mt-12 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="max-w-md text-sm leading-6 text-white/65 sm:text-base">
                Limited-run streetwear inspired by
                Japanese art, anime culture and the
                stories that shape us.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
                <span>240GSM</span>

                <span
                  className="h-1 w-1 rounded-full bg-white/30"
                  aria-hidden="true"
                />

                <span>Oversized Fit</span>

                <span
                  className="h-1 w-1 rounded-full bg-white/30"
                  aria-hidden="true"
                />

                <span>No Restock</span>
              </div>
            </div>

            {/* =================================
                ANIMATED CTA
            ================================== */}
            <motion.a
              href="#shop"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -4,
                      scale: 1.025,
                    }
              }
              whileTap={{
                scale: 0.97,
              }}
              className="group relative inline-flex min-h-14 w-fit overflow-hidden bg-white px-7 text-xs font-bold uppercase tracking-[0.2em] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              {/* Hover background */}
              <span
                className="absolute inset-0 translate-y-full bg-red-600 transition-transform duration-300 group-hover:translate-y-0"
                aria-hidden="true"
              />

              <span className="relative z-10 flex items-center gap-8 transition-colors duration-300 group-hover:text-white">
                Shop the drop

                <ArrowDownRight
                  size={18}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* =========================================
          SCROLL INDICATOR
      ========================================== */}
      <motion.div
        initial={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 0,
              }
        }
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.2,
          duration: 0.8,
        }}
        className="pointer-events-none absolute bottom-6 right-5 hidden items-center gap-3 lg:flex lg:right-8"
        aria-hidden="true"
      >
        <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-white/30">
          Scroll
        </span>

        <div className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-white"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [-16, 40],
                  }
            }
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Hero