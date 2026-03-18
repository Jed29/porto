import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    id: 1,
    company: 'PT. Victoria Alife Indonesia',
    role: 'Software Engineer',
    desc: 'Developed enterprise insurance management system covering product administration, underwriting, and claims processing. Led frontend with responsive dashboards and real-time analytics used by multiple departments.',
    tags: ['Angular', 'NestJS', 'MongoDB', 'REST API'],
    color: '#fca5a5',
    bg: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
    logo: 'https://www.victorialife.co.id/wp-content/uploads/2022/01/New-Logo-Victoria-Life-white.png',
    period: 'Apr 2025 – Now',
  },
  {
    id: 2,
    company: 'PT. Infosys Solusi Terpadu',
    role: 'Front End Developer',
    desc: 'Implemented Micro Frontend architecture with Module Federation. Applied Atomic Design with SCSS for consistent and maintainable UI. Projects: IBB Victoria, IBB Bank JATIM.',
    tags: ['React', 'TypeScript', 'Jotai', 'Module Federation', 'SCSS'],
    color: '#fed7aa',
    bg: 'linear-gradient(135deg, #c2410c 0%, #7c2d12 100%)',
    logo: 'https://ist.id/wp-content/uploads/2024/02/ist-logo.png',
    period: 'Des 2023 – Apr 2025',
  },
  {
    id: 3,
    company: 'PT. Platinumetrix Global Inovasi',
    role: 'Front End Developer',
    desc: 'Focused on designing and building web admin interfaces. Project: GoMamam Brunei Darussalam — food delivery platform serving the Brunei market.',
    tags: ['React', 'Redux', 'JavaScript'],
    color: '#bfdbfe',
    bg: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
    logo: 'https://pgi-data.com/wp-content/uploads/2025/05/2_PGI_Master_Logo_Reverse_Full_Color_RGB-removebg-preview-1.webp',
    period: 'Jan 2024 – Des 2024',
  },
  {
    id: 4,
    company: 'PT. Indivara Sejahtera Sukses Makmur',
    role: 'Front End Developer',
    desc: 'Developed admin and client-facing web apps. Validated user input, fixed bugs, and created reusable components. Projects: WMS UOB Bank, Beams (real-time + Socket.io), Rambla.',
    tags: ['React', 'Redux', 'Jest', 'Socket.io', 'JavaScript'],
    color: '#bbf7d0',
    bg: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
    logo: 'https://indivaragroup.com/wp-content/uploads/2022/11/indivara-logo-negative-180x47-1.png',
    period: 'Mar 2023 – Des 2023',
  },
  {
    id: 5,
    company: 'PT. Asian Sigma Technology',
    role: 'Front End Developer',
    desc: 'Worked on RCTI+ (PT. Media Nusantara Citra) mobile web. Integrated Google Analytics 360 & CONVIVA tracker, connected ads, and sliced UI from Figma for live TV and event pages.',
    tags: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Redux'],
    color: '#fb923c',
    bg: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
    rainbow: 'linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #6366f1)',
    logo: 'https://dev.sigma-tech.co.id/static/media/logo-sigma.1e3c0382.png',
    period: 'Sep 2022 – Mar 2023',
  },
  {
    id: 6,
    company: 'PT. Ifabula Digital Kreasi',
    role: 'Front End Developer',
    desc: 'Built web interfaces and reusable components for enterprise clients. Projects: iProposeYou (Generali), Seva (Astra). Also mentored students on React at Ifabula Academy.',
    tags: ['React', 'Redux', 'TypeScript', 'JavaScript'],
    color: '#bfdbfe',
    bg: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
    logo: 'https://ifabula.com/_next/static/media/ifabula.a740a1d3.svg',
    period: 'Sep 2021 – Sep 2022',
  },
]

export default function Experience() {
  const sectionRef  = useRef(null)
  const pinRef      = useRef(null)
  const stackRef    = useRef(null)
  const cardRefs    = useRef([])
  const counterRef  = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current
      const n = cards.length

      cards.forEach((card, i) => {
        gsap.set(card, {
          scale:  1 - i * 0.04,
          y:      i * 22,
          zIndex: n - i,
          transformOrigin: 'center bottom',
        })
      })

      const tl = gsap.timeline({ paused: true })

      for (let i = 0; i < n - 1; i++) {
        tl.to(cards[i], {
          x:       '-125%',
          rotate:  -18,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
        })

        for (let j = i + 1; j < n; j++) {
          const newPos = j - (i + 1)
          tl.to(cards[j], {
            scale:  1 - newPos * 0.04,
            y:      newPos * 22,
            duration: 1,
            ease: 'power2.inOut',
          }, '<')
        }
      }

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: `+=${n * 600}`,
        pin: true,
        scrub: 1,
        animation: tl,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * n), n - 1)
          if (counterRef.current) {
            counterRef.current.textContent = String(idx + 1).padStart(2, '0')
          }
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`
          }
        },
      })

      gsap.fromTo('.proj-left > *',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: pinRef.current, start: 'top 85%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="projects-section">
      <div ref={pinRef} className="projects-pin">
        <div className="proj-left">
          <div className="eyebrow">Career</div>
          <h2 className="section-title">
            Work<br /><span className="highlight">Experience</span>
          </h2>
          <p className="proj-desc">
            4+ years building scalable web apps across banking, media, and enterprise sectors.
          </p>

          <div className="proj-counter">
            <span ref={counterRef} className="counter-current">01</span>
            <span className="counter-sep">/</span>
            <span className="counter-total">{String(experiences.length).padStart(2, '0')}</span>
          </div>

          <div className="proj-progress-track">
            <div ref={progressRef} className="proj-progress-fill" />
          </div>

          <div className="proj-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
            Scroll down
          </div>
        </div>

        <div ref={stackRef} className="proj-stack">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              ref={el => cardRefs.current[i] = el}
              className="stack-card"
              style={{ '--card-color': exp.color, background: exp.bg }}
            >
              <div className="stack-card-glow" style={{ background: exp.color }} />

              <div className="stack-card-inner">
                <div className="stack-card-top">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className={`stack-logo${exp.noFilter ? ' no-filter' : ''}`}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <span className="stack-year">{exp.period}</span>
                </div>

                <div className="stack-card-body">
                  <div className="stack-accent-line" style={{ background: exp.rainbow || exp.color }} />
                  <div className="stack-role" style={{ color: exp.color }}>{exp.role}</div>
                  <h3 className="stack-title">{exp.company}</h3>
                  <p className="stack-desc">{exp.desc}</p>
                </div>

                <div className="stack-card-bottom">
                  <div className="stack-tags">
                    {exp.tags.map(tag => (
                      <span key={tag} className="stack-tag" style={{ borderColor: `${exp.color}40`, color: exp.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
