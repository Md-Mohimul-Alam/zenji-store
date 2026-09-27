import { useRef } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'

function BrandStory() {
  const shouldReduceMotion = useReducedMotion()
  const imageSectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: imageSectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-8%', '8%'],
  )

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.08, 1, 1.08],
  )

  const overlayY = useTransform(
    scrollYProgress,
    [0, 1],
    [40, -40],
  )

  return (
    <section
      id="story"
      className="relative overflow-hidden border-t border-white/10 bg-[#0d0d0d] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
    >
      {/* Background number */}

      <motion.span
        initial={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 0,
                scale: 0.8,
              }
        }
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute right-[-1rem] top-10 hidden font-display text-[12rem] leading-none text-white/[0.025] lg:block xl:text-[17rem]"
        aria-hidden="true"
      >
        02
      </motion.span>

      <div className="relative mx-auto max-w-[1440px]">
        {/* =====================================
            HEADING
        ====================================== */}

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      x: -30,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-3"
            >
              <motion.span
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scaleX: 0,
                      }
                }
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                }}
                className="h-px w-8 origin-left bg-red-600"
                aria-hidden="true"
              />

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
                02 / Our Story
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-9">
            <h2 className="font-display max-w-5xl text-4xl uppercase leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
              <span className="block overflow-hidden">
                <motion.span
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: '110%',
                          rotateX: -25,
                        }
                  }
                  whileInView={{
                    y: 0,
                    rotateX: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformOrigin: 'bottom',
                  }}
                  className="block"
                >
                  More than
                </motion.span>
              </span>

              <span className="block overflow-hidden text-white/25">
                <motion.span
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: '110%',
                          rotateX: -25,
                        }
                  }
                  whileInView={{
                    y: 0,
                    rotateX: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformOrigin: 'bottom',
                  }}
                  className="block"
                >
                  what you wear.
                </motion.span>
              </span>
            </h2>

            {/* Story text */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 40,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2 lg:mt-14"
            >
              <p className="max-w-lg text-base leading-7 text-white/65">
                ZENJI draws inspiration from Japanese
                visual culture, streetwear and storytelling
                to create pieces designed around
                individuality and self-expression.
              </p>

              <div className="md:justify-self-end">
                <p className="max-w-md text-sm leading-6 text-white/45">
                  Built around limited releases and
                  statement graphics, every drop is
                  designed to feel intentional rather than
                  mass produced.
                </p>

                <motion.a
                  href="#shop"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: 5,
                        }
                  }
                  className="group mt-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Explore the drop

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* =====================================
            CINEMATIC IMAGE
        ====================================== */}

        <motion.div
          ref={imageSectionRef}
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 70,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-20 lg:mt-28"
        >
          {/* Top metadata */}

          <div className="mb-4 flex items-center justify-between text-[8px] font-semibold uppercase tracking-[0.25em] text-white/25">
            <span>
              ZNJ / Visual Archive
            </span>

            <span>
              35.6762° N / 139.6503° E
            </span>
          </div>

          {/* Image frame */}

          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    clipPath:
                      'inset(0 50% 0 50%)',
                  }
            }
            whileInView={{
              clipPath:
                'inset(0 0% 0 0%)',
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="group relative h-[480px] overflow-hidden bg-[#151515] sm:h-[600px] lg:h-[760px]"
          >
            {/* Image */}

            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: imageY,
                      scale: imageScale,
                    }
              }
              className="absolute -inset-[8%]"
            >
              <img
                src="/images/story/zenji-story.webp"
                alt="ZENJI Japanese-inspired streetwear editorial"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center grayscale-[15%] transition-[filter] duration-700 group-hover:grayscale-0"
              />
            </motion.div>

            {/* Overlays */}

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/15 to-transparent"
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"
              aria-hidden="true"
            />

            {/* Red atmospheric light */}

            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: [
                        0.15,
                        0.35,
                        0.15,
                      ],
                      scale: [
                        1,
                        1.15,
                        1,
                      ],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-red-600/20 blur-[120px]"
              aria-hidden="true"
            />

            {/* Vertical text */}

            <p
              className="pointer-events-none absolute right-5 top-6 hidden text-[8px] font-semibold uppercase tracking-[0.45em] text-white/35 [writing-mode:vertical-rl] sm:block"
              aria-hidden="true"
            >
              TOKYO / STREET / CULTURE
            </p>

            {/* Giant Japanese character */}

            <motion.span
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: overlayY,
                    }
              }
              className="pointer-events-none absolute -right-2 bottom-10 text-[8rem] font-black leading-none text-white/[0.07] sm:text-[12rem] lg:text-[16rem]"
              aria-hidden="true"
            >
              禅
            </motion.span>

            {/* Main overlay text */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      x: -50,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.9,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-6 left-5 max-w-2xl sm:bottom-10 sm:left-10 lg:bottom-14 lg:left-14"
            >
              <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.35em] text-red-500">
                Identity / 001
              </p>

              <h3 className="font-display text-4xl uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                Built to
                <span className="block text-white/45">
                  stand apart.
                </span>
              </h3>

              <p className="mt-5 max-w-md text-xs leading-5 text-white/55 sm:text-sm sm:leading-6">
                Inspired by art, culture and the
                individuality behind every story.
              </p>
            </motion.div>

            {/* Corner marks */}

            <span
              className="absolute left-4 top-4 h-6 w-6 border-l border-t border-white/40"
              aria-hidden="true"
            />

            <span
              className="absolute right-4 top-4 h-6 w-6 border-r border-t border-white/40"
              aria-hidden="true"
            />

            <span
              className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-white/40"
              aria-hidden="true"
            />

            <span
              className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-white/40"
              aria-hidden="true"
            />

            {/* Explore indicator */}

            <motion.a
              href="#shop"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.08,
                      rotate: 5,
                    }
              }
              whileTap={{
                scale: 0.94,
              }}
              aria-label="Explore the ZENJI drop"
              className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-md transition-colors hover:bg-white hover:text-black sm:right-10 sm:top-10 sm:h-16 sm:w-16"
            >
              <ArrowDownRight
                size={20}
                strokeWidth={1.4}
                aria-hidden="true"
              />
            </motion.a>
          </motion.div>

          {/* Image footer */}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
            <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white/25">
              ZENJI Visual Study / 01
            </p>

            <div className="flex items-center gap-5 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/25">
              <span>Streetwear</span>

              <span className="h-1 w-1 rounded-full bg-red-600" />

              <span>Anime</span>

              <span className="h-1 w-1 rounded-full bg-red-600" />

              <span>Culture</span>
            </div>
          </div>
        </motion.div>

        {/* =====================================
            MARQUEE
        ====================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 40,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 overflow-hidden border-y border-white/10 py-7 lg:mt-28"
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: ['0%', '-50%'],
                  }
            }
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex w-max"
            aria-hidden="true"
          >
            <p className="shrink-0 whitespace-nowrap pr-12 text-[clamp(2.5rem,8vw,8rem)] font-black uppercase leading-none tracking-[-0.06em] text-white/[0.06]">
              WEAR YOUR STORY — WEAR YOUR STORY —
              WEAR YOUR STORY —
            </p>

            <p className="shrink-0 whitespace-nowrap pr-12 text-[clamp(2.5rem,8vw,8rem)] font-black uppercase leading-none tracking-[-0.06em] text-white/[0.06]">
              WEAR YOUR STORY — WEAR YOUR STORY —
              WEAR YOUR STORY —
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom metadata */}

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                }
          }
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          className="mt-8 flex items-center justify-between text-[8px] font-semibold uppercase tracking-[0.25em] text-white/20"
          aria-hidden="true"
        >
          <span>ZENJI / AU</span>
          <span>EST. 2025</span>
        </motion.div>
      </div>
    </section>
  )
}

export default BrandStory