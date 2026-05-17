import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle, ArrowRight, Clock } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import SectionTitle from '../../components/ui/SectionTitle'
import { useAppStore } from '../../store/appStore'

const unitOptions = [
  { value: 'standard', label: '3 BHK Standard (~1,817 Sq.Ft)' },
  { value: 'premium',  label: '3 BHK Premium (~2,400 Sq.Ft)' },
  { value: 'grand',    label: '3 BHK Grand (~3,675 Sq.Ft)' },
  { value: 'unsure',   label: 'Not decided yet' },
]

const inputClass = `
  w-full px-4 py-3 rounded-xl text-sm font-medium
  text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
  border transition-all duration-200 outline-none bg-transparent
  focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]
`

export default function Contact() {
  const { addInquiry, hasSubmittedEOI } = useAppStore()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', unitPreference: 'premium', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) e.phone = 'Valid 10-digit phone required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    await new Promise(r => setTimeout(r, 1200)) // simulate API

    addInquiry(form)
    setSubmitted(true)
    setLoading(false)
  }

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setErrors(err => ({ ...err, [field]: undefined }))
  }

  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(29,237,84,0.08) 0%, transparent 60%)' }} />
        <div className="container-site relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-gold mb-4 inline-flex mx-auto">Get in Touch</span>
            <h1
              className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Register Your{' '}
              <span className="text-gold-gradient">Expression of Interest</span>
            </h1>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
              Secure your priority unit and early pricing advantage. Our team will reach out within 24 hours with complete details, pricing, and site visit options.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info sidebar */}
            <div className="flex flex-col gap-5">
              <GlassCard className="p-6" variant="gold">
                <h3 className="font-display font-semibold text-[var(--text-primary)] text-lg mb-4">Sales Office</h3>
                <div className="flex flex-col gap-4">
                  <a href="tel:+919133311586" className="flex items-start gap-3 group">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)' }}>
                      <Phone size={15} className="text-accent" />
                    </span>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-0.5">Sales Enquiry</div>
                      <div className="font-semibold text-[var(--text-primary)] group-hover:text-accent transition-colors duration-150">
                        +91 91333 11586
                      </div>
                    </div>
                  </a>

                  <a href="mailto:info@marvelinfra.com" className="flex items-start gap-3 group">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)' }}>
                      <Mail size={15} className="text-accent" />
                    </span>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-0.5">Email</div>
                      <div className="font-semibold text-[var(--text-primary)] group-hover:text-accent transition-colors duration-150 text-sm break-all">
                        info@marvelinfra.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://maps.app.goo.gl/7R9GheBDPfRKzwsd8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)' }}>
                      <MapPin size={15} className="text-accent" />
                    </span>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-0.5">Site Location</div>
                      <div className="font-semibold text-[var(--text-primary)] group-hover:text-accent transition-colors duration-150 text-sm leading-snug">
                        Beside Gachibowli Flyover,<br />Hyderabad, Telangana
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(29,237,84,0.12)', border: '1px solid var(--border-gold)' }}>
                      <Clock size={15} className="text-accent" />
                    </span>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-0.5">Office Hours</div>
                      <div className="font-semibold text-[var(--text-primary)] text-sm">Mon – Sat: 10AM – 7PM</div>
                      <div className="text-xs text-[var(--text-muted)]">Sunday by appointment</div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Map embed */}
              <GlassCard className="overflow-hidden" variant="raised" animate={false}>
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.3!2d78.347!3d17.440!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzI0LjAiTiA3OMKwMjAnNDkuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Marvel Infra Gachibowli Location"
                    className="absolute inset-0"
                  />
                </div>
                <div className="p-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <a
                    href="https://maps.app.goo.gl/7R9GheBDPfRKzwsd8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-light transition-colors font-medium"
                  >
                    <MapPin size={12} /> Open in Google Maps <ArrowRight size={11} />
                  </a>
                </div>
              </GlassCard>
            </div>

            {/* EOI Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-gold rounded-2xl p-10 lg:p-14 text-center h-full flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: 'rgba(29,237,84,0.15)', border: '1px solid var(--border-gold)' }}>
                    <CheckCircle size={32} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-[var(--text-primary)] text-2xl">Interest Registered!</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed max-w-sm">
                    Thank you for registering your Expression of Interest. Our team will contact you within 24 hours with unit details, pricing, and site visit information.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] pt-2">
                    <CheckCircle size={14} className="text-accent" />
                    Priority unit selection reserved for early registrants
                  </div>
                  <a href="tel:+919133311586" className="btn-gold mt-2">
                    <Phone size={15} /> Call Us Now
                  </a>
                </motion.div>
              ) : (
                <GlassCard className="p-6 lg:p-8" variant="gold" animate={false}>
                  <h3 className="font-display font-semibold text-[var(--text-primary)] text-xl mb-1">
                    Expression of Interest Form
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    Fill in your details and we'll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-1.5 block">
                          First Name *
                        </label>
                        <input
                          value={form.firstName}
                          onChange={set('firstName')}
                          placeholder="Rahul"
                          className={`${inputClass} ${errors.firstName ? 'border-red-400' : 'border-[var(--border-subtle)]'}`}
                        />
                        {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-1.5 block">
                          Last Name
                        </label>
                        <input
                          value={form.lastName}
                          onChange={set('lastName')}
                          placeholder="Mehta"
                          className={`${inputClass} border-[var(--border-subtle)]`}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-1.5 block">
                          Phone Number *
                        </label>
                        <input
                          value={form.phone}
                          onChange={set('phone')}
                          placeholder="+91 98765 43210"
                          type="tel"
                          className={`${inputClass} ${errors.phone ? 'border-red-400' : 'border-[var(--border-subtle)]'}`}
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-1.5 block">
                          Email Address *
                        </label>
                        <input
                          value={form.email}
                          onChange={set('email')}
                          placeholder="rahul@example.com"
                          type="email"
                          className={`${inputClass} ${errors.email ? 'border-red-400' : 'border-[var(--border-subtle)]'}`}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-1.5 block">
                        Unit Preference
                      </label>
                      <select
                        value={form.unitPreference}
                        onChange={set('unitPreference')}
                        className={`${inputClass} border-[var(--border-subtle)]`}
                        style={{ background: 'var(--surface)' }}
                      >
                        {unitOptions.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-1.5 block">
                        Message (Optional)
                      </label>
                      <textarea
                        value={form.message}
                        onChange={set('message')}
                        placeholder="Any specific requirements or questions..."
                        rows={3}
                        className={`${inputClass} border-[var(--border-subtle)] resize-none`}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={!loading ? { y: -2 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                      className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                            className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white inline-block"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Register Expression of Interest
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-[var(--text-muted)] text-center leading-relaxed">
                      By submitting, you agree to be contacted by the Marvel Infra sales team. Your information is kept strictly confidential.
                    </p>
                  </form>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
