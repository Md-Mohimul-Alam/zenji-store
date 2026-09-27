import { useState } from 'react'
import { ImageOff } from 'lucide-react'

interface ProductImageProps {
  src: string
  alt: string
}

function ProductImage({
  src,
  alt,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  if (hasError) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center bg-[#151515] text-white/25"
        role="img"
        aria-label={`${alt} image unavailable`}
      >
        <ImageOff
          size={28}
          strokeWidth={1}
          aria-hidden="true"
        />

        <span className="mt-3 text-[9px] font-semibold uppercase tracking-[0.2em]">
          Image unavailable
        </span>
      </div>
    )
  }

  return (
    <>
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse bg-[#151515]"
          aria-hidden="true"
        />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  )
}

export default ProductImage