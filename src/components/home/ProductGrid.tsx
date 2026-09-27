import { products } from '../../data/products'
import ProductCard from '../product/ProductCard'

function ProductGrid() {
  return (
    <section
      id="shop"
      className="bg-[#0a0a0a] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-5 border-b border-white/15 pb-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
              01 / Current Release
            </p>

            <h2 className="text-4xl font-black uppercase tracking-[-0.04em] sm:text-5xl lg:text-7xl">
              Shop The Drop
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-6 text-white/45">
            Limited-run pieces. Once they're gone, they're gone.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid