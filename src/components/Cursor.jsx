import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const dot = dotRef.current
    const ringEl = ringRef.current

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    const onEnter = () => {
      dot.classList.add('hover')
      ringEl.classList.add('hover')
    }

    const onLeave = () => {
      dot.classList.remove('hover')
      ringEl.classList.remove('hover')
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12)
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    const links = document.querySelectorAll('a, button, .btn, [data-cursor]')
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
