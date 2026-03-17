import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="container footer-inner">
        <div className="footer-left">
          <a className="footer-logo" href="#" onClick={(e) => { e.preventDefault(); scrollTop() }}>
            <span className="logo-bracket">&lt;</span>JA<span className="logo-bracket">/&gt;</span>
          </a>
          <p className="footer-copy">
            &copy; {year} Jed Abner. Crafted with passion &amp; coffee.
          </p>
        </div>

        <div className="footer-links">
          {['About', 'Skills', 'Experience', 'Contact'].map(l => (
            <button
              key={l}
              className="footer-link"
              onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
            >
              {l}
            </button>
          ))}
        </div>

        <button className="back-top" onClick={scrollTop} aria-label="Back to top">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      </div>
    </footer>
  )
}
