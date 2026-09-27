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

import FloatingParticles from '../ui/FloatingParticles'

interface DetailProps {
  number: string
  label: string
  value: string
}

function Detail({
  number,
  label,
  value,
}: DetailProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              x: 5,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className="group flex items-center justify-between border-t border-white/10 py-4 last:border-b"
    >
      <div className="flex items-center gap-3">
        <span className="text-[8px] text-white/20">
          {number}
        </span>

        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35 transition-colors duration-300 group-hover:text-white/60">
          {label}
        </span>
      </div>

      <span className="text-xs font-bold uppercase tracking-[0.1em]">
        {value}
      </span>
    </motion.div>
  )
}

function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  /* =========================================
     MOUSE VALUES
  ========================================= */

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const mouseRotateXRaw = useTransform(
    mouseY,
    [0, 1],
    [10, -10],
  )

  const mouseRotateYRaw = useTransform(
    mouseX,
    [0, 1],
    [-14, 14],
  )

  const mouseRotateX = useSpring(
    mouseRotateXRaw,
    {
      stiffness: 160,
      damping: 18,
      mass: 0.5,
    },
  )

  const mouseRotateY = useSpring(
    mouseRotateYRaw,
    {
      stiffness: 160,
      damping: 18,
      mass: 0.5,
    },
  )

  /* =========================================
     SCROLL VALUES
  ========================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const productY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [160, 0, -160],
  )

  const productRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-12, 0, 12],
  )

  const productScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.82, 1, 0.82],
  )

  /* =========================================
     BACKGROUND PARALLAX
  ========================================= */

  const backgroundLeftX = useTransform(
    scrollYProgress,
    [0, 1],
    [-100, 100],
  )

  const backgroundRightX = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100],
  )

  const circleY = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100],
  )

  const detailsY = useTransform(
    scrollYProgress,
    [0, 1],
    [50, -50],
  )

  /* =========================================
     MOUSE HANDLERS
  ========================================= */

  const handleProductMouseMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (
      shouldReduceMotion ||
      !window.matchMedia(
        '(hover: hover) and (pointer: fine)',
      ).matches
    ) {
      return
    }

    const rect =
      event.currentTarget.getBoundingClientRect()

    const normalizedX =
      (event.clientX - rect.left) / rect.width

    const normalizedY =
      (event.clientY - rect.top) / rect.height

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  const handleProductMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[110vh] overflow-hidden border-y border-white/10 bg-[#070707] px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      {/* =====================================
          FLOATING PARTICLES
      ====================================== */}

      <FloatingParticles />

      {/* =====================================
          GRID BACKGROUND
      ====================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }}
        aria-hidden="true"
      />

      {/* =====================================
          RED ATMOSPHERIC GLOW
      ====================================== */}

      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.07] blur-[140px]"
        aria-hidden="true"
      />

      {/* =====================================
          BACKGROUND TYPOGRAPHY
      ====================================== */}

      <div
        className="pointer-events-none absolute inset-0 flex flex-col justify-center overflow-hidden"
        aria-hidden="true"
      >
        <motion.p
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: backgroundLeftX,
                }
          }
          className="whitespace-nowrap font-display text-[clamp(6rem,17vw,17rem)] uppercase leading-[0.75] tracking-[-0.08em] text-white/[0.025]"
        >
          LIMITED LIMITED LIMITED
        </motion.p>

        <motion.p
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: backgroundRightX,
                }
          }
          className="ml-[-10%] whitespace-nowrap font-display text-[clamp(6rem,17vw,17rem)] uppercase leading-[0.75] tracking-[-0.08em] text-white/[0.025]"
        >
          ORIGIN ORIGIN ORIGIN
        </motion.p>
      </div>

      {/* =====================================
          MAIN CONTAINER
      ====================================== */}

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Top label */}

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
              delay: 0.1,
            }}
            className="h-px w-8 origin-left bg-red-600"
            aria-hidden="true"
          />

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
            Featured / 001
          </p>
        </motion.div>

        {/* =================================
            SHOWCASE GRID
        ================================== */}

        <div className="relative mt-14 grid min-h-[750px] items-center lg:grid-cols-12">
          {/* ===============================
              LEFT CONTENT
          ================================ */}

          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: -60,
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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20 lg:col-span-4"
          >
            <motion.p
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 15,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
              className="mb-5 text-[9px] font-bold uppercase tracking-[0.35em] text-red-500"
            >
              The Origin Drop
            </motion.p>

            <h2 className="font-display text-5xl uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl lg:text-[6.5rem]">
              <span className="block overflow-hidden">
                <motion.span
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: '110%',
                        }
                  }
                  whileInView={{
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  Made
                </motion.span>
              </span>

              <span className="block overflow-hidden text-white/25">
                <motion.span
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: '110%',
                        }
                  }
                  whileInView={{
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  To Be
                </motion.span>
              </span>

              <span className="block overflow-hidden">
                <motion.span
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: '110%',
                        }
                  }
                  whileInView={{
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  Seen.
                </motion.span>
              </span>
            </h2>

            <motion.p
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
              className="mt-8 max-w-sm text-sm leading-6 text-white/45"
            >
              Heavyweight construction. Oversized
              proportions. Original artwork. Built as a
              statement rather than another basic tee.
            </motion.p>

            <motion.a
              href="#shop"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: 5,
                    }
              }
              className="group mt-8 inline-flex items-center gap-5 border-b border-white/30 pb-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:border-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Explore collection

              <ArrowDownRight
                size={17}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </motion.a>
          </motion.div>

          {/* ===============================
              CENTER PRODUCT
          ================================ */}

          <div className="relative z-10 my-20 flex min-h-[560px] items-center justify-center lg:col-span-5 lg:my-0">
            {/* Outer animated circle */}

            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: circleY,
                    }
              }
              className="pointer-events-none absolute h-[300px] w-[300px] rounded-full border border-white/10 sm:h-[420px] sm:w-[420px] lg:h-[500px] lg:w-[500px]"
              aria-hidden="true"
            >
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-8 rounded-full border border-dashed border-white/[0.06]"
              />

              <div className="absolute inset-20 rounded-full border border-red-600/10" />

              <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
            </motion.div>

            {/* Red sun */}

            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.08, 1],
                      opacity: [
                        0.65,
                        0.9,
                        0.65,
                      ],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute h-52 w-52 rounded-full bg-red-600/20 blur-[2px] sm:h-72 sm:w-72"
              aria-hidden="true"
            />

            {/* Atmospheric red glow */}

            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [
                        0.9,
                        1.2,
                        0.9,
                      ],
                      opacity: [
                        0.15,
                        0.3,
                        0.15,
                      ],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute h-72 w-72 rounded-full bg-red-600/20 blur-[100px] sm:h-96 sm:w-96"
              aria-hidden="true"
            />

            {/* =================================
                PRODUCT 3D AREA
            ================================== */}

            <div
              onMouseMove={handleProductMouseMove}
              onMouseLeave={handleProductMouseLeave}
              className="relative flex min-h-[500px] min-w-[280px] items-center justify-center sm:min-w-[450px]"
              style={{
                perspective: '1400px',
              }}
            >
              {/* Scroll controlled outer layer */}

              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: productY,
                        rotate: productRotate,
                        scale: productScale,
                      }
                }
                className="relative"
              >
                {/* Mouse controlled 3D layer */}

                <motion.div
                  style={
                    shouldReduceMotion
                      ? undefined
                      : {
                          rotateX:
                            mouseRotateX,
                          rotateY:
                            mouseRotateY,
                          transformStyle:
                            'preserve-3d',
                        }
                  }
                  className="relative w-[270px] sm:w-[360px] lg:w-[430px]"
                >
                  {/* Product shadow */}

                  <div
                    className="pointer-events-none absolute bottom-[-8%] left-1/2 h-20 w-[75%] -translate-x-1/2 rounded-full bg-black/80 blur-2xl"
                    style={{
                      transform:
                        'translateX(-50%) translateZ(-50px)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Product image */}

                  <motion.img
                    src="/images/products/demon-blood.webp"
                    alt="ZENJI Demon Blood oversized graphic tee"
                    loading="lazy"
                    decoding="async"
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
                      duration: 0.9,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    style={{
                      transform:
                        'translateZ(45px)',
                    }}
                    className="relative z-10 w-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.65)]"
                  />

                  {/* Glass highlight */}

                  <div
                    className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent"
                    style={{
                      transform:
                        'translateZ(60px)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Floating product label */}

                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: [
                              -5,
                              5,
                              -5,
                            ],
                          }
                    }
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      transform:
                        'translateZ(80px)',
                    }}
                    className="pointer-events-none absolute -right-5 top-[20%] z-30 hidden border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-md sm:block"
                    aria-hidden="true"
                  >
                    <p className="text-[7px] font-bold uppercase tracking-[0.25em] text-white/35">
                      ZNJ
                    </p>

                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em]">
                      DROP 001
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Japanese decorative typography */}

            <motion.span
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [
                        -8,
                        8,
                        -8,
                      ],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute right-[5%] top-[15%] hidden text-7xl font-black text-white/[0.06] sm:block lg:text-9xl"
              aria-hidden="true"
            >
              限定
            </motion.span>

            {/* Vertical detail */}

            <motion.p
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [
                        0,
                        -12,
                        0,
                      ],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute bottom-[12%] left-[5%] hidden text-[8px] font-semibold uppercase tracking-[0.35em] text-white/20 [writing-mode:vertical-rl] sm:block"
              aria-hidden="true"
            >
              ZENJI / LIMITED RELEASE
            </motion.p>
          </div>

          {/* ===============================
              RIGHT PRODUCT DETAILS
          ================================ */}

          <motion.div
            style={
              shouldReduceMotion
                ? undefined
                : {
                    y: detailsY,
                  }
            }
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: 50,
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
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20 lg:col-span-3 lg:pl-8"
          >
            <p className="mb-7 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/25">
              Product Specification
            </p>

            <div>
              <Detail
                number="01"
                label="Weight"
                value="240 GSM"
              />

              <Detail
                number="02"
                label="Fit"
                value="Oversized"
              />

              <Detail
                number="03"
                label="Release"
                value="Limited"
              />

              <Detail
                number="04"
                label="Sizes"
                value="XS — XXL"
              />
            </div>

            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      x: 20,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
              className="mt-8 border-l border-red-600 pl-4"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-500">
                No Restocks
              </p>

              <p className="mt-2 text-xs leading-5 text-white/35">
                Once the release sells through,
                the design is archived.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* =================================
            BOTTOM META
        ================================== */}

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
          }}
          className="flex items-center justify-between border-t border-white/10 pt-5 text-[8px] font-semibold uppercase tracking-[0.25em] text-white/20"
        >
          <span>
            ZNJ / PRODUCT STUDY
          </span>

          <span>
            DROP 001 / AU
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductShowcase