export function dialogueFrame(messages: readonly string[], elapsed: number, characterMs = 34, holdMs = 1250) {
  let remaining = Math.max(0,elapsed)
  for(let index=0;index<messages.length;index++) {
    const characters=Array.from(messages[index])
    const typingMs=characters.length*characterMs
    if(remaining<typingMs+holdMs) return {text:characters.slice(0,Math.floor(remaining/characterMs)).join(''),index,typing:remaining<typingMs,done:false}
    remaining-=typingMs+holdMs
  }
  return {text:messages[messages.length-1] ?? '',index:messages.length-1,typing:false,done:true}
}
export function introFrame(progress:number, width:number) {
 const t=Math.max(0,Math.min(1,progress))
 // Travel through the actual button surface; the bite boundary follows the mouth.
 const x=44+(width+16-44)*t
 return {x,bite:Math.max(0,Math.min(width,x+16)),done:t>=1}
}

/** Fixed-size character leaves its bubble horizontally to the right. */
export function welcomeExitFrame(progress:number, start:{x:number;y:number}, buttonWidth:number, viewportWidth:number, target:{x:number;y:number}) {
 const t=Math.max(0,Math.min(1,progress))
 const eating=introFrame(Math.min(1,t/.65),buttonWidth)
 const exit=Math.max(0,(t-.65)/.35)
 const consumedX=Math.min(viewportWidth-24,start.x+buttonWidth-28)
 const centerX=Math.min(viewportWidth-24,start.x+eating.x-44)
 const exitX=Math.max(consumedX,Math.min(viewportWidth-24,target.x))
 return {x:centerX+(exitX-consumedX)*exit,y:start.y,bite:eating.bite,size:40,done:t>=1}
}
