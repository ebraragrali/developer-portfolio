import pacmanSprite from '../assets/pacman/character.png'
/** Render and articulate the supplied Pac-Man sprite, without replacing its design. */
let image:HTMLImageElement|null=null
export function renderPacman(canvas:HTMLCanvasElement,opening:number,size=40) {
 if(!image){image=new Image();image.src=pacmanSprite}
 if(!image.complete || !image.naturalWidth){image.addEventListener('load',()=>renderPacman(canvas,opening,size),{once:true});return}
 const ctx=canvas.getContext('2d');if(!ctx)return
 const scale=Math.min(window.devicePixelRatio||1,2)
 if(canvas.width!==size*scale){canvas.width=size*scale;canvas.height=size*scale}
 ctx.setTransform(scale*size/40,0,0,scale*size/40,0,0);ctx.clearRect(0,0,40,40)
 const close=Math.max(0,.58-opening)*1.1
 // Animate the supplied character's two jaws around its mouth hinge.
 for(const upper of [true,false]){
  ctx.save();ctx.beginPath();ctx.rect(0,upper?0:20,40,20);ctx.clip()
  ctx.translate(23,20);ctx.rotate(upper?close:-close);ctx.translate(-23,-20)
  ctx.drawImage(image,2,2,36,36)
  if(upper){ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(24,11.7,1.9,2.5,0,0,Math.PI*2);ctx.fill()}
  ctx.restore()
 }
}
