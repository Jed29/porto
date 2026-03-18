import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Hero.css'

const roles = ['Front End Developer', 'Software Engineer']

export default function Hero() {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)
  const roleRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    // Animate gradient orbs on mouse move
    const hero = heroRef.current
    const handleMove = (e) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 30
      const y = (clientY / window.innerHeight - 0.5) * 30
      gsap.to(bgRef.current.querySelector('.orb-1'), {
        x: x * 1.5, y: y * 1.5, duration: 1.5, ease: 'power2.out'
      })
      gsap.to(bgRef.current.querySelector('.orb-2'), {
        x: -x, y: -y, duration: 2, ease: 'power2.out'
      })
    }
    hero.addEventListener('mousemove', handleMove)

    // Entrance animation - delayed for preloader
    const tl = gsap.timeline({ delay: 2.1 })

    // Split headline chars
    const headline = headlineRef.current
    const lines = headline.querySelectorAll('.hero-line')
    lines.forEach(line => {
      if (line.classList.contains('hero-line-accent')) return
      const text = line.textContent
      line.innerHTML = text.split('').map(char =>
        char === ' ' ? '<span class="hero-char"> </span>' : `<span class="hero-char">${char}</span>`
      ).join('')
    })

    tl.fromTo('.hero-char',
      { y: 80, opacity: 0, rotateX: -45 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.015,
        ease: 'power4.out',
      }
    )

    tl.fromTo('.hero-line-accent',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' },
      '<0.3'
    )

    tl.fromTo(subRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )

    tl.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    tl.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    )

    // Scroll bounce
    gsap.to(scrollRef.current.querySelector('.scroll-arrow'), {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 0.9,
      ease: 'sine.inOut',
    })

    // Role typing rotation
    let idx = 0
    const rotateRole = () => {
      gsap.to(roleRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          idx = (idx + 1) % roles.length
          roleRef.current.textContent = roles[idx]
          gsap.fromTo(roleRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
          )
        }
      })
    }
    const interval = setInterval(rotateRole, 3000)

    return () => {
      hero.removeEventListener('mousemove', handleMove)
      clearInterval(interval)
    }
  }, [])

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      {/* Background */}
      <div ref={bgRef} className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-grid" />
      </div>

      <div className="container hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Available for work
        </div>

        <h1 ref={headlineRef} className="hero-headline">
          <span className="hero-line">Building Interfaces</span>
          <span className="hero-line hero-line-accent">People Actually</span>
          <span className="hero-line">Love to Use</span>
        </h1>

        <p ref={subRef} className="hero-sub">
          Hi, I'm <strong>Jed</strong> &mdash; a{' '}
          <span ref={roleRef} className="hero-role">{roles[0]}</span>
          <br />who loves building beautiful, performant web applications.
        </p>

        <div ref={ctaRef} className="hero-cta">
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get in Touch
          </button>
        </div>

        {/* Social links */}
        <div className="hero-socials">
          {[
            { name: 'GitHub', href: 'https://github.com/Jed29', icon: <GithubIcon /> },
            { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jeed/', icon: <LinkedinIcon /> },
          ].map(s => (
            <a key={s.name} href={s.href} className="social-link" target="_blank" rel="noreferrer" aria-label={s.name}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

