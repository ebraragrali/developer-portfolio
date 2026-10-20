import type { Language } from '../data/content'

export function Workstation({ language }: { language: Language }) {
  const labels = language === 'tr' ? ['Projeler', 'Oyun alanı', 'Yetenekler', 'Hakkımda'] : ['Projects', 'Playground', 'Skills', 'About']
  return <div className="workstation">
    <svg viewBox="0 0 760 570" className="desk-svg" role="group" aria-label={language === 'tr' ? 'Monitör, klavye, kablo, defter ve oyun kumandası içeren çalışma masası' : 'Developer desk with monitor, keyboard, coiled cable, notebook and game controller'}>
      <defs>
        <linearGradient id="desk" x2="0.8" y2="1"><stop stopColor="#443853"/><stop offset="1" stopColor="#1b1a2b"/></linearGradient>
        <linearGradient id="frame" x2="1" y2="1"><stop stopColor="#8a829d"/><stop offset=".5" stopColor="#343344"/><stop offset="1" stopColor="#191a29"/></linearGradient>
        <pattern id="grid" width="36" height="20" patternUnits="userSpaceOnUse"><path d="M36 0H0V20" fill="none" stroke="#353246" strokeWidth=".5"/></pattern>
      </defs>
      <ellipse cx="390" cy="481" rx="302" ry="56" fill="#070b16" opacity=".65"/>
      <path d="M79 342 465 241 705 365 317 489Z" fill="url(#desk)" stroke="#666074"/>
      <path d="M79 342v17l238 148v-18M317 507l388-125v-17" fill="#171824" stroke="#454151"/>
      <path d="M104 365v98l15 9 5-95M662 397v78l14-4 7-80M310 503v39l15 7 9-47" fill="#242431" stroke="#50485f"/>
      <path d="M79 342 465 241 705 365 317 489Z" fill="url(#grid)" opacity=".6"/>
      <path d="M410 322c90 14 170-32 178 8s-93 7-82 49 97 17 107 46M320 375c-55-32-121-10-109-57s51-18 45-69" fill="none" stroke="#0c0f1d" strokeWidth="9"/>
      <path d="M410 322c90 14 170-32 178 8s-93 7-82 49 97 17 107 46" fill="none" stroke="#8773ba" strokeWidth="3"/>
      <path d="m363 278-2 63-44 13 56 29 71-21-48-23 1-63" fill="url(#frame)" stroke="#777086"/>
      <a href="#projects" aria-label={labels[0]} className="desk-object monitor-object"><title>{labels[0]}</title>
        <path d="m258 122 237-54 4 205-240 66Z" fill="url(#frame)" stroke="#898098" strokeWidth="2"/>
        <path d="m270 134 211-48 3 170-212 57Z" fill="#101c2b"/>
        <path d="m270 134 211-48v21l-211 49Z" fill="#24243b"/>
        <g fill="#a896d5"><circle cx="281" cy="141" r="2"/><circle cx="289" cy="139" r="2"/><circle cx="297" cy="137" r="2"/></g>
        <g transform="matrix(1,-.24,0,1,289,185)" fontFamily="Consolas, monospace" fontSize="12"><text fill="#777e9a">~/developer-lab</text><text y="29" fill="#b4a0ed">const developer = {'{'}</text><text y="51" x="12" fill="#b8c7d1">curiosity: true,</text><text y="73" x="12" fill="#b8c7d1">ideas: Infinity</text><text y="95" fill="#b4a0ed">{'}'};</text><text y="121" fill="#7ec5b2">&gt; build something_</text></g>
        <circle cx="380" cy="299" r="3" fill="#96d3bc"/>
      </a>
      <g transform="translate(269 367) rotate(-17) skewX(35)"><rect width="183" height="60" rx="5" y="5" fill="#141624"/><rect width="183" height="56" rx="5" fill="#646073" stroke="#8b8199"/>{Array.from({length: 4}, (_, row) => Array.from({length: 13}, (_, col) => <rect key={`${row}-${col}`} x={7+col*13} y={6+row*11} width="10" height="8" rx="1" fill={(row+col)%7===0?'#b09ad6':'#333344'}/>))}</g>
      <a href="#about" aria-label={labels[3]} className="desk-object"><title>{labels[3]}</title><path d="m144 351 66-19 65 39-67 22Z" fill="#151727" transform="translate(0 8)"/><path d="m144 351 66-19 65 39-67 22Z" fill="#aa91c7" stroke="#c5b0de"/><path d="m153 355 57-16 53 32-56 17Z" fill="#3b3454"/><path d="m165 357 31-8m-22 14 31-8m-23 14 19-5" stroke="#a695bc"/><path d="m200 335 63 39" stroke="#d1bddc" strokeWidth="2"/></a>
      <a href="#skills" aria-label={labels[2]} className="desk-object cable-object"><title>{labels[2]}</title>
        <path d="M524 314c-12-15 14-30 43-29 35 1 53 19 39 32-13 12-54 15-70 2-17-14 12-27 40-22 29 5 31 20 10 26-13 4-29 2-31-5s17-11 29-5c11 5 10 14 22 17l15 3" fill="none" stroke="#0b1020" strokeWidth="9" strokeLinecap="round"/>
        <path d="M524 311c-12-15 14-30 43-29 35 1 53 19 39 32-13 12-54 15-70 2-17-14 12-27 40-22 29 5 31 20 10 26-13 4-29 2-31-5s17-11 29-5c11 5 10 14 22 17l15 3" fill="none" stroke="#8775b2" strokeWidth="6" strokeLinecap="round"/>
        <path d="M524 309c-12-15 14-30 43-29 35 1 53 19 39 32" fill="none" stroke="#c2aedb" strokeWidth="1.5" strokeLinecap="round"/>
        <g transform="translate(516 300) rotate(-30)"><rect x="-9" y="-5" width="17" height="10" rx="3" fill="#44415e" stroke="#b7a5cf"/><rect x="-16" y="-4" width="8" height="8" rx="1" fill="#bcc4d3" stroke="#626c84"/><path d="M-13-2v4" stroke="#515c74"/></g>
        <g transform="translate(624 330) rotate(14)"><rect x="-5" y="-5" width="16" height="10" rx="3" fill="#44415e" stroke="#b7a5cf"/><rect x="10" y="-3" width="8" height="6" rx="2" fill="#bdc7d5" stroke="#626c84"/><path d="M12 0h4" stroke="#515c74"/></g>
      </a>
      <a href="#playground" aria-label={labels[1]} className="desk-object"><title>{labels[1]}</title><path d="M528 387c-9-10-30-5-38 8l-14 24c-7 15 6 24 17 11l12-11 32-3 19 8c16 8 24-6 11-17l-23-20Z" fill="#777087" stroke="#aea1bc" strokeWidth="2"/><path d="m497 397 4 18m-12-7 20-4" stroke="#242336" strokeWidth="5"/><circle cx="542" cy="398" r="4" fill="#baa0ee"/><circle cx="553" cy="405" r="4" fill="#91c5b2"/><circle cx="518" cy="412" r="5" fill="#333246"/></a>
      <g><path d="m181 296 30-8 3 36-22 7Z" fill="#b3a6bf"/><ellipse cx="196" cy="291" rx="16" ry="6" fill="#d7cada"/><ellipse cx="196" cy="291" rx="11" ry="3" fill="#342c3a"/><path d="M212 299c19-7 19 17 0 15" fill="none" stroke="#b3a6bf" strokeWidth="5"/></g>
      <g fill="#77718b" fontSize="9" fontFamily="Consolas, monospace"><text x="565" y="511">{language === 'tr' ? 'KEŞFETMEK İÇİN TIKLA ↗' : 'CLICK TO CONNECT ↗'}</text></g>
    </svg>
    <div className="desk-links">{['projects','playground','skills','about'].map((id,i)=><a href={`#${id}`} key={id}><span>0{i+1}</span>{labels[i]} ↗</a>)}</div>
  </div>
}

