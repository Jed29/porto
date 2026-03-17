import { useEffect, useRef } from 'react'
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
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax + fade
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

      // Content stagger
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

      // Stats count up
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

  return (
    <section id="about" ref={sectionRef} className="section about-section">
      <div className="container about-grid">
        {/* Image side */}
        <div ref={imageRef} className="about-image-wrap">
          <div className="about-image-frame">
            <div className="about-avatar">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="100" fill="url(#avatar-grad)"/>
                <circle cx="100" cy="80" r="35" fill="rgba(255,255,255,0.15)"/>
                <ellipse cx="100" cy="160" rx="55" ry="40" fill="rgba(255,255,255,0.1)"/>
                <defs>
                  <radialGradient id="avatar-grad" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#f97316"/>
                    <stop offset="100%" stopColor="#7c2d12"/>
                  </radialGradient>
                </defs>
              </svg>
              <span className="avatar-initials">JA</span>
            </div>
          </div>
          <div className="about-image-badge">
            <span>✦</span> Based in Jakarta, Indonesia
          </div>
          <div className="about-image-deco" />
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
            Currently a Software Engineer at PT. Victoria Alife Indonesia, where I lead frontend development for an enterprise insurance management system using Angular and NestJS.
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
