const $=s=>document.querySelector(s);
const G={
net:'<svg viewBox="0 0 230 130" aria-hidden="true"><g stroke="var(--lil)" stroke-width="1.3"><path d="M115 65L50 30M115 65L60 100M115 65L180 25M115 65L185 95M115 65L150 120M115 65L90 15M50 30L20 60M185 95L215 70M180 25L212 40"/></g><g fill="var(--sil)"><circle cx="50" cy="30" r="5"/><circle cx="60" cy="100" r="5"/><circle cx="180" cy="25" r="5"/><circle cx="185" cy="95" r="5"/><circle cx="150" cy="120" r="4"/><circle cx="90" cy="15" r="4"/><circle cx="20" cy="60" r="4"/><circle cx="215" cy="70" r="4"/><circle cx="212" cy="40" r="4"/></g><circle cx="115" cy="65" r="14" fill="var(--mag)"/></svg>',
sched:'<svg viewBox="0 0 230 130" aria-hidden="true"><g><rect x="20" y="20" width="90" height="14" fill="var(--lil)"/><rect x="70" y="42" width="120" height="14" fill="var(--mag)"/><rect x="40" y="64" width="70" height="14" fill="var(--cor)"/><rect x="120" y="86" width="90" height="14" fill="var(--sil)"/></g><line x1="155" y1="10" x2="155" y2="120" stroke="var(--cor)" stroke-dasharray="4 4"/></svg>',
wave:'<svg viewBox="0 0 230 130" aria-hidden="true"><polyline fill="none" stroke="var(--lil)" stroke-width="2" points="10,80 30,80 40,40 52,95 64,30 78,85 92,70 110,70 120,50 130,75 150,75"/><g><rect x="170" y="90" width="10" height="20" fill="var(--sil)"/><rect x="184" y="70" width="10" height="40" fill="var(--lil)"/><rect x="198" y="48" width="10" height="62" fill="var(--cor)"/><rect x="212" y="24" width="10" height="86" fill="var(--mag)"/></g></svg>',
text:'<svg viewBox="0 0 230 130" aria-hidden="true"><g fill="var(--line)"><rect x="30" y="26" width="170" height="8"/><rect x="30" y="50" width="60" height="8"/><rect x="150" y="50" width="50" height="8"/><rect x="30" y="74" width="90" height="8"/><rect x="170" y="74" width="30" height="8"/><rect x="30" y="98" width="140" height="8"/></g><rect x="94" y="50" width="52" height="8" fill="var(--mag)"/><rect x="124" y="74" width="42" height="8" fill="var(--cor)"/></svg>',
site:'<svg viewBox="0 0 230 130" aria-hidden="true"><rect x="25" y="14" width="180" height="102" fill="none" stroke="var(--sil)" stroke-width="1.5"/><line x1="25" y1="32" x2="205" y2="32" stroke="var(--sil)"/><circle cx="37" cy="23" r="3" fill="var(--mag)"/><circle cx="48" cy="23" r="3" fill="var(--cor)"/><circle cx="59" cy="23" r="3" fill="var(--lil)"/><rect x="38" y="46" width="90" height="12" fill="var(--mag)"/><rect x="38" y="66" width="130" height="6" fill="var(--line)"/><rect x="38" y="78" width="110" height="6" fill="var(--line)"/><rect x="38" y="96" width="40" height="10" fill="var(--lil)"/></svg>'};
$("#skg").innerHTML=DATA.skills.map(s=>`<div><h3>${s[0]}</h3><span class="m">${s[1]}</span><p>${s[2].split(", ").join('<s>/</s>')}</p></div>`).join("");
const pad=n=>String(n).padStart(2,"0");
$("#pl").innerHTML=DATA.projects.map((p,i)=>`<button class="pj" data-i="${i}" aria-haspopup="dialog"><span class="n">${pad(i+1)}</span><div><h3>${p.name}</h3><p>${p.desc}</p><span class="st ${p.kind}">${p.status}</span><span class="m" style="color:var(--mute)">${p.tech}</span></div><div class="gx">${G[p.g]}</div></button>`).join("");
const dlg=$("#dlg");
let cleanup=null;
function openP(i){const p=DATA.projects[i];$("#ds").textContent=p.status;$("#ds").className="st "+p.kind;$("#dt").textContent=p.name;
$("#demo").innerHTML="";cleanup=DEMO[p.id]?DEMO[p.id]($("#demo")):null;
$("#dl").innerHTML=p.more.map(x=>"<li>"+x+"</li>").join("");$("#dg").textContent="";
$("#dk").innerHTML=p.links.map(l=>`<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join(" | ");dlg.showModal()}
dlg.addEventListener("close",()=>{if(cleanup){cleanup();cleanup=null}$("#demo").innerHTML=""});
document.querySelectorAll(".pj").forEach(b=>b.onclick=()=>openP(+b.dataset.i));
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
$("#exl").innerHTML=DATA.exp.map(e=>`<div class="ex"><div class="m w">${e.when}</div><div><h3>${e.org}</h3><span class="m" style="color:var(--lil)">${e.role}</span><p>${e.text}</p></div></div>`).join("");
$("#nm").innerHTML=DATA.nums.map(n=>`<div><b>${n[0]}</b>${n[1]}</div>`).join("");
$("#ll").innerHTML=DATA.lead.map(l=>`<div><h3>${l.t}</h3><p>${l.d}${l.url?` <a href="${l.url}" target="_blank" rel="noopener">${l.url}</a>`:""}</p></div>`).join("");

/* theme */
const root=document.documentElement;
function setTheme(t){root.dataset.theme=t;try{localStorage.setItem("theme",t)}catch(e){}}
$("#th").onclick=()=>setTheme(root.dataset.theme==="dark"?"light":"dark");
/* mobile menu */
const lk=$("#links"),bg=$("#burger");
bg.onclick=()=>{const o=lk.classList.toggle("open");bg.setAttribute("aria-expanded",o);bg.textContent=o?"Close":"Menu"};
lk.addEventListener("click",e=>{if(e.target.tagName==="A"){lk.classList.remove("open");bg.setAttribute("aria-expanded","false");bg.textContent="Menu"}});
/* copy email */
$("#cp").onclick=async()=>{try{await navigator.clipboard.writeText(DATA.contact.email);$("#cps").textContent="Email copied."}catch(e){$("#cps").textContent="Copy failed. Select the address above instead."}};
/* scroll spy */
const nl=[...document.querySelectorAll("#links a")];
["home","about","skills","projects","experience","leadership","contact"].forEach(id=>{const el=document.getElementById(id);new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)nl.forEach(l=>l.classList.toggle("on",l.getAttribute("href")==="#"+id))}),{rootMargin:"-40% 0px -55% 0px"}).observe(el)});

/* command interface */
const T=$("#term"),out=$("#out"),cmd=$("#cmd"),sug=$("#sug");let hist=[],hi=0;
const say=h=>{out.insertAdjacentHTML("beforeend",h+"\n");out.scrollTop=out.scrollHeight};
const P=DATA.projects,link=(u,l)=>`<a href="${u}" target="_blank" rel="noopener">${l||u}</a>`;
const C={
help:()=>`Commands:\n  <span class="pp">whoami about skills projects experience education achievements contact theme breach clear</span>\n  <span class="pp">open &lt;name&gt;</span>   ${P.map(p=>p.id).join(", ")}\nTab completes. Up and Down recall history. Esc closes.`,
whoami:()=>`<span class="pp">Fathima Hisana Nissar</span>\nComputer Science Undergraduate | Software Development | AI/ML | Cybersecurity\nB.Tech CSE, Amrita Vishwa Vidyapeetham, Bengaluru. Expected 2028.`,
about:()=>`B.Tech CSE student, graduating 2028, CGPA 8.9/10.\nI like solving problems through code, exploring emerging technologies, and building practical software.\nInterests: software engineering, DSA, machine learning, AI, cybersecurity.`,
skills:()=>DATA.skills.map(s=>`<span class="cc">${s[0]}</span>\n  ${s[2]}`).join("\n"),
projects:()=>P.map(p=>`<span class="pp">${p.id}</span>  ${p.name}  <span class="mm">[${p.status}]</span>`).join("\n")+`\nType <span class="pp">open &lt;name&gt;</span> for details.`,
experience:()=>DATA.exp.map(e=>`<span class="cc">${e.org}</span>  ${e.role}\n  ${e.when}. ${e.text}`).join("\n"),
education:()=>`B.Tech, Computer Science and Engineering\nAmrita Vishwa Vidyapeetham, Bengaluru\nExpected 2028, CGPA 8.9/10`,
achievements:()=>DATA.nums.map(n=>`<span class="cc">${n[0]}</span>  ${n[1]}`).join("\n")+"\n"+DATA.lead.map(l=>`<span class="cc">${l.t}</span>\n  ${l.d}${l.url?" "+link(l.url):""}`).join("\n"),
contact:()=>`Email     ${link("mailto:"+DATA.contact.email,DATA.contact.email)}\nGitHub    ${link(DATA.contact.github)}\nLinkedIn  ${link(DATA.contact.linkedin)}`,
theme:()=>{setTheme(root.dataset.theme==="dark"?"light":"dark");return`Theme set to ${root.dataset.theme}.`},
open:a=>{if(a==="face"){window.open("https://asebface.in/","_blank","noopener");return"Opening asebface.in in a new tab."}
const i=P.findIndex(p=>p.id===a);if(i<0)return`No project called "${a}". Try: ${P.map(p=>p.id).join(", ")}`;hide();openP(i);return""},
breach:()=>{hide();setTimeout(breach,200);return""},
clear:()=>{out.innerHTML="";return""}};
const names=Object.keys(C);
sug.innerHTML=["help","projects","open fake-news","skills","contact","breach"].map(s=>`<button type="button">${s}</button>`).join("");
sug.addEventListener("click",e=>{if(e.target.tagName==="BUTTON"){cmd.value=e.target.textContent;run()}});
function run(){const v=cmd.value.trim();cmd.value="";if(!v)return;hist.push(v);hi=hist.length;
const esc=v.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));say(`<span class="pp">$</span> ${esc}`);
const [c,...r]=v.split(/\s+/);const f=C[c.toLowerCase()];const res=f?f(r.join(" ").toLowerCase()):`Command not found: ${esc}. Type help to see what I can do.`;if(res)say(res)}
cmd.addEventListener("keydown",e=>{
if(e.key==="Enter")run();
else if(e.key==="ArrowUp"){e.preventDefault();if(hi>0)cmd.value=hist[--hi]}
else if(e.key==="ArrowDown"){e.preventDefault();cmd.value=hi<hist.length-1?hist[++hi]:(hi=hist.length,"")}
else if(e.key==="Tab"){e.preventDefault();const v=cmd.value;if(v.startsWith("open ")){const q=v.slice(5),m=P.map(p=>p.id).filter(k=>k.startsWith(q));if(m.length===1)cmd.value="open "+m[0]}else{const m=names.filter(k=>k.startsWith(v));if(m.length===1)cmd.value=m[0]}}});
let last=null;
function show(){last=document.activeElement;T.classList.add("show");T.setAttribute("aria-hidden","false");if(!out.innerHTML)say(`<span class="mm">Portfolio command interface. It only explores this site. Type help to begin.</span>`);cmd.focus()}
function hide(){T.classList.remove("show");T.setAttribute("aria-hidden","true");if(last&&last.focus)last.focus()}
$("#ot").onclick=show;$("#ct").onclick=hide;T.addEventListener("click",e=>{if(e.target===T)hide()});
addEventListener("keydown",e=>{
const tg=e.target,typing=tg&&(tg.tagName==="INPUT"||tg.tagName==="TEXTAREA"||tg.isContentEditable)&&tg!==cmd;
if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){if(typing)return;e.preventDefault();T.classList.contains("show")?hide():show()}
if(e.key==="Escape"&&T.classList.contains("show"))hide()});
/* signal breach */
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches,HOV=matchMedia("(hover:hover)").matches;
const gl=[...document.querySelectorAll(".gl")];
function heroGlitch(){gl.forEach((e,i)=>setTimeout(()=>{e.classList.add("go");setTimeout(()=>e.classList.remove("go"),RM?650:520)},i*70))}
let busy=false;
function breach(){if(busy)return;busy=true;heroGlitch();document.body.classList.add("breach");setTimeout(()=>{document.body.classList.remove("breach");busy=false},RM?700:650)}
const por=$("#por");
for(let i=0;i<6;i++){const c=por.querySelector(".f").cloneNode(true);c.classList.add("sl");c.setAttribute("aria-hidden","true");c.style.clipPath=`inset(${i*16.66}% 0 ${100-(i+1)*16.66}% 0)`;c.style.setProperty("--x",((i%2?1:-1)*(10+i*4))+"px");c.style.borderLeft="3px solid "+["var(--mag)","var(--cor)","var(--lil)"][i%3];por.appendChild(c)}
por.addEventListener("click",breach);
por.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();breach()}});
if(HOV)por.addEventListener("pointerenter",breach);
let hc=0;$("#h1").addEventListener("pointerenter",()=>{if(Date.now()-hc>2500){hc=Date.now();heroGlitch()}});
setTimeout(heroGlitch,800);
if(!RM){setInterval(()=>{if(!document.hidden)heroGlitch()},20000);
setInterval(()=>{if(T.classList.contains("show")){const h=document.querySelector(".tp header");h.classList.add("fl");setTimeout(()=>h.classList.remove("fl"),240)}},6000);
document.querySelectorAll("h2").forEach(h=>{const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){h.classList.add("hit");setTimeout(()=>h.classList.remove("hit"),450);o.disconnect()}},{threshold:.6});o.observe(h)})}
/* ===== project demos (simulated examples) ===== */
const cs=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
function el(h){const d=document.createElement("div");d.className="demo";d.innerHTML=h;return d}
function mountNet(box){
const d=el(`<span class="m" style="color:var(--cor)">Simulated example: a 40-node network</span><canvas width="560" height="200" role="img" aria-label="Rumor spreading on a small network" style="width:100%;display:block;margin:8px 0;cursor:crosshair"></canvas><div class="dc"><button class="ib" data-a="s">Start rumor</button><button class="ib" data-a="h">Fact-check hubs</button><button class="ib" data-a="r">Fact-check random</button><button class="ib" data-a="t">Run 200 trials</button></div><p class="dm m" role="status">Click a node or press Start rumor.</p>`);
box.appendChild(d);
const cv=d.querySelector("canvas"),cx=cv.getContext("2d"),out=d.querySelector(".dm"),N=40,K=3;
const X=[],Y=[],adj=[],E=[],deg=[];
for(let i=0;i<N;i++){X.push(20+Math.random()*520);Y.push(14+Math.random()*172);adj.push([]);deg.push(0)}
const ln=(a,b)=>{E.push([a,b]);adj[a].push(b);adj[b].push(a);deg[a]++;deg[b]++};
ln(0,1);ln(1,2);ln(0,2);
for(let i=3;i<N;i++){const t=new Set();while(t.size<2){let r=Math.random()*E.length*2,c=0;for(let j=0;j<i;j++){c+=deg[j];if(r<c){t.add(j);break}}}t.forEach(j=>ln(i,j))}
const order=[...Array(N).keys()].sort((a,b)=>deg[b]-deg[a]);
let blocked=new Set(),st=new Array(N).fill(0),inf=[],reach=0,mode="";
const rnd=b=>{let i;do{i=Math.floor(Math.random()*N)}while(b.has(i));return i};
const randSet=()=>{const b=new Set();while(b.size<K)b.add(Math.floor(Math.random()*N));return b};
function sim(b,s0){const s=new Array(N).fill(0);s[s0]=1;let f=[s0],n=1;while(f.length){const nx=[];f.forEach(i=>adj[i].forEach(j=>{if(!s[j]&&!b.has(j)&&Math.random()<.4){s[j]=1;nx.push(j);n++}}));f=nx}return n}
function draw(){const lil=cs("--lil"),sil=cs("--sil"),cor=cs("--cor"),mag=cs("--mag"),line=cs("--line");cx.clearRect(0,0,560,200);
E.forEach(([a,b])=>{const h=st[a]===1||st[b]===1;cx.strokeStyle=h?cor:line;cx.lineWidth=h?2:1;cx.beginPath();cx.moveTo(X[a],Y[a]);cx.lineTo(X[b],Y[b]);cx.stroke()});
for(let i=0;i<N;i++){cx.beginPath();cx.arc(X[i],Y[i],3+Math.sqrt(deg[i])*1.5,0,7);if(blocked.has(i)){cx.strokeStyle=sil;cx.lineWidth=1.5;cx.setLineDash([3,3]);cx.stroke();cx.setLineDash([])}else{cx.fillStyle=st[i]===1?cor:st[i]===2?sil:deg[i]>6?mag:lil;cx.fill()}}}
function reset(){st=new Array(N).fill(0);inf=[];reach=0}
function start(i){if(blocked.has(i)||inf.length)return;reset();st[i]=1;inf=[i];reach=1;out.textContent="Rumor spreading...";draw()}
const tm=setInterval(()=>{if(!inf.length)return;const nx=[];inf.forEach(i=>{adj[i].forEach(j=>{if(!st[j]&&!blocked.has(j)&&Math.random()<.4){st[j]=1;nx.push(j);reach++}});st[i]=2});inf=nx;if(!inf.length)out.textContent=`The rumor reached ${reach} of ${N-blocked.size} reachable nodes.`;draw()},350);
function setB(m){reset();mode=mode===m?"":m;blocked=new Set();if(mode==="h")order.slice(0,K).forEach(i=>blocked.add(i));if(mode==="r")randSet().forEach(i=>blocked.add(i));out.textContent=mode==="h"?"Top 3 hubs fact-checked (dashed). Start a rumor.":mode==="r"?"3 random nodes fact-checked (dashed). Start a rumor.":"No fact-checking. Start a rumor.";draw()}
cv.onclick=e=>{const r=cv.getBoundingClientRect(),k=560/r.width;let bi=0,bd=1e9;for(let i=0;i<N;i++){const q=(X[i]-(e.clientX-r.left)*k)**2+(Y[i]-(e.clientY-r.top)*k)**2;if(q<bd){bd=q;bi=i}}start(bi)};
d.addEventListener("click",e=>{const a=e.target.dataset&&e.target.dataset.a;
if(a==="s")start(rnd(blocked));else if(a==="h"||a==="r")setB(a);
else if(a==="t"){const hubs=new Set(order.slice(0,K)),mean=f=>{let t=0;for(let k=0;k<200;k++){const b=f();t+=sim(b,rnd(b))}return(t/200).toFixed(1)};
out.textContent=`Mean reach over 200 trials (of ${N} nodes): no checks ${mean(()=>new Set())}, hubs checked ${mean(()=>hubs)}, random nodes checked ${mean(randSet)}.`}});
draw();return()=>clearInterval(tm)}

function mountSched(box){
const A=[["Washing machine",2,18],["Dishwasher",1,19],["Geyser",1,18],["Iron",1,18]],P0=18,P1=22;
const occ=new Array(24).fill(false),after=[];
A.forEach(([n,dur,pref])=>{let best=0,bc=1e9;for(let s=0;s+dur<=24;s++){let ok=true;for(let h=s;h<s+dur;h++)if((h>=P0&&h<P1)||occ[h])ok=false;if(ok&&Math.abs(s-pref)<bc){bc=Math.abs(s-pref);best=s}}for(let h=best;h<best+dur;h++)occ[h]=true;after.push(best)});
const before=A.map(a=>a[2]);
const d=el(`<span class="m" style="color:var(--cor)">Simulated example: four household activities over a day</span><div style="margin:10px 0">${A.map(a=>`<div class="sr"><span>${a[0]}</span><div class="tr"><div class="bar"></div></div></div>`).join("")}<div class="sr"><span></span><div class="m" style="display:flex;justify-content:space-between"><span>0:00</span><span>12:00</span><span>24:00</span></div></div></div><div class="dc"><button class="ib" data-m="b">Without scheduling</button><button class="ib" data-m="a">With the scheduler</button></div><p class="dm m" role="status"></p><p class="m" style="color:var(--mute);margin:6px 0 0">The shaded band is an illustrative peak window (6 to 10 pm), not the actual BESCOM tariff bands.</p>`);
box.appendChild(d);
const bars=[...d.querySelectorAll(".bar")],out=d.querySelector(".dm");
function show(m){const st=m==="a"?after:before;let pk=0,mx=0;st.forEach((s,i)=>{const dur=A[i][1];bars[i].style.left=s/24*100+"%";bars[i].style.width=dur/24*100+"%";if(s<P1&&s+dur>P0)pk++});
for(let h=0;h<24;h++){let c=0;st.forEach((s,i)=>{if(h>=s&&h<s+A[i][1])c++});mx=Math.max(mx,c)}
out.textContent=`${m==="a"?"With the scheduler":"Without scheduling"}: ${pk} of 4 activities touch the peak window, up to ${mx} run at once.`}
d.addEventListener("click",e=>{const m=e.target.dataset&&e.target.dataset.m;if(m)show(m)});
show("b");return null}

function mountSafe(box){
const L=["Safe","Caution","Danger","Critical"],TH=[32,38,43],AH=[40,60,80];
const d=el(`<span class="m" style="color:var(--cor)">Simulated example: sensor readings</span>
<label>Temperature: <b class="tv">28</b> °C<input type="range" min="20" max="50" value="28" class="rt"></label>
<label>Air quality index (relative): <b class="av">20</b><input type="range" min="0" max="100" value="20" class="ra"></label>
<p style="margin:12px 0 4px">Alert level: <span class="lv">Safe</span></p>
<div class="dc"><button class="ib fb">Simulate a fall</button></div>
<div class="stp"><span class="on">Normal</span><span>Impact detected</span><span>No movement</span><span>Alert sent</span></div>
<p class="dm m">Thresholds are illustrative, not the device’s calibrated values. Levels step down only after a reading falls a margin below its threshold.</p>`);
box.appendChild(d);
let cT=0,cA=0;const lvf=(v,th,m,c)=>{const up=th.filter(t=>v>=t).length,dn=th.filter(t=>v>=t-m).length;return up>c?up:dn<c?dn:c};
const rt=d.querySelector(".rt"),ra=d.querySelector(".ra"),lv=d.querySelector(".lv");
function upd(){d.querySelector(".tv").textContent=rt.value;d.querySelector(".av").textContent=ra.value;cT=lvf(+rt.value,TH,2,cT);cA=lvf(+ra.value,AH,5,cA);const l=Math.max(cT,cA);lv.textContent=L[l];lv.className="lv l"+l}
rt.oninput=ra.oninput=upd;
const sp=[...d.querySelectorAll(".stp span")];let tms=[];
const setS=i=>sp.forEach((x,k)=>x.classList.toggle("on",k===i));
d.querySelector(".fb").onclick=()=>{tms.forEach(clearTimeout);tms=[];setS(0);[1,2,3].forEach((k,j)=>tms.push(setTimeout(()=>setS(k),(j+1)*800)))};
return()=>tms.forEach(clearTimeout)}

function mountClick(box){
const R=[["Listicle",/\b\d+\s+(things|ways|reasons|tips|facts|secrets|signs)\b|^\d+\s/i],["Curiosity gap",/won[’']t believe|doctors won[’']t|what happens next|the (real )?reason|secret|nobody (tells|talks)|you[’']ll never/i],["Exaggeration",/amazing|shocking|insane|incredible|unbelievable|mind-?blowing|best ever|worst ever|!/i],["Forward referencing",/\b(this|these|here[’']s|here is)\b/i]];
const S=["10 Things Doctors Won’t Tell You About Sleep","You Won’t Believe What This Student Built","Study finds sleep affects exam scores"];
const d=el(`<span class="m" style="color:var(--cor)">Simulated example: a toy rule-based checker, not the trained model</span>
<label>Headline<input type="text" class="hl" value="${S[0]}"></label>
<div class="dc">${S.map((x,i)=>`<button class="ib" data-i="${i}">Sample ${i+1}</button>`).join("")}</div><div class="res" role="status"></div>`);
box.appendChild(d);
const inp=d.querySelector(".hl"),res=d.querySelector(".res");
function run(){res.textContent="";const t=inp.value;let n=0;R.forEach(([name,re])=>{const m=t.match(re);if(m){n++;const sp=document.createElement("span");sp.className="tg";sp.textContent=name+": “"+m[0]+"”";res.appendChild(sp)}});if(!n){const p=document.createElement("span");p.className="m";p.style.color="var(--mute)";p.textContent="No clickbait tactic found.";res.appendChild(p)}}
inp.oninput=run;d.addEventListener("click",e=>{const i=e.target.dataset&&e.target.dataset.i;if(i!==undefined){inp.value=S[i];run()}});
run();return null}
const DEMO={"fake-news":mountNet,aabs:mountSched,safeshift:mountSafe,clickbait:mountClick};
