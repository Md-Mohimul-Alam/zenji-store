import {
  Package,
  Ruler,
  ShieldCheck,
  Truck,
} from 'lucide-react'

const features = [
  {
    icon: Package,
    number: '01',
    title: '240GSM',
    description: 'Heavyweight cotton',
  },
  {
    icon: Ruler,
    number: '02',
    title: 'Oversized Fit',
    description: 'Built for relaxed layering',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: 'Limited Drop',
    description: 'Small runs. No restocks.',
  },
  {
    icon: Truck,
    number: '04',
    title: 'AU Shipping',
    description: 'Free shipping over A$100',
  },
]

function FeatureStrip() {
  return (
    <section
      id="about"
      className="border-y border-white/10 bg-[#0a0a0a]"
      aria-label="Product features"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon

          return (
            <div
              key={feature.title}
              className={`relative min-h-52 p-6 sm:p-8 ${
                index !== features.length - 1
                  ? 'border-b border-white/10 lg:border-b-0 lg:border-r'
                  : ''
              } ${
                index === 0
                  ? 'sm:border-r sm:border-white/10'
                  : ''
              } ${
                index === 1
                  ? 'sm:border-b sm:border-white/10 lg:border-b-0'
                  : ''
              } ${
                index === 2
                  ? 'sm:border-r sm:border-white/10'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <Icon
                  size={24}
                  strokeWidth={1.25}
                  className="text-white/70"
                  aria-hidden="true"
                />

                <span className="text-[9px] font-semibold tracking-[0.2em] text-white/25">
                  {feature.number}
                </span>
              </div>

              <div className="mt-16">
                <h3 className="text-lg font-bold uppercase tracking-[0.05em]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm text-white/40">
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FeatureStrip