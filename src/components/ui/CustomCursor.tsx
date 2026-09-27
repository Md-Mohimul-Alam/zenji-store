import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react'

function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const cursorX = useSpring(mouseX, {
    stiffness: 700,
    damping: 40,
    mass: 0.2,
  })

  const cursorY = useSpring(mouseY, {
    stiffness: 700,
    damping: 40,
    mass: 0.2,
  })

  const followerX = useSpring(mouseX, {
    stiffness: 120,
    damping: 20,
    mass: 0.7,
  })

  const followerY = useSpring(mouseY, {
    stiffness: 120,
    damping: 20,
    mass: 0.7,
  })

  useEffect(() => {
    const supportsPointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    )

    if (!supportsPointer.matches) {
      return
    }

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)

      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handlePointerOver = (
      event: globalThis.MouseEvent,
    ) => {
      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const interactive = target.closest(
        'a, button, [data-cursor="interactive"]',
      )

      setIsHovering(Boolean(interactive))
    }

    window.addEventListener(
      'mousemove',
      handleMouseMove,
    )

    document.addEventListener(
      'mouseleave',
      handleMouseLeave,
    )

    document.addEventListener(
      'mouseenter',
      handleMouseEnter,
    )

    document.addEventListener(
      'mouseover',
      handlePointerOver,
    )

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove,
      )

      document.removeEventListener(
        'mouseleave',
        handleMouseLeave,
      )

      document.removeEventListener(
        'mouseenter',
        handleMouseEnter,
      )

      document.removeEventListener(
        'mouseover',
        handlePointerOver,
      )
    }
  }, [mouseX, mouseY])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
      aria-hidden="true"
    >
      {/* Soft follower */}
      <motion.div
        style={{
          x: followerX,
          y: followerY,
        }}
        animate={{
          width: isHovering ? 58 : 38,
          height: isHovering ? 58 : 38,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/[0.03] backdrop-blur-[2px]"
      />

      {/* Main cursor */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: isHovering ? 9 : 6,
          height: isHovering ? 9 : 6,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{
          duration: 0.15,
        }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />

      {/* Cursor label */}
      <motion.div
        style={{
          x: followerX,
          y: followerY,
        }}
        animate={{
          opacity:
            isVisible && isHovering ? 1 : 0,
          scale:
            isHovering ? 1 : 0.7,
        }}
        className="absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-white">
          View
        </span>
      </motion.div>
    </div>
  )
}

export default CustomCursor