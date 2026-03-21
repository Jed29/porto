import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '6', label: 'Companies' },
  { value: '2', label: 'Banking Clients' },
]

export default function About() {
  const sectionRef  = useRef(null)
  const imageRef    = useRef(null)
  const contentRef  = useRef(null)
  const statsRef    = useRef(null)
  const cvPaperRef  = useRef(null)
  const cvWrapRef   = useRef(null)

  const [cvOpen, setCvOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      )

      gsap.to('.about-photo', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })

      gsap.fromTo(
        contentRef.current.querySelectorAll('.anim'),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )

      const statEls = statsRef.current.querySelectorAll('.stat-value')
      statEls.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleDownload = (e) => {
    e.preventDefault()

    // 1. Close popup immediately
    setCvOpen(false)

    const el = cvPaperRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const startX = rect.left + rect.width / 2
    const startY = rect.top + rect.height / 2

    // Target: top-right corner (browser download area)
    const deltaX = window.innerWidth - 60 - startX
    const deltaY = 60 - startY

    // Stop CSS animations so GSAP has full control
    el.style.animation = 'none'
    const cvWidget = el.closest('.cv-widget')
    if (cvWidget) cvWidget.style.animation = 'none'

    gsap.killTweensOf(el)

    const tl = gsap.timeline({
      onComplete: () => {
        // Trigger download after animation
        const a = document.createElement('a')
        a.href = '/JedsCv2k26.pdf'
        a.download = 'JedAbner_CV.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

        // Restore CSS animations & reset transforms
        gsap.set(el, { clearProps: 'all' })
        el.style.animation = ''
        if (cvWidget) cvWidget.style.animation = ''
      }
    })

    // Grabbed — scale up + tilt
    tl.to(el, { scale: 1.4, rotate: -20, duration: 0.25, ease: 'back.out(2)' })

    // Bounce hops
    .to(el, { y: -35, duration: 0.2,  ease: 'power2.out' })
    .to(el, { y: 0,   duration: 0.18, ease: 'bounce.out' })
    .to(el, { y: -22, duration: 0.16, ease: 'power2.out' })
    .to(el, { y: 0,   duration: 0.14, ease: 'bounce.out' })
    .to(el, { y: -12, duration: 0.12, ease: 'power2.out' })
    .to(el, { y: 0,   duration: 0.1,  ease: 'bounce.out' })

    // Fly to top-right corner
    .to(el, {
      x: deltaX,
      y: deltaY,
      scale: 0.15,
      rotate: 25,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.in',
    })
  }

  return (
    <section id="about" ref={sectionRef} className="section about-section">
      <div className="container about-grid">
        {/* Image side */}
        <div ref={imageRef} className="about-image-wrap">
          <div className="about-image-frame">
            <img src="/jed.jpg" alt="Jed Abner" className="about-photo" />
          </div>
          <div className="about-image-badge">
            <span>✦</span> Based in Jakarta, Indonesia
          </div>
          <div className="about-image-deco" />

          {/* CV Download Widget */}
          <div
            ref={cvWrapRef}
            className={`cv-widget-wrap ${cvOpen ? 'cv-open' : ''}`}
            onMouseEnter={() => setCvOpen(true)}
            onMouseLeave={() => setCvOpen(false)}
          >
            {/* Backdrop untuk close saat tap di luar (mobile) */}
            {cvOpen && (
              <div
                className="cv-backdrop"
                onClick={() => setCvOpen(false)}
              />
            )}

            <div className="cv-preview-popup">
              <div className="cv-preview-header">
                <span>Jed Abner — CV</span>
                <div className="cv-preview-actions">
                  <button className="cv-preview-dl" onClick={handleDownload}>
                    ↓ Download
                  </button>
                  <button className="cv-preview-close" onClick={() => setCvOpen(false)}>
                    ✕
                  </button>
                </div>
              </div>
              <iframe
                src="/JedsCv2k26.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                className="cv-preview-iframe"
                title="CV Preview"
              />
            </div>

            <div className="cv-widget" onClick={() => setCvOpen(v => !v)}>
              <div ref={cvPaperRef} className="cv-paper">
                <div className="cv-paper-fold" />
                <div className="cv-paper-lines">
                  <span /><span /><span /><span /><span />
                </div>
                <div className="cv-paper-label">CV</div>
              </div>
              <span className="cv-widget-text">{cvOpen ? 'Close' : 'View CV'}</span>
            </div>
          </div>
        </div>

        {/* Content side */}
        <div ref={contentRef} className="about-content">
          <div className="eyebrow anim">About Me</div>
          <h2 className="section-title anim">
            Passionate about <span className="highlight">building</span> things for the web
          </h2>
          <p className="about-text anim">
            I'm a Front End Developer with 4+ years of experience building scalable web applications for banking, media, and enterprise clients. I specialize in translating Figma designs into pixel-perfect, maintainable UIs using React, TypeScript, and Atomic Design principles.
          </p>
          <p className="about-text anim">
            Currently a Software Engineer at PT. Victoria Alife Indonesia, working as a fullstack developer on an enterprise insurance management system using Angular and NestJS.
          </p>

          <div className="about-tags anim">
            {['React', 'TypeScript', 'Angular', 'Next.js', 'Redux', 'SCSS', 'Jotai', 'GraphQL'].map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container">
        <div ref={statsRef} className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
