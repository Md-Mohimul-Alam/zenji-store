import {
  useRef,
  type MouseEvent,
} from 'react'
import {
  Package,
  Ruler,
  ShieldCheck,
  Truck,
  ArrowUpRight,
} from 'lucide-react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'

const features = [
  {
    icon: Package,
    number: '01',
    japanese: '重量',
    title: '240GSM',
    description:
      'Heavyweight cotton engineered for structure, comfort and everyday wear.',
  },
  {
    icon: Ruler,
    number: '02',
    japanese: '形状',
    title: 'Oversized Fit',
    description:
      'Relaxed proportions designed for effortless layering and streetwear silhouettes.',
  },
  {
    icon: ShieldCheck,
    number: '03',
    japanese: '限定',
    title: 'Limited Drop',
    description:
      'Produced in small quantities. When the drop disappears, it does not return.',
  },
  {
    icon: Truck,
    number: '04',
    japanese: '配送',
    title: 'AU Shipping',
    description:
      'Complimentary Australian shipping when your order reaches A$100.',
  },
]

interface FeatureCardProps {
  feature: (typeof features)[number]
  index: number
}

function FeatureCard({
  feature,
  index,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rawRotateX = useTransform(
    mouseY,
    [0, 1],
    [7, -7],
  )

  const rawRotateY = useTransform(
    mouseX,
    [0, 1],
    [-7, 7],
  )

  const rotateX = useSpring(rawRotateX, {
    stiffness: 180,
    damping: 20,
    mass: 0.5,
  })

  const rotateY = useSpring(rawRotateY, {
    stiffness: 180,
    damping: 20,
    mass: 0.5,
  })

  const glowX = useTransform(
    mouseX,
    [0, 1],
    ['0%', '100%'],
  )

  const glowY = useTransform(
    mouseY,
    [0, 1],
    ['0%', '100%'],
  )

  const handleMouseMove = (
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

    mouseX.set(
      (event.clientX - rect.left) / rect.width,
    )

    mouseY.set(
      (event.clientY - rect.top) / rect.height,
    )
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  const Icon = feature.icon

  return (
    <div
      className="relative"
      style={{
        perspective: '1200px',
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 0,
                y: 70,
                scale: 0.92,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={
          shouldReduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        className="group relative h-full min-h-[360px] overflow-hidden border border-white/10 bg-[#0d0d0d] p-6 sm:p-8"
      >
        {/* =========================
            MOUSE FOLLOW SPOTLIGHT
        ========================== */}

        {!shouldReduceMotion && (
          <motion.div
            style={{
              left: glowX,
              top: glowY,
            }}
            className="pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07] opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
        )}

        {/* =========================
            RED AMBIENT GLOW
        ========================== */}

        <div
          className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-red-600/[0.06] blur-[70px] transition-all duration-700 group-hover:bg-red-600/[0.13]"
          aria-hidden="true"
        />

        {/* =========================
            TOP RED LINE
        ========================== */}

        <motion.div
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2 + index * 0.1,
          }}
          className="absolute left-0 top-0 h-[2px] w-full origin-left bg-red-600"
          aria-hidden="true"
        />

        {/* =========================
            HUGE BACKGROUND NUMBER
        ========================== */}

        <motion.span
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  x: 40,
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
            duration: 1,
            delay: 0.25 + index * 0.08,
          }}
          className="pointer-events-none absolute -bottom-6 -right-2 font-display text-[9rem] leading-none text-white/[0.025] transition-all duration-700 group-hover:-translate-y-4 group-hover:text-white/[0.06]"
          aria-hidden="true"
        >
          {feature.number}
        </motion.span>

        {/* =========================
            JAPANESE BACKGROUND TEXT
        ========================== */}

        <motion.span
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.5 + index * 0.1,
            duration: 0.8,
          }}
          className="pointer-events-none absolute right-5 top-16 text-6xl font-black text-white/[0.025] transition-all duration-500 group-hover:text-red-500/[0.08]"
          aria-hidden="true"
        >
          {feature.japanese}
        </motion.span>

        {/* =========================
            CONTENT
        ========================== */}

        <div
          className="relative z-10 flex h-full flex-col"
          style={{
            transform: 'translateZ(30px)',
          }}
        >
          {/* Top */}

          <div className="flex items-start justify-between">
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: -8,
                      scale: 1.12,
                  }
              }
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 18,
              }}
              className="flex h-12 w-12 items-center justify-center border border-white/15 bg-white/[0.025] transition-colors duration-300 group-hover:border-red-600/50 group-hover:bg-red-600/10"
            >
              <Icon
                size={21}
                strokeWidth={1.3}
                className="text-white/65 transition-colors duration-300 group-hover:text-white"
                aria-hidden="true"
              />
            </motion.div>

            <div className="text-right">
              <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white/25">
                Detail
              </p>

              <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-white/55">
                {feature.number}
              </p>
            </div>
          </div>

          {/* Center Japanese label */}

          <motion.p
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 10,
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
              delay: 0.35 + index * 0.1,
              duration: 0.6,
            }}
            className="mt-12 text-[10px] font-semibold uppercase tracking-[0.35em] text-red-500/70"
          >
            {feature.japanese} / ZENJI
          </motion.p>

          {/* Bottom content */}

          <div className="mt-auto pt-8">
            <div className="overflow-hidden">
              <motion.h3
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
                  duration: 0.7,
                  delay: 0.2 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-xl font-bold uppercase tracking-[0.03em] sm:text-2xl"
              >
                {feature.title}
              </motion.h3>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/40 transition-colors duration-300 group-hover:text-white/60">
              {feature.description}
            </p>

            {/* Bottom line */}

            <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white/25">
                ZNJ / {feature.number}
              </span>

              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 3,
                        y: -3,
                    }
                }
                className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/35 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white"
              >
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* =========================
            BOTTOM HOVER GLOW LINE
        ========================== */}

        <span
          className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-white transition-all duration-700 group-hover:w-full"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  )
}

function FeatureStrip() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#080808] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      aria-label="Product features"
    >
      {/* =====================================
          BACKGROUND GRID
      ====================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* =====================================
          RED BACKGROUND GLOW
      ====================================== */}

      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.55, 0.3],
            }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.035] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px]">
        {/* =====================================
            SECTION HEADING
        ====================================== */}

        <div className="mb-12 grid gap-8 border-b border-white/10 pb-8 lg:mb-16 lg:grid-cols-12">
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
            }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-red-600" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                03 / Details
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-9">
            <div className="overflow-hidden">
              <motion.h2
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: '110%',
                        rotateX: -20,
                    }
                }
                whileInView={{
                  y: 0,
                  rotateX: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: 'bottom',
                }}
                className="font-display text-4xl uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
              >
                Built Different.
              </motion.h2>
            </div>

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="mt-5 max-w-lg text-sm leading-6 text-white/40"
            >
              Every detail is intentional. From heavyweight
              fabric to limited production, ZENJI pieces are
              designed to stand apart.
            </motion.p>
          </div>
        </div>

        {/* =====================================
            3D FEATURE CARDS
        ====================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* =====================================
            BOTTOM LABEL
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="mt-10 flex items-center justify-between border-t border-white/10 pt-5"
        >
          <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-white/20">
            Designed for expression
          </span>

          <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-white/20">
            ZENJI / 2026
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureStrip