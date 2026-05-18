import { Component } from 'react'
import { Phone, Mail, Home, RefreshCw, AlertTriangle } from 'lucide-react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.href = '/'
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
        style={{ background: 'var(--bg-primary)' }}
      >
        {/* Subtle orb decoration */}
        <div style={{
          position: 'fixed', top: '-10%', left: '-5%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,183,251,0.10) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'fixed', bottom: '-5%', right: '-5%',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(29,237,84,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
        }} />

        <div className="relative z-10 max-w-lg w-full text-center">

          {/* Logo */}
          <div className="flex justify-center mb-10">
            <img src="/images/logo.jpg" alt="Marvel Infra" style={{ height: '2.6rem', width: 'auto', objectFit: 'contain' }} />
          </div>

          {/* Error icon */}
          <div className="flex justify-center mb-6">
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(29,237,84,0.10)', border: '1.5px solid var(--border-gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AlertTriangle size={30} color="var(--accent)" strokeWidth={1.5} />
            </div>
          </div>

          <h1
            className="font-bold mb-3"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--text-primary)' }}
          >
            Something Went Wrong
          </h1>
          <p className="mb-2" style={{ color: 'var(--text-secondary)', fontSize: '0.975rem', lineHeight: 1.7 }}>
            We encountered an unexpected issue on this page.
            Please reach out to us directly — we're happy to assist.
          </p>

          {/* Contact block */}
          <div
            className="glass-gold rounded-2xl px-6 py-5 mt-8 mb-8 text-left"
          >
            <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: 'var(--text-muted)' }}>
              Get in Touch
            </p>
            <a
              href="tel:+919133311586"
              className="flex items-center gap-3 mb-3 group"
              style={{ textDecoration: 'none' }}
            >
              <span style={{
                width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Phone size={15} color="var(--accent)" />
              </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                +91 91333 11586
              </span>
            </a>
            <a
              href="mailto:info@marvelinfra.com"
              className="flex items-center gap-3 group"
              style={{ textDecoration: 'none' }}
            >
              <span style={{
                width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Mail size={15} color="var(--accent)" />
              </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                info@marvelinfra.com
              </span>
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={this.handleReset} className="btn-gold">
              <Home size={15} />
              Go to Home
            </button>
            <a href="tel:+919133311586" className="btn-ghost">
              <RefreshCw size={15} />
              Call Us Now
            </a>
          </div>

          <p className="mt-10 text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2026 Marvel Infra · Gachibowli, Hyderabad
          </p>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
