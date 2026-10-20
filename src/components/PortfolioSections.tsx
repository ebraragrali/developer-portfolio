import { ContactLetter } from './ContactLetter'
import type { ReactNode } from 'react'
import { EdibleText } from './EdibleText'
import { games, type Language } from '../data/content'
import { certifications, experience, portfolioCopy, projects, skills, type PortfolioProject } from '../data/portfolio'
import './PortfolioSections.css'
function Heading({number,label,title,children,titleLink}:{number:string;label:string;title:string;children?:string;titleLink?:string}) {
 return <div className="section-heading"><div className="eyebrow"><span>{number}</span> / {label}</div><h2>{titleLink?<a className="section-title-link" href={titleLink}><EdibleText text={title}/><span aria-hidden="true"> ↗</span></a>:<EdibleText text={title}/>}</h2>{children&&<p><EdibleText text={children}/></p>}</div>
}
function ExternalLink({href,children,...props}:{href:string;children:ReactNode;className?:string;'aria-label'?:string}) {
 return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
}
function ProjectCard({project,language}:{project:PortfolioProject;language:Language}) {
 const t=portfolioCopy[language]
 const contents=<>
  <div className="portfolio-project-top"><span>{project.category[language]}</span><span aria-hidden="true">{project.repository?'↗':'〈/〉'}</span></div>
  <h3><EdibleText text={project.title[language]}/></h3>
  <p><EdibleText text={project.description[language]}/></p>
  <div className="project-purpose"><strong>{t.purpose}</strong><p><EdibleText text={project.purpose[language]}/></p></div>
  <ul className="technology-list" aria-label={language==='tr'?'Teknolojiler':'Technologies'}>{[...project.technologies,...(project.id==='ground-station'?[t.telemetry,t.sensorData]:[])].map(tech=><li key={tech}><EdibleText text={tech}/></li>)}</ul>
  <div className="portfolio-project-link">{project.repository?<span>{t.repository} ↗ <small>({t.newTab})</small></span>:<span className="repository-missing">{t.repositoryMissing}</span>}</div>
 </>
 const style=`portfolio-project ${project.id==='ground-station'?'satellite-project':''}`
 return project.repository?<ExternalLink className={style} href={project.repository} aria-label={`${project.title[language]} — ${t.repository}, ${t.newTab}`}>{contents}</ExternalLink>:<article className={style}>{contents}</article>
}
export function AboutSection({language,compact=false}:{language:Language;compact?:boolean}) {
 const t=portfolioCopy[language]
 return <section id="about" className={`section-shell about-section portfolio-about ${compact?'hero-about':''}`}><Heading number="01" label={t.about} title={t.aboutTitle}/><div className="about-body">{t.aboutParagraphs.map(paragraph=><p key={paragraph}><EdibleText text={paragraph}/></p>)}</div></section>
}
export function PortfolioSections({language,includeAbout=true}:{language:Language;includeAbout?:boolean}) {
 const t=portfolioCopy[language]
 return <>
  {includeAbout&&<AboutSection language={language}/>}
  <section id="education" className="section-shell portfolio-education"><Heading number="02" label={t.education} title={t.education}/><article className="education-record"><span className="education-marker" aria-hidden="true">↳</span><div><h3><EdibleText text={t.university}/></h3><p><EdibleText text={t.degree}/></p><p className="education-meta"><span>{t.educationDate}</span><span>{t.studyYear}</span></p></div></article></section>
  <section id="skills" className="section-shell"><Heading number="03" label={t.skills} title={t.skillsTitle}>{t.skillsIntro}</Heading><div className="skill-grid portfolio-skills">{skills.map((group,index)=><article className="skill-card" key={group.id}><h3><span className="skill-number">0{index+1} / </span>{group.label[language]}</h3><ul className="technology-list">{group.items[language].map(item=><li key={item}><EdibleText text={item}/></li>)}</ul></article>)}</div></section>
  <section id="projects" className="section-shell"><Heading number="04" label={t.projects} title={t.projectsTitle}>{t.projectsIntro}</Heading><div className="portfolio-project-grid">{projects.map(project=><ProjectCard key={project.id} project={project} language={language}/>)}</div></section>
  <section id="playground" className="section-shell playground-section"><svg className="playground-controller" viewBox="0 0 160 120" fill="none" aria-hidden="true"><path d="M48 30h64c17 0 24 16 29 37l5 23c3 17-15 24-25 11l-15-17H54l-15 17C29 114 11 107 14 90l5-23c5-21 12-37 29-37Z" fill="#25233a" stroke="#b69acb" strokeWidth="3"/><path d="M80 30V15c0-7 8-9 15-9" stroke="#827597" strokeWidth="3"/><path d="M42 49v26m-13-13h26" stroke="#b3cbd8" strokeWidth="7" strokeLinecap="round"/><circle cx="112" cy="50" r="6" fill="#cca6ce"/><circle cx="127" cy="64" r="6" fill="#96c6b5"/><circle cx="69" cy="77" r="8" fill="#111625" stroke="#74668c"/><circle cx="94" cy="77" r="8" fill="#111625" stroke="#74668c"/></svg><Heading number="05" label={t.playground} title={t.playTitle} titleLink="#game-start">{t.playIntro}</Heading>{games[0].src&&<iframe className="portfolio-phaser" src={games[0].src} title={language==='tr'?'Phaser oyunum':'My Phaser game'} sandbox="allow-scripts allow-same-origin allow-pointer-lock" allow="fullscreen"/>}</section>
  <section id="experience" className="section-shell experience-section portfolio-experience"><Heading number="06" label={t.experience} title={t.experienceTitle}>{t.experienceIntro}</Heading><ol className="experience-timeline">{experience.map(entry=><li className="experience-entry" key={entry.id}><span className="timeline-dot" aria-hidden="true"/><p className="experience-date">{entry.date[language]}</p><h3>{entry.id==='teknofest'?t.satelliteTeam:entry.company}</h3><p className="experience-role"><EdibleText text={entry.role[language]}/></p><ul>{entry.bullets[language].map(bullet=><li key={bullet}><EdibleText text={bullet}/></li>)}</ul></li>)}</ol></section>
  <section id="certifications" className="section-shell portfolio-certifications"><Heading number="07" label={t.certifications} title={t.certificationsTitle}/><ul className="certification-list">{certifications.map(cert=><li key={cert.id}><span className="certification-year">{cert.year}</span><div><h3><EdibleText text={cert.title[language]}/></h3><p>{cert.issuer[language]}</p></div></li>)}</ul></section>
  <ContactLetter language={language}/>
 </>
}
