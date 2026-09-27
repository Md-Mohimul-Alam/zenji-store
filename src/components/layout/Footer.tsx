import {
  ArrowUp,
  ArrowUpRight,
  AtSign,
} from 'lucide-react'
import {
  motion,
  useReducedMotion,
} from 'motion/react'

function Footer() {
  const currentYear = new Date().getFullYear()
  const shouldReduceMotion = useReducedMotion()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion
        ? 'auto'
        : 'smooth',
    })
  }

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] px-4 pb-6 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
      {/* Background atmosphere */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.2, 1],
                opacity: [0.25, 0.5, 0.25],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-red-600/[0.04] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Main footer */}
        <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 50,
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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-6"
          >
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Anime × Streetwear
            </p>

            <div className="overflow-hidden">
              <motion.h2
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
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: 'bottom',
                }}
                className="font-display text-6xl uppercase leading-none tracking-[-0.06em] sm:text-8xl lg:text-9xl"
              >
                Zenji
              </motion.h2>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-6 text-white/45">
              Limited-run streetwear inspired by Japanese
              visual culture, anime and individual
              expression.
            </p>
          </motion.div>

          {/* Footer links */}
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
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:justify-self-end lg:gap-16"
          >
            <div>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                Explore
              </p>

              <div className="flex flex-col gap-3">
                <FooterLink href="#shop">
                  Shop
                </FooterLink>

                <FooterLink href="#story">
                  Our Story
                </FooterLink>

                <FooterLink href="#about">
                  About
                </FooterLink>
              </div>
            </div>

            <div>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                Support
              </p>

              <div className="flex flex-col gap-3 text-sm text-white/45">
                <span>Shipping</span>
                <span>Sizing</span>
                <span>Returns</span>
              </div>
            </div>

            <div>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                Social
              </p>

              <motion.a
                href="https://www.instagram.com/zenji_.shop/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit ZENJI on Instagram"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 4,
                      }
                }
                className="group inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <AtSign
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                Instagram

                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Giant ZENJI typography */}
        <div className="overflow-hidden border-b border-white/10 py-8 sm:py-12">
          <motion.p
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 80,
                    scale: 0.9,
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
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-center text-[clamp(5rem,18vw,18rem)] uppercase leading-[0.75] tracking-[-0.08em] text-white/[0.05]"
            aria-hidden="true"
          >
            ZENJI
          </motion.p>
        </div>

        {/* Bottom row */}
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
            duration: 0.8,
            delay: 0.2,
          }}
          className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-col gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/30 sm:flex-row sm:gap-6">
            <p>
              © {currentYear} ZENJI. All rights reserved.
            </p>

            <p>
              Front-End Hiring Assessment Demo
            </p>
          </div>

          {/* Back to top */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -4,
                  }
            }
            whileTap={{
              scale: 0.94,
            }}
            className="group flex h-11 w-11 items-center justify-center border border-white/15 transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Back to top"
          >
            <ArrowUp
              size={17}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}

/*
 * Small animated footer link.
 */
interface FooterLinkProps {
  href: string
  children: string
}

function FooterLink({
  href,
  children,
}: FooterLinkProps) {
  return (
    <motion.a
      href={href}
      whileHover={{
        x: 4,
      }}
      className="group flex w-fit items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
    >
      <span>{children}</span>

      <span
        className="h-px w-0 bg-white transition-all duration-300 group-hover:w-4"
        aria-hidden="true"
      />
    </motion.a>
  )
}

export default Footer