import type { ProductSize } from '../../types/product'

interface SizeSelectorProps {
  sizes: ProductSize[]
  selectedSize: ProductSize | null
  onSelect: (size: ProductSize) => void
}

function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
        Select size
      </p>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelect(size)}
              aria-pressed={isSelected}
              className={`flex h-10 min-w-10 items-center justify-center border px-3 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                isSelected
                  ? 'border-white bg-white text-black'
                  : 'border-white/20 bg-transparent text-white hover:border-white'
              }`}
            >
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SizeSelector