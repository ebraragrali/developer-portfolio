import { createPortal } from 'react-dom'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { renderPacman } from './pacmanRenderer'
import { welcomeExitFrame } from './greetingTimeline'
import type { Language } from '../data/content'
import './PacmanLauncher.css'
type Phase='idle'|'eating'|'finished'
export function PacmanLauncher({language}:{language:Language}) {
 const canvas=useRef<HTMLCanvasElement>(null)
 const root=useRef<HTMLDivElement>(null)
 const character=useRef<HTMLSpanElement>(null)
 const frame=useRef(0)
 const busy=useRef(false)
 const [launchOrigin,setLaunchOrigin]=useState({left:0,top:0,size:40})
 const [phase,setPhase]=useState<Phase>(()=>document.documentElement.classList.contains('pacman-started')?'finished':'idle')
 const tr=language==='tr'
 useEffect(()=>{if(phase==='idle' && canvas.current)renderPacman(canvas.current,.55,100)},[phase])
 useEffect(()=>{
  if(canvas.current)renderPacman(canvas.current,.55,100)
  const reset=()=>{
   cancelAnimationFrame(frame.current);busy.current=false;setPhase('idle')
   document.documentElement.classList.remove('pacman-intro')
   root.current?.style.setProperty('--bite','0px')
   character.current?.style.removeProperty('transform')
   if(canvas.current)renderPacman(canvas.current,.55,100)
  }
  const start=()=>{
   if(busy.current || document.documentElement.classList.contains('pacman-started'))return
   const box=root.current?.getBoundingClientRect()
   if(!box)return
   busy.current=true;setPhase('eating');document.documentElement.classList.add('pacman-intro')
   const startCharacter=character.current?.getBoundingClientRect()
   const source={left:startCharacter?.left ?? box.left,top:(startCharacter?.top ?? box.top)+window.scrollY,size:startCharacter?.width ?? 40}
   const width=box.width
   setLaunchOrigin(source)
   const consumedX=Math.min(document.documentElement.clientWidth-24,source.left+source.size/2+width-28)
   const destination={
    x:Math.min(document.documentElement.clientWidth-24,consumedX+100),
    y:source.top+source.size/2,
   }
   const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?450:2400
   const started=performance.now()
   const animate=(now:number)=>{
    const progress=(now-started)/duration
    const start=source
    const step=welcomeExitFrame(progress,{x:start.left+start.size/2,y:start.top+start.size/2},width,document.documentElement.clientWidth,destination)
    const offsetX=step.x-(start.left+start.size/2)
    const offsetY=step.y-(start.top+start.size/2)
    root.current?.style.setProperty('--bite',`${step.bite}px`)
    if(character.current)character.current.style.transform=`translate3d(${offsetX}px,${offsetY}px,0)`
    if(canvas.current)renderPacman(canvas.current,.1+(Math.sin(progress*36)+1)*.26,100)
    if(progress<1){frame.current=requestAnimationFrame(animate);return}
    const end=character.current?.getBoundingClientRect()
    document.documentElement.classList.remove('pacman-intro')
    setPhase('finished');busy.current=false
    window.dispatchEvent(new CustomEvent('portfolio-game-ready',{detail:{x:end?end.left+end.width/2:box.right,y:end?end.top+window.scrollY+end.height/2:box.top+window.scrollY+box.height/2}}))
   }
   frame.current=requestAnimationFrame(animate)
  }
  window.addEventListener('portfolio-play',start)
  window.addEventListener('portfolio-reset',reset)
  window.addEventListener('portfolio-cancel-intro',reset)
  return ()=>{cancelAnimationFrame(frame.current);document.documentElement.classList.remove('pacman-intro');window.removeEventListener('portfolio-play',start);window.removeEventListener('portfolio-reset',reset);window.removeEventListener('portfolio-cancel-intro',reset)}
 },[])
 const label=tr?"Pac-Man’i Başlat":'Start Pac-Man'
 return <div className={`pacman-launch-card launch-${phase}`} ref={root} data-pacman-launch>
  {phase==='eating' && createPortal(<span ref={character} className="launch-character launch-escaping" style={{left:launchOrigin.left,top:launchOrigin.top,width:launchOrigin.size,height:launchOrigin.size}} aria-hidden="true"><canvas ref={canvas} width="200" height="200"/></span>,document.body)}
  <button className="pacman-launch-button" disabled={phase!=='idle'} onClick={()=>window.dispatchEvent(new Event('portfolio-play'))} aria-label={label}>
   <span className="pacman-button-surface" aria-hidden="true"><span className="pacman-button-title">{tr?'Pac-Man’i':'Pac-Man'}</span><span className="pacman-blue-button">{Array.from(tr?'Başlat':'Start').map((letter,index)=><span key={index}>{letter}</span>)}<b>▶</b></span></span>
   {phase!=='eating' && <span ref={character} className="launch-character" aria-hidden="true"><canvas ref={canvas} width="200" height="200"/></span>}
   <span className="bite-particles" aria-hidden="true">{Array.from({length:7},(_,index)=><i key={index} style={{'--particle':index} as CSSProperties}/>)}</span>
  </button>
  <span className="launch-announcement" role="status">{phase==='eating'?(tr?'Pac-Man düğmeyi yiyor…':'Pac-Man is eating the button…'):phase==='finished'?(tr?'Oyun hazır. WASD veya yön tuşlarını kullanın.':'Game ready. Use WASD or arrow keys.'):''}</span>
 </div>
}

