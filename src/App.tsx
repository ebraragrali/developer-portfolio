import { AboutSection, PortfolioSections } from './components/PortfolioSections'
import { RobotGreeting } from './components/RobotGreeting'
import { EdibleText } from './components/EdibleText'
import { useEffect, useState } from 'react'
import { PageGame } from './components/PageGame'
import { ElectricalCables } from './components/ElectricalCables'
import { Workstation } from './components/Workstation'
import { copy, profile, sectionIds, type Language } from './data/content'
import './App.css'
import './components/Home.css'
import './components/RobotExperience.css'
import './components/WelcomeLayout.css'
import './components/LayoutRefinements.css'

function App() {
  const [language, setLanguage] = useState<Language>(() => { try { return localStorage.getItem('lab-language') === 'en' ? 'en' : 'tr' } catch { return 'tr' } })
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const t = copy[language]
  useEffect(() => { document.documentElement.lang = language; document.title = `The Developer’s Lab | ${t.nav[0]}`; try { localStorage.setItem('lab-language', language) } catch { /* Storage is optional. */ } }, [language, t.nav])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) setActiveSection(entry.target.id) }), { rootMargin: '-15% 0px -55% 0px' })
    sectionIds.forEach(id => { const section = document.getElementById(id); if(section) observer.observe(section) })
    return () => observer.disconnect()
  }, [])
  return <>
    <div className="night-stars" aria-hidden="true"/><ElectricalCables/>
    <PageGame language={language}/>
    <a href="#main" className="skip-link">{t.skip}</a>
    <header className="site-header"><a href="#home" className="brand" aria-label={language === 'tr' ? 'Portfolyo ana sayfa' : 'Portfolio home'}><span className="brand-mark">&lt;/&gt;<i /></span><span>{language === 'tr' ? 'Portfolyo' : 'Portfolio'}</span></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" aria-label={t.menu} onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
      <nav id="navigation" aria-label={language === 'tr' ? 'Ana gezinme' : 'Main navigation'} className={menuOpen?'open':''}>{sectionIds.map((id,i)=><a key={id} href={`#${id}`} aria-current={activeSection===id?'location':undefined} onClick={()=>setMenuOpen(false)}>{t.nav[i]}</a>)}</nav>
      <div className="language-switch" aria-label={language==='tr'?'Dil':'Language'}>{(['tr','en'] as const).map(lang=><button key={lang} aria-pressed={language===lang} onClick={()=>setLanguage(lang)}>{lang.toUpperCase()}</button>)}</div>
    </header>
    <main id="main">
      <section id="home" className="hero section-shell reference-home">
        <div className="hero-character-scene" id="game-start" tabIndex={-1}><RobotGreeting language={language}/></div>
        <div className="hero-copy"><p className="hero-salutation"><EdibleText text={language==='tr'?'Merhaba, ben':'Hello, I’m'}/></p><h1><EdibleText text="Ebrar Ağralı"/></h1><h2 className="hero-role"><EdibleText text={language==='tr'?'Yazılım Mühendisliği Öğrencisi':'Software Engineering Student'}/></h2><p className="hero-intro"><EdibleText text={t.intro}/></p><div className="hero-actions"><a className="button primary" href="#projects">{language==='tr'?'Projelerimi Gör':'View my projects'} <span>→</span></a><a className="button secondary" href="#contact">{language==='tr'?'İletişime Geç':'Get in touch'} <span>↗</span></a></div><div className="hero-socials"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={`mailto:${profile.email}`}>{language==='tr'?'E-posta':'Email'} ↗</a></div></div>
        <AboutSection language={language} compact/>
        <div className="hero-workstation"><p className="workstation-caption">{language==='tr'?'Masamı keşfet · nesnelere tıklayabilirsin':'Explore my desk · click an object'}</p><Workstation language={language}/></div>
        <a className="hero-scroll" href="#about" aria-label={t.nav[1]}>⌄</a>
      </section>
      <PortfolioSections language={language} includeAbout={false}/>
    </main>
  </>
}
export default App


