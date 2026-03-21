import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const submitBtnRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [showPlane, setShowPlane] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-header > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-header', start: 'top 80%' }
        }
      )
      gsap.fromTo(['.contact-card', '.contact-form-wrap'],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus('sent')
        setShowPlane(true)
      })
      .catch(() => {
        setStatus('error')
      })
  }

  return (
    <section id="contact" ref={sectionRef} className="section contact-section">
      {showPlane && <PlaneAnimation originRef={submitBtnRef} onComplete={() => setShowPlane(false)} />}
      {/* BG glow */}
      <div className="contact-glow" />

      <div className="container">
        <div className="contact-header">
          <h2 className="section-title">
            Let's <span className="highlight">Work Together</span>
          </h2>
          <p className="contact-sub">
            Have a project in mind or just want to chat? I'm always open to new opportunities and interesting conversations.
          </p>
        </div>

        <div className="contact-layout">
          {/* Info cards */}
          <div className="contact-info">
            {[
              {
                icon: <EmailIcon />,
                label: 'Email',
                value: 'imnotjeed@gmail.com',
                href: 'mailto:imnotjeed@gmail.com',
              },
              {
                icon: <LocationIcon />,
                label: 'Location',
                value: 'Jakarta, Indonesia',
                href: null,
              },
              {
                icon: <PhoneIcon />,
                label: 'Phone',
                value: '+62 812 6932 7604',
                href: 'tel:+6281269327604',
              },
            ].map((item) => (
              <div key={item.label} className="contact-card">
                <div className="contact-card-icon">{item.icon}</div>
                <div>
                  <div className="contact-card-label">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="contact-card-value">{item.value}</a>
                  ) : (
                    <div className="contact-card-value">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Availability */}
            <div className="availability-card">
              <div className="availability-dot" />
              <div>
                <div className="availability-title">Currently Available</div>
                <div className="availability-sub">Open to freelance & full-time roles</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {status === 'sent' ? (
              <div className="form-success">
                <div className="success-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button className="btn btn-ghost" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input name="name" type="text" className="form-input" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input name="email" type="email" className="form-input" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input name="title" type="text" className="form-input" placeholder="What's this about?" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea name="message" className="form-input form-textarea" placeholder="Tell me about your project..." rows={5} required />
                </div>
                {status === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: '13px', textAlign: 'center' }}>
                    Failed to send. Please try again or email directly.
                  </p>
                )}
                <button
                  ref={submitBtnRef}
                  type="submit"
                  className={`btn btn-primary form-submit ${status === 'sending' ? 'loading' : ''}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="spinner" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function PlaneAnimation({ onComplete, originRef }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const vw = window.innerWidth
    const vh = window.innerHeight

    // Default start: bottom-left
    let startX = -320
    let startY = vh * 0.72

    // If we have the button's position, start from there
    if (originRef?.current) {
      const rect = originRef.current.getBoundingClientRect()
      // Position near the right side of the button (where the icon is)
      startX = rect.left + rect.width * 0.75
      startY = rect.top + rect.height / 2
    }

    // Start tiny — looks like the button icon lifting off
    gsap.set(el, {
      x: startX,
      y: startY,
      scale: 0.06,
      rotate: -22,
      opacity: 1,
      transformOrigin: 'right center',
    })

    const tl = gsap.timeline({ onComplete })

    // Phase 0 — micro rev-up: jitter on the spot (engine warming up)
    tl.to(el, {
      x: startX - 4,
      y: startY - 6,
      scale: 0.07,
      rotate: -28,
      duration: 0.12,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 3,
    })
    // Phase 1 — takeoff + approach: grow big flying toward viewer
    .to(el, {
      x: vw * 0.3,
      y: vh * 0.22,
      scale: 2.6,
      rotate: -12,
      duration: 1.5,
      ease: 'power3.inOut',
    })
    // Phase 2 — slight wobble at closest point (turbulence)
    .to(el, {
      y: vh * 0.17,
      duration: 0.15,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 3,
    })
    // Phase 3 — fly past, exit top-right, shrink
    .to(el, {
      x: vw + 400,
      y: vh * 0.02,
      scale: 0.2,
      rotate: -4,
      duration: 1.2,
      ease: 'power2.in',
    })

    return () => tl.kill()
  }, [])

  return (
    <div className="plane-overlay" aria-hidden="true">
      <div ref={wrapRef} className="plane-group">
        {/* Banner trails BEHIND (to the left of) the plane */}
        <div className="plane-banner-wrap">
          <span className="plane-banner-text">✉ Message Sent!</span>
          <svg className="plane-rope" width="90" height="14" viewBox="0 0 90 14" fill="none">
            <path
              d="M0 7 Q22 2 45 7 Q68 12 90 7"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 3"
            />
          </svg>
        </div>

        {/* Airplane SVG — faces right */}
        <svg className="plane-svg" width="160" height="80" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="82" cy="40" rx="62" ry="12" fill="white"/>
          <path d="M144 40 L130 33 L130 47 Z" fill="#e2e8f0"/>
          <path d="M90 40 L115 8 L60 34 Z" fill="white" opacity="0.95"/>
          <path d="M90 40 L115 72 L60 46 Z" fill="white" opacity="0.85"/>
          <path d="M22 40 L12 14 L32 40 Z" fill="white"/>
          <path d="M28 38 L44 26 L44 38 Z" fill="white" opacity="0.9"/>
          <path d="M28 42 L44 54 L44 42 Z" fill="white" opacity="0.9"/>
          <circle cx="110" cy="36" r="4" fill="rgba(100,200,255,0.6)"/>
          <circle cx="97" cy="36" r="4" fill="rgba(100,200,255,0.6)"/>
          <circle cx="84" cy="36" r="4" fill="rgba(100,200,255,0.6)"/>
          <circle cx="71" cy="36" r="4" fill="rgba(100,200,255,0.6)"/>
          <circle cx="58" cy="36" r="4" fill="rgba(100,200,255,0.6)"/>
          <ellipse cx="87" cy="52" rx="16" ry="6" fill="#94a3b8"/>
          <ellipse cx="87" cy="52" rx="10" ry="4" fill="#64748b"/>
          <rect x="20" y="37" width="110" height="4" rx="2" fill="rgba(249,115,22,0.5)"/>
        </svg>
      </div>
    </div>
  )
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
}
