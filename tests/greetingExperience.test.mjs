import { readFileSync } from 'node:fs'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import ts from 'typescript'
const source=readFileSync(new URL('../src/components/greetingTimeline.ts',import.meta.url),'utf8')
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText
const {dialogueFrame,introFrame,welcomeExitFrame}=await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)
test('dialogue types, holds, advances in order, and ends on the last message',()=>{
 const messages=['Hello','Robot','Play']
 assert.equal(dialogueFrame(messages,0).text,'')
 assert.equal(dialogueFrame(messages,68).text,'He')
 assert.equal(dialogueFrame(messages,190).typing,false)
 assert.equal(dialogueFrame(messages,1420).index,1)
 const end=dialogueFrame(messages,60000);assert.equal(end.text,'Play');assert.equal(end.done,true);assert.equal(end.typing,false)
})
test('Unicode characters are never split during typing',()=>{
 assert.equal(dialogueFrame(['Hi 🤖'],136).text,'Hi 🤖')
})
test('the bite follows forward motion and consumes the complete button',()=>{
 for(const width of [135,190,280]){
  let previous=-1
  for(let i=0;i<=20;i++){
   const frame=introFrame(i/20,width);assert.ok(frame.bite>=previous);assert.ok(frame.bite<=width);assert.equal(frame.done,i===20);previous=frame.bite
  }
  assert.equal(introFrame(1,width).bite,width)
 }
})
test('game handoff waits for the end and clamps frame stalls',()=>{
 assert.equal(introFrame(.999,200).done,false)
 assert.equal(introFrame(8,200).done,true)
 assert.equal(introFrame(8,200).bite,200)
 assert.equal(introFrame(-1,200).done,false)
})
test('the supplied sprite is drawn as articulated jaws with a completely black eye',async()=>{
 let renderer=readFileSync(new URL('../src/components/pacmanRenderer.ts',import.meta.url),'utf8').replace(/import pacmanSprite[^\n]*\n/,"const pacmanSprite='test-sprite.png'\n")
 const js=ts.transpileModule(renderer,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText
 const {renderPacman}=await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)
 globalThis.Image=class{complete=true;naturalWidth=204;src=''}
 globalThis.window={devicePixelRatio:1}
 const angles=[],images=[],eyes=[]
 const context={setTransform(){},clearRect(){},save(){},restore(){},beginPath(){},rect(){},clip(){},translate(){},rotate(angle){angles.push(angle)},drawImage(image){images.push(image)},ellipse(){eyes.push(this.fillStyle)},fill(){}}
 const canvas={width:0,height:0,getContext(){return context}}
 renderPacman(canvas,.08,100);const closed=[...angles];angles.length=0
 renderPacman(canvas,.58,100)
 assert.equal(images.length,4);assert.ok(images.every(image=>image.src==='test-sprite.png'))
 assert.ok(closed[0]>angles[0]);assert.ok(closed[1]<angles[1]);assert.deepEqual(eyes,['#000','#000']);assert.equal(canvas.width,100)
 delete globalThis.Image;delete globalThis.window
})

test('welcome exit keeps its size and stays horizontal even if the target is higher',()=>{
 const start={x:180,y:420},target={x:570,y:300}
 for(const progress of [0,.3,.65,.8,1])assert.equal(welcomeExitFrame(progress,start,200,1200,target).size,40)
 const finish=welcomeExitFrame(1,start,200,1200,target)
 assert.equal(finish.x,target.x);assert.equal(finish.y,start.y);assert.equal(finish.done,true)
 assert.equal(welcomeExitFrame(.65,start,200,1200,target).done,false)
})
test('narrow-screen exit stays within the viewport without reversing or moving down',()=>{
 const start={x:165,y:300},target={x:38,y:600}
 for(let i=0;i<=20;i++){
  const step=welcomeExitFrame(i/20,start,165,320,target)
  assert.ok(step.x>=20 && step.x<=296);assert.equal(step.y,start.y)
 }
})
