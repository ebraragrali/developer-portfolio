import { useEffect, useRef } from 'react'
import { profile, type Language } from '../data/content'
import { portfolioCopy } from '../data/portfolio'
import './ContactLetter.css'

export function ContactLetter({ language }: { language: Language }) {
  const section = useRef<HTMLElement>(null)
  const t = portfolioCopy[language]

  useEffect(() => {
    const element = section.current
    const envelope = element?.querySelector('.mail-envelope')
    if (!element || !envelope) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.classList.add('is-open')
        observer.disconnect()
      }
    }, { threshold: 0, rootMargin: '0px 0px 100px 0px' })
    observer.observe(envelope)
    return () => observer.disconnect()
  }, [])

  return <section ref={section} id="contact" className="section-shell mail-contact" aria-labelledby="contact-title">
    <div className="section-heading mail-heading"><div className="eyebrow"><span>08</span> / {t.contact}</div><h2 id="contact-title">{t.contactTitle}</h2></div>
    <div className="mail-scene">
      <div className="mail-envelope">
        <div data-envelope-part="EnvelopeBack" className="mail-back" aria-hidden="true"/>
        <div data-envelope-part="EnvelopeFlap" className="mail-flap" aria-hidden="true"/>
        <div data-envelope-part="Letter" className="mail-paper">
          <div className="mail-actions">
            <a href={`mailto:${profile.email}`}><span aria-hidden="true">✉</span>{t.email}</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span>GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">in</span>LinkedIn</a>
          </div>
        </div>
        <svg data-envelope-part="EnvelopeFront" className="mail-front" viewBox="0 0 680 290" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0L340 165.3L680 0V290H0Z" fill="#b49fc3"/><path d="M0 290L340 133.4L680 290Z" fill="#cdb8d7"/><path d="M0 290L340 133.4L680 290" fill="none" stroke="#c1aace" strokeWidth="1"/></svg>
        <div className="mail-seal" aria-hidden="true">✉</div>
      </div>
    </div>
  </section>
}
