import { readFileSync } from 'node:fs'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import ts from 'typescript'
const source = readFileSync(new URL('../src/components/gamePhysics.ts',import.meta.url),'utf8')
const js = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText
const { movement, advance, touches } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)
test('WASD and arrow keys select matching directions',()=>{
  for(const [key,expected] of Object.entries({w:{x:0,y:-1},arrowup:{x:0,y:-1},a:{x:-1,y:0},arrowleft:{x:-1,y:0},s:{x:0,y:1},arrowdown:{x:0,y:1},d:{x:1,y:0},arrowright:{x:1,y:0}})) assert.deepEqual(movement([key],[1,0]),expected)
})
test('diagonal speed is normalized and opposing keys cancel',()=>{
  const diagonal=movement(['w','d'],[1,0]);assert.ok(Math.abs(Math.hypot(diagonal.x,diagonal.y)-1)<1e-12);assert.ok(diagonal.x>0 && diagonal.y<0)
  assert.deepEqual(movement(['a','d'],[1,0]),{x:0,y:0})
})
test('motion is frame-rate independent and travels beyond the viewport',()=>{
  let a={x:100,y:200},b={...a};for(let i=0;i<120;i++) a=advance(a,{x:0,y:1},1/60,1200,5000);for(let i=0;i<60;i++) b=advance(b,{x:0,y:1},1/30,1200,5000)
  assert.ok(Math.abs(a.y-b.y)<1e-8);assert.ok(a.y>600)
})
test('world boundaries and long frame stalls are bounded',()=>{
  assert.equal(advance({x:21,y:121},{x:-1,y:-1},.04,1000,3000).x,20)
  assert.equal(advance({x:979,y:2975},{x:1,y:1},.04,1000,3000).y,2976)
  assert.equal(advance({x:100,y:200},{x:1,y:0},5,1000,3000).x,109.6)
})
test('collectible collision includes close symbols and excludes distant ones',()=>{
  assert.equal(touches({x:100,y:100},{x:125,y:120}),true)
  assert.equal(touches({x:100,y:100},{x:140,y:100}),false)
})
