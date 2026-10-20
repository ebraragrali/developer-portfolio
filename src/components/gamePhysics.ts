export type Point = { x: number; y: number }
export const keyVectors: Record<string, readonly [number, number]> = {
  w: [0,-1], arrowup: [0,-1], a: [-1,0], arrowleft: [-1,0],
  s: [0,1], arrowdown: [0,1], d: [1,0], arrowright: [1,0],
}
export function movement(keys: Iterable<string>, fallback: readonly [number, number]): Point {
  let x = 0, y = 0, count = 0
  for(const key of keys) { const vector=keyVectors[key]; if(vector) { x+=vector[0];y+=vector[1];count++ } }
  if(!count) [x,y]=fallback
  const length=Math.hypot(x,y)
  return length ? {x:x/length,y:y/length} : {x:0,y:0}
}
export function advance(point: Point, vector: Point, dt: number, width: number, height: number): Point {
  return { x:Math.max(20,Math.min(width-20,point.x+vector.x*240*Math.min(dt,.04))), y:Math.max(120,Math.min(height-24,point.y+vector.y*240*Math.min(dt,.04))) }
}
export function touches(a: Point,b: Point) { return Math.hypot(a.x-b.x,a.y-b.y)<39 }
