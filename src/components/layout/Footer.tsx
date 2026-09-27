import { ArrowUpRight, AtSign } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0a0a] px-4 pb-6 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Main footer */}
        <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-6">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Anime × Streetwear
            </p>

            <h2 className="font-display text-6xl uppercase leading-none tracking-[-0.06em] sm:text-8xl lg:text-9xl">
              Zenji
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-6 text-white/45">
              Limited-run streetwear inspired by Japanese
              visual culture, anime and individual
              expression.
            </p>
          </div>

          {/* Footer navigation */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:justify-self-end lg:gap-16">
            {/* Explore */}
            <div>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                Explore
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="#shop"
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  Shop
                </a>

                <a
                  href="#story"
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  Our Story
                </a>

                <a
                  href="#about"
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  About
                </a>
              </div>
            </div>

            {/* Support */}
            <div>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                Support
              </p>

              <div className="flex flex-col gap-3 text-sm text-white/65">
                <span>Shipping</span>
                <span>Sizing</span>
                <span>Returns</span>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                Social
              </p>

              <a
                href="https://www.instagram.com/zenji_.shop/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit ZENJI on Instagram"
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
              </a>
            </div>
          </div>
        </div>

        {/* Decorative branding */}
        <div className="overflow-hidden border-b border-white/10 py-8 sm:py-12">
          <p
            className="font-display text-center text-[clamp(5rem,18vw,18rem)] uppercase leading-[0.75] tracking-[-0.08em] text-white/[0.05]"
            aria-hidden="true"
          >
            ZENJI
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-4 pt-6 text-[9px] font-medium uppercase tracking-[0.18em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} ZENJI. All rights reserved.
          </p>

          <p>
            Front-End Hiring Assessment Demo
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer