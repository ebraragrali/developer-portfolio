type Wire = { color:'pink'|'purple'; width:number; path:string }
// A corner web: radial cables joined by bowed, irregular cross-cables.
const hub={x:1534,y:2}
const ends=[{x:890,y:0},{x:1170,y:86},{x:1410,y:145},{x:1472,y:290},{x:1520,y:460}]
const at=(index:number,t:number)=>({x:hub.x+(ends[index].x-hub.x)*t,y:hub.y+(ends[index].y-hub.y)*t})
const wires:Wire[]=ends.map((end,index)=>({color:index%2?'pink':'purple',width:index%2?13:11,path:`M${hub.x} ${hub.y} Q${(hub.x+end.x)/2+12} ${(hub.y+end.y)/2-6} ${end.x} ${end.y}`}))
const ties:{x:number;y:number;r:number}[]=[]
// Unequal spacing avoids a mechanically perfect grid. Each segment sags inward.
for(const [ring,t] of [.32,.64,1].entries()) {
 for(let index=0;index<ends.length-1;index++) {
  const start=at(index,t),end=at(index+1,t)
  const mid={x:(start.x+end.x)/2,y:(start.y+end.y)/2}
  const inset=ring===0?.13:.23
  const control={x:mid.x+(hub.x-mid.x)*inset,y:mid.y+(hub.y-mid.y)*inset}
  wires.push({color:(ring+index)%3===0?'pink':'purple',width:8+ring,path:`M${start.x} ${start.y} Q${control.x} ${control.y} ${end.x} ${end.y}`})
  if(index>0 && (ring+index)%2===0)ties.push({x:start.x,y:start.y,r:Math.atan2(ends[index].y-hub.y,ends[index].x-hub.x)*180/Math.PI-90})
 }
}
function Cable({wire}:{wire:Wire}) {
 const pink=wire.color==='pink'
 return <g fill="none" strokeLinecap="round" filter="url(#cable-shadow)">
  <path d={wire.path} stroke="#080710" strokeWidth={wire.width+3}/>
  <path d={wire.path} stroke={pink?'#691243':'#211334'} strokeWidth={wire.width}/>
  <path d={wire.path} stroke={pink?'#bc247d':'#50306c'} strokeWidth={wire.width*.72} transform="translate(0 -1)"/>
  <path d={wire.path} stroke={pink?'#f060b9':'#9770ba'} strokeWidth={wire.width*.3} transform="translate(0 -2)"/>
  <path d={wire.path} stroke={pink?'#ffd6ee':'#d1b6ee'} strokeWidth={pink?1.05:.65} opacity={pink?.9:.7} transform="translate(0 -2.6)"/>
 </g>
}
export function ElectricalCables() {
 return <div className="electrical-cables" aria-hidden="true"><svg viewBox="0 0 1536 1024" preserveAspectRatio="none"><defs><filter id="cable-shadow" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#000" floodOpacity=".8"/></filter><linearGradient id="cable-tie" x2="1" y2="0"><stop stopColor="#100d1c"/><stop offset=".45" stopColor="#3c244d"/><stop offset=".65" stopColor="#22132f"/><stop offset="1" stopColor="#0b0b15"/></linearGradient></defs>
  {wires.map((wire,index)=><Cable wire={wire} key={index}/>)}
  {ties.map((tie,index)=><g key={index} transform={`translate(${tie.x} ${tie.y}) rotate(${tie.r})`}><path d="M-5-10Q0-13 5-10L5 10Q0 12-5 10Z" fill="url(#cable-tie)" stroke="#734364" strokeWidth=".7"/><path d="M-5-7H5M-5 7H5" stroke="#a26c9d" strokeOpacity=".4" strokeWidth=".65"/><rect x="-6" y="-3" width="4" height="7" rx="1" fill="#20152d" stroke="#734364" strokeWidth=".5"/></g>)}
 </svg></div>
}

