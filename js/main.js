/* Rendering and interactions. Content lives in data.js, preview drawings in previews.js. */
document.documentElement.classList.add('js');

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced;
const byId = id => PROJECTS.find(p => p.id === id);
const lab = p => p.real ? '' : `<span class="sample">${T('illustration')}</span>`;

applyStatic();
$$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
try{ const y = sessionStorage.getItem('ac-scroll'); if(y){ sessionStorage.removeItem('ac-scroll'); addEventListener('load', () => scrollTo(0, +y)); } }catch(e){}

/* ---------- Tilt (subtle) ---------- */
function tilt(el, max){
  if(!fine || !el) return;
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', ((.5 - y) * max).toFixed(2) + 'deg');
    el.style.setProperty('--ry', ((x - .5) * max).toFixed(2) + 'deg');
    el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
    el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    el.style.setProperty('--px', (x * 2 - 1).toFixed(2));
    el.style.setProperty('--py', (y * 2 - 1).toFixed(2));
  });
  el.addEventListener('pointerleave', () => ['--rx','--ry','--px','--py'].forEach(k => el.style.removeProperty(k)));
}

/* ---------- Hero: depth on the illustration + counters ---------- */
const hero = $('.hero');
if(fine && hero){
  let raf = 0;
  hero.addEventListener('pointermove', e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--hx', ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3));
      hero.style.setProperty('--hy', ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3));
    });
  });
  hero.addEventListener('pointerleave', () => { hero.style.setProperty('--hx', 0); hero.style.setProperty('--hy', 0); });
}
tilt($('#pcard'), 3);

const reports = PROJECTS.reduce((n, p) => n + (p.embeds || []).filter(e => e.url.includes('powerbi')).length, 0);
$('#n-proj').dataset.to = PROJECTS.length;
$('#n-rep').dataset.to = reports;
function countUp(el){
  const to = +el.dataset.to; if(reduced){ el.textContent = to; return; }
  const t0 = performance.now(), d = 900;
  const step = t => { const k = Math.min(1, (t - t0) / d); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if(k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
$$('[data-to]').forEach(countUp);

$('#creds').innerHTML = CREDS.map(([k, v]) => `<li><span>${k}</span><b>${v}</b></li>`).join('');

/* ---------- Featured case studies ---------- */
function shot(p){
  // screenshots get a browser frame; illustrations keep their own drawing
  return `<div class="browser"><div class="browser-bar"><i></i><i></i><i></i><span>${p.title.split(':')[0].split('·')[0].trim()}</span></div><div class="browser-body">${p.pv()}${lab(p)}</div></div>`;
}
$('#featured').innerHTML = FEATURED.map((f, i) => {
  const p = byId(f.id);
  const live = (p.links || []).find(l => l.url);
  return `<article class="case reveal">
    <div class="case-media tilt">${shot(p)}</div>
    <div class="case-txt">
      <p class="case-k"><span>0${i + 1}</span>${f.kicker}</p>
      <h3>${f.title}</h3>
      <dl class="case-dl">
        <div><dt>${T('case.context')}</dt><dd>${f.context}</dd></div>
        <div><dt>${T('case.challenge')}</dt><dd>${f.challenge}</dd></div>
        <div><dt>${T('case.did')}</dt><dd><ul>${f.did.map(d => `<li>${d}</li>`).join('')}</ul></dd></div>
      </dl>
      <div class="metrics">${f.metrics.map(m => `<div><b>${m[0]}</b><span>${m[1]}</span></div>`).join('')}</div>
      <div class="case-foot">
        <div class="chips">${f.tools.map(t => `<span class="chip">${t}</span>`).join('')}</div>
        <div class="case-cta"><button class="btn alt" type="button" data-open="${f.id}">${T('case.read')}</button>${live ? `<a class="btn line" target="_blank" rel="noopener" href="${live.url}">${live.label} ↗</a>` : ''}</div>
      </div>
      ${f.note ? `<p class="case-note">${f.note}</p>` : ''}
    </div>
  </article>`;
}).join('');
$$('#featured .case-media').forEach(el => tilt(el, 3));

/* ---------- All projects: one tab per place ---------- */
const card = p => `<button class="card tilt reveal in" type="button" data-id="${p.id}" data-cat="${p.cat}"><span class="thumb">${p.pv()}${lab(p)}</span><span class="cmeta"><span class="tags">${(p.tags || [p.cat]).map(c => `<span class="tag">${CATS[c]}</span>`).join('')}</span><span class="ctitle">${p.title}</span><span class="cblurb">${p.blurb}</span><span class="open">${T('view')} <span aria-hidden="true">→</span></span></span></button>`;
const gbox = $('#groups');
gbox.innerHTML = `<div class="gtabs" role="tablist" aria-label="${T('all.title')}">${GROUPS.map((g, i) => `<button class="gtab" role="tab" type="button" id="gt-${g.id}" aria-controls="gp-${g.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-g="${g.id}">
    <img class="group-img" src="${IMG}${g.img}" alt="" loading="lazy"><span class="gtab-t"><b>${g.name}</b><small>${g.role} · ${g.when}</small></span><span class="gtab-n">${g.items.length}</span></button>`).join('')}</div>
  ${GROUPS.map((g, i) => `<div class="gpanel" role="tabpanel" id="gp-${g.id}" aria-labelledby="gt-${g.id}" ${i ? 'hidden' : ''}>
    <p class="group-x">${g.text}</p>
    <div class="grid">${g.items.map(byId).filter(Boolean).map(card).join('')}</div></div>`).join('')}`;
$$('#groups .card').forEach(c => tilt(c, 3));
const gtabs = $$('.gtab', gbox);
function showGroup(btn, focus){
  gtabs.forEach(b => { const on = b === btn; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; $('#gp-' + b.dataset.g).hidden = !on; });
  if(focus) btn.focus();
}
gtabs.forEach((b, i) => {
  b.addEventListener('click', () => showGroup(b));
  b.addEventListener('keydown', e => {
    const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: gtabs.length - 1 }[e.key];
    if(k === undefined) return; e.preventDefault(); showGroup(gtabs[(k + gtabs.length) % gtabs.length], true);
  });
});

document.addEventListener('click', e => {
  const b = e.target.closest('[data-group]'); if(!b) return;
  const tab = document.getElementById('gt-' + b.dataset.group); if(!tab) return;
  showGroup(tab);
  document.getElementById('projects').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
});

/* ---------- Journey carousel ---------- */
(function(){
  const PAL = [
    {a0:'#FBF4EF',a1:'#E4D6D6',a2:'#E5AEB1',al:'rgba(150,133,141,.42)',ai:'#403E45',ln:'#96858D',hx:'25%'},
    {a0:'#E4D6D6',a1:'#E5AEB1',a2:'#FBF4EF',al:'rgba(163,62,67,.24)',ai:'#403E45',ln:'#96858D',hx:'70%'},
    {a0:'#E4D6D6',a1:'#B2A5AC',a2:'#FBF4EF',al:'rgba(64,62,69,.22)',ai:'#403E45',ln:'#69666E',hx:'40%'},
    {a0:'#B2A5AC',a1:'#96858D',a2:'#E4D6D6',al:'rgba(251,244,239,.42)',ai:'#FBF4EF',ln:'#FBF4EF',hx:'75%'},
    {a0:'#E5AEB1',a1:'#B2A5AC',a2:'#FBF4EF',al:'rgba(64,62,69,.22)',ai:'#403E45',ln:'#69666E',hx:'30%'},
    {a0:'#69666E',a1:'#403E45',a2:'#96858D',al:'rgba(251,244,239,.2)',ai:'#FBF4EF',ln:'#B2A5AC',hx:'60%'}
  ];
  const CHIP = LANG === 'es' ? ES.journey.chips : ['URJC','Shenzhen University','URJC projects','Bosch','WeChat thesis','What’s next'];
  const CTA = {0:{l:'See URJC projects',group:'urjc'},1:{l:'See SZU projects',group:'szu'},2:{l:'See URJC projects',group:'urjc'},3:{l:'See Bosch projects',group:'bosch'},4:{l:'About the thesis',open:'wechat'},5:{l:'Get in touch',href:'#contact'}};
  if(LANG === 'es') Object.entries(ES.journey.cta).forEach(([k, l]) => { CTA[k].l = l; });
  const pad = n => String(n).padStart(2,'0');
  function net(i, p){
    const base = [[34,46],[96,24],[170,52],[236,22],[278,62]];
    const pts = base.map(([x,y],k)=>[x, y + ((i*37 + k*23) % 22) - 8]);
    const red = (i + 2) % pts.length;
    const lines = pts.slice(1).map((q,k)=>'<path d="M'+pts[k][0]+' '+pts[k][1]+'L'+q[0]+' '+q[1]+'" stroke="'+p.ln+'" stroke-width="1" opacity=".7"/>').join('');
    const dots = pts.map((q,k)=>'<circle cx="'+q[0]+'" cy="'+q[1]+'" r="'+(k===red?4.5:3.5)+'" fill="'+(k===red?'#A33E43':p.a0)+'" stroke="'+(k===red?'#A33E43':p.ln)+'" stroke-width="1"/>').join('');
    return '<svg viewBox="0 0 300 210" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">'+lines+'<path d="M'+pts[4][0]+' '+pts[4][1]+'L300 '+(pts[4][1]+30)+'" stroke="'+p.ln+'" stroke-dasharray="3 4" opacity=".6"/>'+dots+'</svg>';
  }
  const track = $('#jtrack'), rail = $('#jrail'), prev = $('#jprev'), next = $('#jnext'), count = $('#jcount'), live = $('#jlive');
  const n = STOPS.length;
  track.innerHTML = STOPS.map((s,i)=>{
    const p = PAL[i % PAL.length];
    const facts = []; if(s.when) facts.push([T('j.when'), s.when]); if(s.where) facts.push([T('j.where'), s.where]);
    const c = CTA[i];
    const cta = c ? (c.group ? '<button class="jcta" type="button" data-group="'+c.group+'">'+c.l+' <span aria-hidden="true">→</span></button>' : c.open ? '<button class="jcta" type="button" data-open="'+c.open+'">'+c.l+' <span aria-hidden="true">→</span></button>' : '<a class="jcta" href="'+c.href+'">'+c.l+' <span aria-hidden="true">→</span></a>') : '';
    return '<li class="jc" style="--a0:'+p.a0+';--a1:'+p.a1+';--a2:'+p.a2+';--al:'+p.al+';--ai:'+p.ai+';--hx:'+p.hx+'">'
      + '<button class="jc-main" type="button" aria-expanded="false" aria-controls="jside-'+i+'">'
      + '<span class="jart'+(s.img?' has-img':'')+'">'+(s.img ? '<img class="jimg" src="'+IMG+s.img+'" alt="" loading="lazy" style="object-position:'+(s.pos||'50% 50%')+'">' : net(i,p))+'<span class="jnum">'+pad(i+1)+'</span><span class="jchip"><svg viewBox="0 0 24 24" aria-hidden="true">'+ICONS[s.icon]+'</svg>'+CHIP[i]+'</span></span>'
      + '<span class="jbody"><span class="jkick">'+s.tag+'</span><span class="jtitle">'+s.title+'</span></span></button>'
      + '<div class="jc-side" id="jside-'+i+'"><div class="jside-in"><p>'+s.text+'</p>'
      + (facts.length ? '<div class="jfacts">'+facts.map(f=>'<div><small>'+f[0]+'</small><b>'+f[1]+'</b></div>').join('')+'</div>' : '')
      + (s.chips ? '<div class="chips">'+s.chips.map(x=>'<span class="chip">'+x+'</span>').join('')+'</div>' : '')
      + cta + '</div></div></li>';
  }).join('');
  rail.innerHTML = STOPS.map((s,i)=>'<li><button type="button" aria-label="'+T('j.chapter')+' '+(i+1)+': '+s.title+'"><span>'+s.tag+'</span></button></li>').join('');
  const lis = [...track.children], mains = lis.map(l=>l.querySelector('.jc-main')), sides = lis.map(l=>l.querySelector('.jc-side')), rb = [...rail.querySelectorAll('button')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0;
  function step(){ const ml = getComputedStyle(lis[0]).flexDirection === 'column' ? 0 : (parseFloat(getComputedStyle(sides[0]).marginLeft) || 0); return mains[0].offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 28) + ml; }
  function set(i, o){
    o = o || {};
    cur = Math.max(0, Math.min(n-1, i));
    lis.forEach((li,k)=>{ const on = k===cur; li.classList.toggle('on', on); mains[k].setAttribute('aria-expanded', on); sides[k].inert = !on; sides[k].setAttribute('aria-hidden', !on); });
    rb.forEach((b,k)=>{ b.classList.toggle('past', k<cur); if(k===cur) b.setAttribute('aria-current','step'); else b.removeAttribute('aria-current'); });
    prev.disabled = cur===0; next.disabled = cur===n-1;
    count.textContent = pad(cur+1)+' / '+pad(n); const pg = document.getElementById('jprog'); if(pg) pg.style.setProperty('--k', ((cur+1)/n).toFixed(3));
    if(o.announce) live.textContent = T('j.chapter')+' '+(cur+1)+' '+T('j.of')+' '+n+': '+STOPS[cur].title;
    if(o.scroll !== false){
      track.scrollTo({left: cur*step(), behavior: reduce ? 'auto' : 'smooth'});
      // the opened panel grows over ~0.55s; scroll again once it has its full width
      clearTimeout(set.t); set.t = setTimeout(()=>track.scrollTo({left: Math.min(cur*step(), track.scrollWidth - track.clientWidth), behavior: reduce ? 'auto' : 'smooth'}), 600);
    }
    if(o.focus) mains[cur].focus({preventScroll:true});
  }
  mains.forEach((m,k)=>m.addEventListener('click', ()=>set(k, {announce:true})));
  rb.forEach((b,k)=>b.addEventListener('click', ()=>set(k, {announce:true})));
  prev.addEventListener('click', ()=>set(cur-1, {announce:true}));
  next.addEventListener('click', ()=>set(cur+1, {announce:true}));
  track.addEventListener('keydown', e=>{
    if(!e.target.classList.contains('jc-main')) return;
    const k = {ArrowRight:cur+1, ArrowLeft:cur-1, Home:0, End:n-1}[e.key];
    if(k===undefined) return; e.preventDefault(); set(k, {focus:true, announce:true});
  });
  let d = null, moved = false;
  track.addEventListener('pointerdown', e=>{ if(e.pointerType!=='mouse' || e.button!==0) return; d = {x:e.clientX, l:track.scrollLeft, id:e.pointerId}; moved = false; });
  track.addEventListener('pointermove', e=>{
    if(!d) return; const dx = e.clientX - d.x;
    if(!moved && Math.abs(dx) > 6){ moved = true; track.classList.add('drag'); track.setPointerCapture(d.id); }
    if(moved) track.scrollLeft = d.l - dx;
  });
  const end = ()=>{ d = null; track.classList.remove('drag'); };
  track.addEventListener('pointerup', end); track.addEventListener('pointercancel', end);
  track.addEventListener('click', e=>{ if(moved){ e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  // keyboard arrows move the carousel whenever the journey section is on screen
  const sec = document.getElementById('journey');
  document.addEventListener('keydown', e=>{
    if(e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    if(e.altKey || e.ctrlKey || e.metaKey || document.querySelector('dialog[open]')) return;
    const t = e.target; if(t.closest && (t.closest('input,textarea,select,[contenteditable],[role="tablist"]') || track.contains(t))) return;
    const r = sec.getBoundingClientRect(); if(r.top > innerHeight * .6 || r.bottom < innerHeight * .4) return;
    e.preventDefault(); set(cur + (e.key === 'ArrowRight' ? 1 : -1), {announce:true});
  });
  set(0, {scroll:false});
})();

/* ---------- Toolkit ---------- */
const langs = TOOLKIT.find(g => g.k === 'langs'); // languages are shown in the credentials strip
$('#tools').innerHTML = TOOLKIT.filter(g => g !== langs).map((g, i) => `<div class="tgroup reveal"><p class="tg-n">0${i + 1}</p><h3>${g.t}</h3><div class="chips">${g.c.map(c => `<span class="chip">${c}</span>`).join('')}</div></div>`).join('');

/* ---------- Contact ---------- */
(function(){
  const box = $('#contact-links');
  const parts = [];
  if(PROFILE.email) parts.push(`<a class="btn alt" href="mailto:${PROFILE.email}">${PROFILE.email}</a><button class="btn line" type="button" id="mail-c">${T('c.copy')}</button>`);
  if(PROFILE.cv) parts.push(`<a class="btn line" target="_blank" rel="noopener" href="${PROFILE.cv[LANG] || PROFILE.cv.en}">${T('cv')} ↓</a>`);
  if(PROFILE.linkedin) parts.push(`<a class="btn line" target="_blank" rel="noopener" href="${PROFILE.linkedin}">LinkedIn ↗</a>`);
  if(PROFILE.github) parts.push(`<a class="btn line" target="_blank" rel="noopener" href="${PROFILE.github}">GitHub ↗</a>`);
  box.innerHTML = parts.join('');
  box.hidden = !parts.length;
  const c = $('#mail-c');
  if(c) c.addEventListener('click', () => {
    navigator.clipboard?.writeText(PROFILE.email).then(() => { c.textContent = T('c.copied'); setTimeout(() => { c.textContent = T('c.copy'); }, 1600); }, () => {});
  });
})();
$('#year').textContent = new Date().getFullYear();
if(PROFILE.cv) $$('[data-cv]').forEach(a => { a.href = PROFILE.cv[LANG] || PROFILE.cv.en; });

/* ---------- Project dialog ---------- */
const dlg = $('#dlg'), dbody = $('#dlg-body');

function initDiagram(){
  const wrap = $('#dgmw'), box = $('#dgm'), svg = box.querySelector('svg'), pct = $('#dgm-pct'), W = 2510;
  let z = 0;
  const fit = () => Math.max(.1, (box.clientWidth - 2) / W);
  const set = (nz, cx, cy) => {
    const lo = fit(), hi = 1.6; nz = Math.min(hi, Math.max(lo, nz));
    const ow = svg.getBoundingClientRect().width || 1;
    if(cx == null){ cx = box.clientWidth / 2; cy = box.clientHeight / 2; }
    const px = (box.scrollLeft + cx) / ow, py = (box.scrollTop + cy) / ow;
    z = nz; svg.style.width = (W * z) + 'px';
    box.scrollLeft = px * W * z - cx; box.scrollTop = py * W * z - cy;
    pct.textContent = Math.round(z / lo * 100) + '%';
  };
  set(fit());
  wrap.addEventListener('click', e => {
    const b = e.target.closest('[data-z]'); if(!b) return; const k = b.dataset.z;
    if(k === 'in') set(z * 1.3); else if(k === 'out') set(z / 1.3); else if(k === 'fit'){ set(fit()); box.scrollTo(0, 0); }
    else if(k === 'full'){ const on = wrap.classList.toggle('full'); b.textContent = on ? T('dgm.exit') : T('dgm.full'); set(fit()); box.scrollTo(0, 0); }
  });
  box.addEventListener('wheel', e => {
    if(!(e.ctrlKey || e.metaKey)) return; e.preventDefault();
    const r = box.getBoundingClientRect(); set(z * Math.exp(-e.deltaY * .01), e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });
  let d = null;
  box.addEventListener('pointerdown', e => { if(e.pointerType !== 'mouse' || e.button !== 0) return; d = { x: e.clientX, y: e.clientY, l: box.scrollLeft, t: box.scrollTop }; box.setPointerCapture(e.pointerId); box.classList.add('drag'); });
  box.addEventListener('pointermove', e => { if(!d) return; box.scrollLeft = d.l - (e.clientX - d.x); box.scrollTop = d.t - (e.clientY - d.y); });
  const end = () => { d = null; box.classList.remove('drag'); };
  box.addEventListener('pointerup', end); box.addEventListener('pointercancel', end);
  dlg.addEventListener('cancel', e => { if(wrap.classList.contains('full')){ e.preventDefault(); $('#dgm-full').click(); } });
}

function openProject(id){
  const p = byId(id); if(!p) return;
  const links = (p.links || []).filter(l => l.url).map(l => `<a class="btn primary" target="_blank" rel="noopener" href="${l.url}">${l.label} ↗</a>`).join('');
  const head = `<span class="tags">${(p.tags || [p.cat]).map(c => `<span class="tag">${CATS[c]}</span>`).join('')}</span><h3 id="dlg-t">${p.title}</h3><p>${p.summary}</p>`;
  const facts = p.facts ? `<div class="metrics dlg-metrics">${p.facts.map(f => `<div><b>${f[0]}</b><span>${f[1]}</span></div>`).join('')}</div>` : '';
  const rest = `${p.did.length ? `<h4>${p.didTitle || T('dlg.did')}</h4><ul>${p.did.map(d => `<li>${d}</li>`).join('')}</ul>` : ''}<h4>${T('dlg.tools')}</h4><div class="chips">${p.tools.map(t => `<span class="chip">${t}</span>`).join('')}</div>${p.note ? `<p class="note">${p.note}</p>` : ''}${links ? `<div class="links">${links}</div>` : ''}`;
  if(p.diagram){
    dbody.innerHTML = `<div class="dlg-grid wide"><div class="dlg-txt">${head}</div><figure class="embfig"><figcaption>${T('dgm.help')}</figcaption><div class="dgm-wrap" id="dgmw"><div class="dgm-bar"><button class="btn sm" type="button" data-z="out" aria-label="Zoom out">−</button><span class="dgm-pct" id="dgm-pct" aria-live="polite">100%</span><button class="btn sm" type="button" data-z="in" aria-label="Zoom in">+</button><button class="btn sm" type="button" data-z="fit">${T('dgm.fit')}</button><button class="btn sm" type="button" data-z="full" id="dgm-full">${T('dgm.full')}</button></div><div class="diagram" id="dgm" tabindex="0">${BPMN_SVG}</div></div></figure><div class="dlg-txt">${rest}</div></div>`;
  } else if(p.embeds && p.embeds.length){
    const figs = p.embeds.map(e => `<figure class="embfig">${e.label ? `<figcaption>${e.label}</figcaption>` : ''}<div class="embed"${e.ratio ? ` style="aspect-ratio:${e.ratio}"` : ''}><iframe title="${e.title}" src="${e.url}" loading="lazy" allowfullscreen allow="fullscreen"></iframe></div><a class="btn ghost sm" target="_blank" rel="noopener" href="${e.url.replace('?embed', '')}">${T('dlg.full')}</a></figure>`).join('');
    dbody.innerHTML = p.embeds.length === 1
      ? `<div class="dlg-grid split"><div class="embeds dlg-stick">${figs}</div><div class="dlg-txt">${head}${rest}</div></div>`
      : `<div class="dlg-grid wide"><div class="dlg-txt">${head}</div><div class="embeds">${figs}</div><div class="dlg-txt">${rest}</div></div>`;
  } else {
    dbody.innerHTML = `<div class="dlg-grid"><div class="dlg-prev tilt dlg-stick"><span class="thumb">${p.pv()}${lab(p)}</span></div><div class="dlg-txt">${head}${facts}${rest}</div></div>`;
    tilt($('.dlg-prev', dbody), 4);
  }
  dlg.showModal();
  if(p.diagram) initDiagram();
  dlg.scrollTop = 0;
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-open], .card[data-id]');
  if(t) openProject(t.dataset.open || t.dataset.id);
});
$('#dlg-x').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', e => { if(e.target === dlg) dlg.close(); });
dlg.addEventListener('close', () => { if(!dlg.open) dbody.innerHTML = ''; });

/* ---------- Reveal on scroll ---------- */
if('IntersectionObserver' in window && !reduced){
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  $$('.reveal').forEach((el, i) => { el.style.setProperty('--d', (i % 3) * 70 + 'ms'); io.observe(el); });
} else {
  $$('.reveal').forEach(el => el.classList.add('in'));
}

/* ---------- Active section in the header ---------- */
const navLinks = $$('.nav a');
if('IntersectionObserver' in window){
  const so = new IntersectionObserver(entries => entries.forEach(en => {
    if(en.isIntersecting) navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => so.observe(s));
}
addEventListener('scroll', () => $('.top').classList.toggle('scrolled', scrollY > 8), { passive: true });

/* ---------- Theme ---------- */
const root = document.documentElement;
try{ const s = localStorage.getItem('ac-theme'); if(s === 'dark' || s === 'light') root.dataset.theme = s; }catch(e){}
$('#theme').addEventListener('click', () => {
  const cur = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = cur === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try{ localStorage.setItem('ac-theme', next); }catch(e){}
});
