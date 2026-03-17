import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Preloader.css'

export default function Preloader() {
  const loaderRef = useRef(null)
  const countRef = useRef(null)
  const jedRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const loader = loaderRef.current
    const count = countRef.current
    const jed = jedRef.current
    const line = lineRef.current

    document.body.style.overflow = 'hidden'

    // Set posisi awal JED di bawah sepenuhnya (115% agar tidak bocor ke atas)
    gsap.set(jed, { yPercent: 115 })

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
      }
    })

    // Count up animation
    const obj = { val: 0 }
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        count.textContent = Math.round(obj.val)
      }
    })

    // Line fill
    tl.to(line, {
      scaleX: 1,
      duration: 1.8,
      ease: 'power2.inOut',
    }, '<')

    // Transition: 100 slide up out, JED slide up in (efek bergeser)
    tl.to(count, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power3.inOut',
    })
    tl.to(jed, {
      yPercent: 0,
      duration: 0.6,
      ease: 'power3.inOut',
    }, '<')

    // Slide up exit
    tl.to(loader, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.3,
    })
  }, [])

  return (
    <div ref={loaderRef} className="preloader">
      <div className="preloader-inner">
        <div className="preloader-count-wrap">
          <span className="preloader-count" ref={countRef}>0</span>
          <span className="preloader-jed" ref={jedRef}>JED</span>
        </div>
        <div className="preloader-line-wrap">
          <div className="preloader-line" ref={lineRef} />
        </div>
        <span className="preloader-label">Loading</span>
      </div>
    </div>
  )
}
