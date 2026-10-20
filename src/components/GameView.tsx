import { useState } from 'react'
import { copy, type Language } from '../data/content'

export function GameView({ language, src }: { language: Language; src: string | null }) {
  const [score, setScore] = useState(0)
  const [active, setActive] = useState(4)
  const t = copy[language]
  function connect(index: number) {
    if (index !== active || score >= 8) return
    setScore(score + 1)
    setActive((active + 2 + score % 3) % 9)
  }
  return <div className="inline-game" role="group" aria-label={src ? t.phaser : 'Circuit Break'}>
    {src ? <iframe src={src} title={t.phaser} sandbox="allow-scripts allow-same-origin allow-pointer-lock" allow="fullscreen" /> : <><p>{t.instructions}</p><p className="game-score" role="status">{score === 8 ? t.done : `${t.score}: ${score} / 8`}</p><div className="node-grid">{Array.from({length:9},(_,i)=><button key={i} className={score < 8 && active === i ? 'node active' : 'node'} disabled={score === 8} onClick={()=>connect(i)} aria-label={`${language === 'tr' ? 'Düğüm' : 'Node'} ${i+1}${active===i && score<8 ? (language==='tr'?' · aktif':' · active'):''}`}><span /></button>)}</div><button className="button secondary" onClick={()=>{setScore(0);setActive(4)}}>{t.restart} ↻</button></>}
  </div>
}
