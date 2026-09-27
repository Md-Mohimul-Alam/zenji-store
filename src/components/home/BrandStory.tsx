import { ArrowUpRight } from 'lucide-react'

function BrandStory() {
  return (
    <section
      id="story"
      className="border-t border-white/10 bg-[#0d0d0d] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Section label */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-red-600" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
                02 / Our Story
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-9">
            <h2 className="max-w-5xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
              More than
              <span className="block text-white/25">
                what you wear.
              </span>
            </h2>

            <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2 lg:mt-14">
              <p className="max-w-lg text-base leading-7 text-white/65">
                ZENJI draws inspiration from Japanese visual culture,
                streetwear and storytelling to create pieces designed
                around individuality and self-expression.
              </p>

              <div className="md:justify-self-end">
                <p className="max-w-md text-sm leading-6 text-white/45">
                  Built around limited releases and statement graphics,
                  every drop is designed to feel intentional rather than
                  mass produced.
                </p>

                <a
                  href="#shop"
                  className="group mt-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]"
                >
                  Explore the drop

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative statement */}
        <div className="mt-20 overflow-hidden border-y border-white/10 py-7 lg:mt-28">
          <p
            className="whitespace-nowrap text-center text-[clamp(2.5rem,8vw,8rem)] font-black uppercase leading-none tracking-[-0.06em] text-white/[0.06]"
            aria-hidden="true"
          >
            WEAR YOUR STORY — WEAR YOUR STORY
          </p>
        </div>
      </div>
    </section>
  )
}

export default BrandStory