import { renderPacman } from './pacmanRenderer'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Language } from '../data/content'
import './PageGame.css'
import { advance, movement, keyVectors } from './gamePhysics'

const directions = keyVectors
const editable = (target: EventTarget | null) => target instanceof HTMLElement && (!!target.closest('input, textarea, select, [contenteditable="true"], iframe') || target.isContentEditable)

export function PageGame({ language }: { language: Language }) {
  const actor = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const position = useRef({ x: 52, y: 175, angle: 0 })
  const keys = useRef(new Set<string>())
  const running = useRef(false)
  const eatenLetters = useRef(new Set<HTMLElement>())
  const letterTargets = useRef<{element:HTMLElement;x:number;y:number}[]>([])
  const lastDirection = useRef<readonly [number, number]>([1, 0])
  const [active, setActive] = useState(false)
  const [score, setScore] = useState(0)
  const [touch, setTouch] = useState(false)
  const wakeAnimation = useRef<() => void>(() => {})
  const tr = language === 'tr'
  const pause = useCallback(() => { running.current = false; keys.current.clear(); setActive(false); if(document.documentElement.classList.contains('pacman-intro'))window.dispatchEvent(new Event('portfolio-cancel-intro')) }, [])
  const play = useCallback(() => {
    if(!document.documentElement.classList.contains('pacman-started')) {
      const launch=document.querySelector('[data-pacman-launch]')?.getBoundingClientRect()
      if(launch) { position.current.x=launch.left+launch.width*.35;position.current.y=launch.top+window.scrollY+launch.height/2 }
      document.documentElement.classList.add('pacman-started')
      if(actor.current) actor.current.style.transform = `translate3d(${position.current.x-20}px,${position.current.y-20}px,0)`
    }
    running.current = true; setActive(true)
    wakeAnimation.current()
  }, [])
  const requestPlay = useCallback(() => {
    if(document.documentElement.classList.contains('pacman-started')) play()
    else window.dispatchEvent(new Event('portfolio-play'))
  }, [play])

  useEffect(() => {
    let frame = 0
    let previous = 0
    let phase = 0
    let width = window.innerWidth
    let height = document.documentElement.scrollHeight
    const layout = () => {
      letterTargets.current = Array.from(document.querySelectorAll<HTMLElement>('[data-edible-letter]')).map(element => { const box=element.getBoundingClientRect(); return {element,x:box.left+window.scrollX+box.width/2,y:box.top+window.scrollY+box.height/2} })
      width = document.documentElement.clientWidth
      height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    }
    layout()
    if(canvas.current) renderPacman(canvas.current,.32)
    const observer = new ResizeObserver(layout)
    observer.observe(document.body)
    window.addEventListener('resize', layout)
    const onKeyDown = (event: KeyboardEvent) => {
      if(event.key === 'Escape') { pause(); return }
      const key = event.key.toLowerCase()
      const direction = directions[key]
      if(!direction || editable(event.target) || event.ctrlKey || event.metaKey || event.altKey) return
      if(key.startsWith('arrow')) event.preventDefault()
      keys.current.add(key)
      lastDirection.current = direction
      requestPlay()
    }
    const onReady=(event:Event)=>{
      const detail=(event as CustomEvent<{x:number;y:number}>).detail
      if(detail){position.current.x=detail.x;position.current.y=detail.y}
      document.documentElement.classList.add('pacman-started')
      if(actor.current)actor.current.style.transform=`translate3d(${position.current.x-20}px,${position.current.y-20}px,0)`
      play()
    }
    window.addEventListener('portfolio-game-ready',onReady)
    const onKeyUp = (event: KeyboardEvent) => { keys.current.delete(event.key.toLowerCase()) }
    const blur = () => pause()
    const visibility = () => { if(document.hidden) pause() }
    const manualScroll = () => pause()
    const onNavigate = (event: MouseEvent) => { if(event.target instanceof Element && event.target.closest('a[href]')) pause() }
    document.addEventListener('click',onNavigate)
    window.addEventListener('keydown',onKeyDown,{passive:false})
    window.addEventListener('keyup',onKeyUp)
    window.addEventListener('blur',blur)
    window.addEventListener('wheel',manualScroll,{passive:true})
    document.addEventListener('visibilitychange',visibility)
    const animate = (time: number) => {
      frame = 0
      const dt = previous ? Math.min((time-previous)/1000,.04) : 0
      previous = time
      if(running.current) {
        const vector = movement(keys.current, lastDirection.current)
        if(vector.x || vector.y) {
          const point = position.current
          Object.assign(point, advance(point, vector, dt, width, height))
          point.angle = Math.atan2(vector.y,vector.x)*180/Math.PI
          phase += dt*14
          const opening = .08 + (Math.sin(phase)+1)*.26
          if(canvas.current) renderPacman(canvas.current,opening)
          if(actor.current) actor.current.style.transform = `translate3d(${point.x-20}px,${point.y-20}px,0) rotate(${point.angle}deg)`
          const nearbyLetters = letterTargets.current.filter(letter => !eatenLetters.current.has(letter.element) && Math.abs(letter.y-point.y)<24 && Math.abs(letter.x-point.x)<24 && Math.hypot(letter.x-point.x,letter.y-point.y)<23)
          if(nearbyLetters.length) {
            for(const letter of nearbyLetters) { eatenLetters.current.add(letter.element); letter.element.classList.add('letter-eaten') }
            setScore(eatenLetters.current.size)
          }
          const margin = Math.min(150,window.innerHeight*.25)
          const viewportY = point.y-window.scrollY
          let target = window.scrollY
          if(viewportY > window.innerHeight-margin) target = point.y-window.innerHeight+margin
          if(viewportY < margin) target = point.y-margin
          // Frame-rate independent camera easing; no queued smooth-scroll animations.
          const difference = target-window.scrollY
          if(Math.abs(difference)>1) window.scrollTo({ top: window.scrollY+difference*(1-Math.exp(-12*dt)), behavior:'instant' })
        }
      }
      if(running.current) frame=requestAnimationFrame(animate)
    }
    wakeAnimation.current = () => {
      if (!frame) { previous = 0; frame = requestAnimationFrame(animate) }
    }
    if(running.current) wakeAnimation.current()
    return () => { wakeAnimation.current = () => {}; cancelAnimationFrame(frame); window.removeEventListener('portfolio-game-ready',onReady); document.removeEventListener('click',onNavigate); observer.disconnect(); window.removeEventListener('resize',layout); window.removeEventListener('keydown',onKeyDown); window.removeEventListener('keyup',onKeyUp); window.removeEventListener('blur',blur); window.removeEventListener('wheel',manualScroll); document.removeEventListener('visibilitychange',visibility) }
  }, [language, pause, play, requestPlay])
  useEffect(() => {
    document.documentElement.classList.toggle('pacman-playing',active)
    return () => document.documentElement.classList.remove('pacman-playing')
  }, [active])
  function reset() {
    pause()
    document.documentElement.classList.remove('pacman-started')
    window.dispatchEvent(new Event('portfolio-reset'))
    lastDirection.current=[1,0]
    eatenLetters.current.forEach(letter => letter.classList.remove('letter-eaten'))
    eatenLetters.current.clear()
    setScore(0)
  }
  return <>
    <div className="page-game-world" aria-hidden="true">
      <div ref={actor} className="page-pacman" style={{transform:'translate3d(32px,155px,0)'}}><canvas ref={canvas} width="80" height="80"/></div>
    </div>
    <aside className="pacman-controls" aria-label={tr?'Sayfa Pac-Man oyunu':'Page Pac-Man game'}>
      <div className="pacman-control-row"><span>Pac-Man</span><button onClick={()=>active?pause():requestPlay()} aria-pressed={active}>{active?(tr?'Duraklat':'Pause'):(tr?'Oyna':'Play')}</button><output aria-live="polite">{tr?'Skor':'Score'}: {score}</output><button onClick={reset}>{tr?'Sıfırla':'Reset'}</button><button className="touch-toggle" onClick={()=>setTouch(!touch)} aria-expanded={touch} aria-controls="pacman-touch">{tr?'Yönler':'D-pad'}</button></div>
      <small>{tr?'WASD / oklar · Esc: duraklat':'WASD / arrows · Esc: pause'}</small>
      {touch && <div id="pacman-touch" className="pacman-touch">{['w','a','s','d'].map((key,index)=><button key={key} aria-label={(tr?['Yukarı','Sol','Aşağı','Sağ']:['Up','Left','Down','Right'])[index]} onPointerDown={event=>{ event.currentTarget.setPointerCapture(event.pointerId); const direction=directions[key]; if(!direction)return; keys.current.add(key); lastDirection.current=direction;requestPlay() }} onClick={event=>{const direction=directions[key];if(event.detail===0 && direction){lastDirection.current=direction;requestPlay()}}} onLostPointerCapture={()=>keys.current.delete(key)} onPointerUp={()=>keys.current.delete(key)} onPointerCancel={()=>{keys.current.delete(key);pause()}}>{['↑','←','↓','→'][index]}</button>)}</div>}
    </aside>
  </>
}
