import { readFileSync } from 'node:fs'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { createRequire } from 'node:module'
import { pathToFileURL, fileURLToPath } from 'node:url'
import path from 'node:path'
import ts from 'typescript'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
const require=createRequire(import.meta.url)
const cache=new Map()
function moduleUrl(filename){
 if(filename.endsWith('.png'))return `data:text/javascript;base64,${Buffer.from(`export default ${JSON.stringify(pathToFileURL(filename).href)}`).toString('base64')}`
 if(cache.has(filename))return cache.get(filename)
 const source=readFileSync(filename,'utf8').replace(/^import\s+['"][^'"]+\.css['"];?\s*$/gm,'')
 let js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX}}).outputText
 js=js.replace(/from\s+["']([^"']+)["']/g,(_,specifier)=>{
  let target
  if(specifier.startsWith('.')){
   const base=path.resolve(path.dirname(filename),specifier)
   target=moduleUrl(['.tsx','.ts',''].map(extension=>base+extension).find(candidate=>{try{readFileSync(candidate);return true}catch{return false}}))
  }else target=pathToFileURL(require.resolve(specifier)).href
  return `from ${JSON.stringify(target)}`
 })
 const url=`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`
 cache.set(filename,url);return url
}
const {PortfolioSections,AboutSection}=await import(moduleUrl(fileURLToPath(new URL('../src/components/PortfolioSections.tsx',import.meta.url))))
for(const language of ['tr','en'])test(`${language}: real sections, complete project links, certificates and private-CV contact policy`,()=>{
 const html=renderToStaticMarkup(React.createElement(PortfolioSections,{language}))
 for(const id of ['about','education','skills','projects','playground','experience','certifications','contact'])assert.ok(html.includes(`id="${id}"`),id)
 for(const repo of ['database_school_management_project','real-vs-ai-faces','YZTA-Bootcamp','teknofest-model-uydu-gui-2025']){
  const tag=html.match(new RegExp(`<a[^>]+href="https://github.com/ebraragrali/${repo}"[^>]*>`))
  assert.ok(tag,repo);assert.match(tag[0],/target="_blank"/);assert.match(tag[0],/rel="noopener noreferrer"/)
 }
 assert.equal((html.match(/class="portfolio-project /g)||[]).length,4)
 assert.ok(html.includes('mailto:ebraragrali1@gmail.com'))
 assert.ok(html.includes('https://github.com/ebraragrali'))
 assert.ok(html.includes('https://www.linkedin.com/in/ebraragrali'))
 assert.equal((html.match(/class="certification-year"/g)||[]).length,5)
 assert.doesNotMatch(html,/download=|href="[^\"]*\.pdf|PLACEHOLDER|Your project|Yer tutucu|\[University/)
 assert.ok(html.indexOf('TURKCELL')<html.indexOf('LABRIS NETWORKS'))
 assert.ok(html.indexOf('LABRIS NETWORKS')<html.indexOf('CONFIGGO'))
 if(language==='tr'){assert.ok(html.includes('Eylül 2026'));assert.ok(html.includes('Veri Ön İşleme'));assert.doesNotMatch(html,/CV’mi e-posta|contact-cv-note/)}
 else {assert.ok(html.includes('September 2026'));assert.ok(html.includes('Data Preprocessing'));assert.ok(html.includes('Fourth year'));assert.doesNotMatch(html,/request my CV|contact-cv-note/);assert.doesNotMatch(html,/Sertifikası|Devam ediyor|Ön İşleme/)}
})

const {RobotGreeting}=await import(moduleUrl(fileURLToPath(new URL('../src/components/RobotGreeting.tsx',import.meta.url))))
for(const language of ['tr','en'])test(`${language}: a single static welcome character replaces all robot layers`,()=>{
 globalThis.document={documentElement:{classList:{contains(){return false}}}}
 try {
  const html=renderToStaticMarkup(React.createElement(RobotGreeting,{language}))
  assert.equal((html.match(/<img /g)||[]).length,1)
  assert.ok(html.includes('pink-heart-robot-3d.png'))
  assert.doesNotMatch(html,/robot-arm-layer|robot-face-layer|mascot-v2|typing-cursor/)
  assert.ok(html.includes(language==='tr'?'Portfolyoma hoş geldiniz.':'Welcome to my portfolio.'))
  assert.ok(html.includes(language==='tr'?'Karşılama mesajını kapat':'Dismiss welcome'))
  assert.ok(html.includes('pacman-launch-button'))
 } finally {delete globalThis.document}
})

test('the About section appears once when placed beside the desk',()=>{
 const html=renderToStaticMarkup(React.createElement(React.Fragment,null,React.createElement(AboutSection,{language:'tr',compact:true}),React.createElement(PortfolioSections,{language:'tr',includeAbout:false})))
 assert.equal((html.match(/id="about"/g)||[]).length,1)
 assert.ok(html.includes('hero-about'))
})

test('playground links back to the game and the contact letter has exactly three actions',()=>{
 const html=renderToStaticMarkup(React.createElement(PortfolioSections,{language:'tr'}))
 assert.ok(html.includes('href="#game-start"'))
 assert.ok(html.includes('playground-controller'))
 const letter=html.slice(html.indexOf('id="contact"'))
 assert.ok(letter.includes('mail-envelope'))
 assert.ok(letter.includes('mail-flap'))
 assert.ok(letter.includes('mail-paper'))
 assert.equal((letter.match(/class="mail-flap"/g)||[]).length,1)
 assert.equal((letter.match(/class="mail-paper"/g)||[]).length,1)
 assert.doesNotMatch(letter,/mail-flap-underlay/)
 assert.equal((letter.match(/<a /g)||[]).length,3)
 assert.doesNotMatch(letter,/CV|download|letter-signature|Ebrar/)
})
