import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const rows = [
  {
    skills: ['React', 'Next.js', 'TypeScript', 'Angular', 'SCSS', 'HTML & CSS', 'GraphQL', 'Jotai'],
    direction: -1,
    color: '#7c3aed',
  },
  {
    skills: ['Redux', 'MobX', 'Jotai', 'Module Federation', 'Atomic Design', 'NestJS', 'MongoDB', 'REST API'],
    direction: 1,
    color: '#06b6d4',
  },
  {
    skills: ['Git & GitHub', 'JavaScript', 'Jest', 'Socket.io', 'Figma', 'Vite', 'Agile', 'GSAP'],
    direction: -1,
    color: '#f472b6',
  },
]

export default function Skills() {
  const sectionRef = useRef(null)
  const rowRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo('.skills-header > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-header',
            start: 'top 82%',
          }
        }
      )

      // Setiap row bergerak horizontal saat scroll (scrub)
      rowRefs.current.forEach((row, i) => {
        if (!row) return
        const dir = rows[i].direction
        const distance = 300 * dir // px yang ditempuh

        gsap.fromTo(row,
          { x: -distance },
          {
            x: distance,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="section skills-section">
      <div className="skills-header container">
        <div className="eyebrow">What I Do</div>
        <h2 className="section-title">
          Skills &amp; <span className="highlight">Expertise</span>
        </h2>
      </div>

      <div className="skills-marquee-wrap">
        {rows.map((row, i) => (
          <div key={i} className="skills-row">
            {/* Clipping mask label */}
            <div className="skills-row-label" style={{ color: row.color }}>
              {['Frontend', 'State & Arch', 'Tools'][i]}
            </div>

            {/* Marquee track — duplikat agar seamless */}
            <div
              ref={el => rowRefs.current[i] = el}
              className="skills-track"
              style={{ '--row-color': row.color }}
            >
              {[...row.skills, ...row.skills, ...row.skills].map((skill, j) => (
                <div key={j} className="skills-item">
                  <span className="skills-item-dot" style={{ background: row.color }} />
                  <span className="skills-item-text">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
