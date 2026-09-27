import { ArrowDownRight } from 'lucide-react'

function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-100px)] overflow-hidden bg-[#080808]">
      {/* Hero image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/zenji-hero.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="h-full w-full object-cover object-center lg:object-[65%_center]"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* Decorative elements */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <p className="absolute right-[-3rem] top-1/2 hidden -translate-y-1/2 rotate-90 text-[9px] font-medium uppercase tracking-[0.5em] text-white/35 lg:block">
          Japanese Streetwear / Limited Release
        </p>

        <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
      </div>

      {/* Hero content */}
      <div className="relative mx-auto flex min-h-[calc(100svh-100px)] max-w-[1440px] flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
        {/* Drop label */}
        <div className="mb-6 flex items-center gap-3">
          <span
            className="h-px w-8 bg-red-600"
            aria-hidden="true"
          />

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-xs">
            The Origin Drop / 01
          </p>
        </div>

        {/* Main heading */}
        <h1 className="font-display max-w-5xl text-[clamp(3.5rem,12vw,11rem)] uppercase leading-[0.82] tracking-[-0.075em]">
          Wear

          <span className="block text-white/35">
            Your
          </span>

          <span className="block">
            Story.
          </span>
        </h1>

        {/* Bottom content */}
        <div className="mt-10 flex flex-col gap-8 border-t border-white/20 pt-6 sm:mt-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="max-w-md text-sm leading-6 text-white/65 sm:text-base">
              Limited-run streetwear inspired by Japanese art,
              anime culture and the stories that shape us.
            </p>

            {/* Responsive metadata */}
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

          {/* CTA */}
          <a
            href="#shop"
            className="group inline-flex min-h-14 w-fit items-center gap-8 bg-white px-7 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            Shop the drop

            <ArrowDownRight
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Decorative drop number */}
        <p
          className="pointer-events-none absolute right-4 top-10 hidden font-display text-[10rem] leading-none text-white/[0.035] lg:block xl:text-[14rem]"
          aria-hidden="true"
        >
          01
        </p>
      </div>
    </section>
  )
}

export default Hero