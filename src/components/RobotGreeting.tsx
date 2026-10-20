import { useState } from 'react'
import type { Language } from '../data/content'
import welcomeCharacter from '../assets/pink-heart-robot-3d.png'
import { PacmanLauncher } from './PacmanLauncher'
import './RobotGreeting.css'

/** A single static character replaces the layered, animated robot. */
export function RobotGreeting({ language }: { language: Language }) {
 const [open,setOpen]=useState(true)
 const tr=language==='tr'
 return <div className="robot-greeting standing-greeting static-greeting">
  <div className="standing-mascot static-mascot">
   <img src={welcomeCharacter} alt={tr?'Pembe gözlü, kalp detaylı, beyaz ve gri sevimli robot':'Cute white and gray robot with pink eyes and a pink heart'} width="1024" height="1024"/>
  </div>
  {open?<div className="robot-bubble pixel-welcome" id="robot-message">
   <button className="robot-bubble-close" aria-label={tr?'Karşılama mesajını kapat':'Dismiss welcome'} onClick={()=>setOpen(false)}>×</button>
   <div className="robot-dialogue"><p>{tr?'Merhaba! Portfolyoma hoş geldiniz. İsterseniz Pac-Man oynayabilirsiniz!':'Hello! Welcome to my portfolio. You can play Pac-Man if you like!'}</p></div>
   <small>{tr?'WASD ve yön tuşlarıyla oynayabilirsiniz.':'You can play using WASD or the arrow keys.'}</small>
   <PacmanLauncher language={language}/>
  </div>:<><button className="robot-hello" onClick={()=>setOpen(true)} aria-expanded={false}>{tr?'Mesajı göster':'Show message'}</button><div className="closed-bubble-launch"><PacmanLauncher language={language}/></div></>}
 </div>
}
