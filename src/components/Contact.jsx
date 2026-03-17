import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent

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
    setTimeout(() => setStatus('sent'), 1800)
  }

  return (
    <section id="contact" ref={sectionRef} className="section contact-section">
      {/* BG glow */}
      <div className="contact-glow" />

      <div className="container">
        <div className="contact-header">
          <div className="eyebrow">Get In Touch</div>
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
                    <input type="text" className="form-input" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input type="text" className="form-input" placeholder="What's this about?" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input form-textarea" placeholder="Tell me about your project..." rows={5} required />
                </div>
                <button
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
