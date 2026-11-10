/* ---------- Preview drawings (stand-ins until real screenshots are added) ---------- */
const F = 'font-family="DM Mono,ui-monospace,monospace"';
let uid = 0;
function frame(inner, label){
  return `<svg class="pv" viewBox="0 0 320 200" role="img" aria-label="${label}"><rect class="pv-bg" width="320" height="200"/><circle class="pv-dot a" cx="14" cy="12" r="3"/><circle class="pv-dot b" cx="25" cy="12" r="3"/><circle class="pv-dot c" cx="36" cy="12" r="3"/>${inner}</svg>`;
}
const bars = (vals, x0, base, maxH, hi) => vals.map((v,i)=>`<rect class="bar ${i===hi?'pv-y':'pv-p'}" x="${x0+i*21}" y="${(base-v*maxH).toFixed(1)}" width="14" height="${(v*maxH).toFixed(1)}" rx="2" style="--i:${i}"/>`).join('');

function dash(o){
  const k = o.k.map((x,i)=>`<g class="lift" style="--z:${6+i*3}"><rect class="pv-card" x="${14+i*100}" y="28" width="92" height="42" rx="6"/><text class="pv-m" x="${22+i*100}" y="43" ${F} font-size="7">${x[0]}</text><text class="pv-t" x="${22+i*100}" y="62" ${F} font-size="17" font-weight="600">${x[1]}</text></g>`).join('');
  const left = o.mode === 'scatter'
    ? `<rect class="pv-card" x="14" y="78" width="178" height="108" rx="6"/><text class="pv-m" x="24" y="92" ${F} font-size="7">${o.cap}</text>` + o.dots.map((d,i)=>`<circle class="dot ${i%5===2?'pv-y':'pv-p'}" cx="${(26+d[0]*154).toFixed(1)}" cy="${(176-d[1]*76).toFixed(1)}" r="${(3+d[2]*3.5).toFixed(1)}" style="--i:${i}"/>`).join('')
    : `<rect class="pv-card" x="14" y="78" width="178" height="108" rx="6"/><text class="pv-m" x="24" y="92" ${F} font-size="7">${o.cap}</text>` + bars(o.bars, 26, 176, 70, o.hi);
  const right = `<g class="lift" style="--z:10"><rect class="pv-card" x="200" y="78" width="106" height="108" rx="6"/><circle class="pv-line" cx="253" cy="124" r="26" stroke-width="9"/><circle class="donut" cx="253" cy="124" r="26" fill="none" stroke-width="9" stroke-linecap="round" transform="rotate(-90 253 124)" stroke-dasharray="${(o.pct*1.6336).toFixed(1)} 163.4"/><text class="pv-t" x="253" y="128" text-anchor="middle" ${F} font-size="11" font-weight="600">${o.pct}%</text><text class="pv-m" x="253" y="172" text-anchor="middle" ${F} font-size="7">${o.dl}</text></g>`;
  return frame(k + left + right, o.label);
}

function appPv(){
  const rows = [
    ['R0025_26','q-g','D5-D7','Quedan 9 días','24/10','23/10','q-g'],
    ['W0024_26','q-y','D4','Quedan 1 día','28/10','',''],
    ['R0023_26','q-r','D1-D2-D3','2 días de retraso','20/10','22/10','q-r'],
    ['R0022_26','q-b','En firmas','En curso','—','',''],
    ['R0021_26','q-g','Firmada','Completada','15/10','14/10','q-g']
  ];
  const body = rows.map((r,i)=>{
    const y = 90 + i*20, dark = r[1]==='q-y';
    return `<g class="lift qrow" style="--z:${2+i};--i:${i}"><rect class="q-w q-bd" x="14" y="${y}" width="292" height="19"/>
      <text class="q-tx" x="20" y="${y+12}" ${F} font-size="6" font-weight="500">${r[0]}</text>
      <rect class="q-mu" x="74" y="${y+8}" width="${34+(i*13)%22}" height="3" rx="1.5" opacity=".5"/>
      <rect class="q-mu" x="128" y="${y+8}" width="${24+(i*9)%16}" height="3" rx="1.5" opacity=".5"/>
      <rect class="${r[1]}" x="172" y="${y+2}" width="52" height="9" rx="4.5"/>
      <text class="${dark?'q-tx':'q-wt'}" x="198" y="${y+8.6}" text-anchor="middle" ${F} font-size="5" font-weight="600">${r[2]}</text>
      <text class="q-mu" x="172" y="${y+16}" ${F} font-size="4">${r[3]}</text>
      <text class="q-mu" x="244" y="${y+12}" ${F} font-size="6">${r[4]}</text>
      ${r[5]?`<text class="${r[6]}" x="280" y="${y+12}" ${F} font-size="6" font-weight="600">${r[5]}</text>`:''}</g>`;
  }).join('');
  const head = ['Nº reclamación','Cliente','Decisión','Status 8D','Límite','Completado'];
  const hx = [20,74,128,172,244,280];
  const heads = head.map((h,i)=>`<text class="q-tx" x="${hx[i]}" y="85" ${F} font-size="5" font-weight="600">${h}</text>`).join('');
  return frame(`<rect class="q-bg" x="0" y="22" width="320" height="178"/>
    <rect class="q-w" x="0" y="22" width="320" height="20"/><rect class="q-bd" x="0" y="42" width="320" height="0" fill="none"/>
    <text class="q-b" x="14" y="36" ${F} font-size="9" font-weight="700">Q-Alert</text>
    <text class="q-tx" x="70" y="35" ${F} font-size="6" font-weight="600">Visor</text><rect class="q-b" x="70" y="38" width="18" height="1.5"/>
    <text class="q-mu" x="104" y="35" ${F} font-size="6">Nueva reclamación</text><text class="q-mu" x="176" y="35" ${F} font-size="6">Changelog</text>
    <circle class="q-lb" cx="300" cy="32" r="5"/>
    <rect class="q-w q-bd" x="14" y="46" width="110" height="12" rx="2"/><circle cx="22" cy="52" r="2.4" fill="none" stroke="#7B8794" stroke-width=".9"/><text class="q-mu" x="30" y="54.6" ${F} font-size="5.5">Buscar…</text>
    <rect class="q-w q-bd" x="236" y="46" width="14" height="12" rx="2"/><text class="q-mu" x="243" y="54.4" text-anchor="middle" ${F} font-size="6">‹</text>
    <rect class="q-b" x="254" y="46" width="14" height="12" rx="2"/><text class="q-wt" x="261" y="54.4" text-anchor="middle" ${F} font-size="6">1</text>
    <rect class="q-w q-bd" x="272" y="46" width="14" height="12" rx="2"/><text class="q-mu" x="279" y="54.4" text-anchor="middle" ${F} font-size="6">›</text>
    <rect class="q-w q-bd" x="290" y="46" width="16" height="12" rx="2"/><text class="q-mu" x="298" y="54.4" text-anchor="middle" ${F} font-size="5.5">25</text>
    <text class="q-mu" x="14" y="71" ${F} font-size="5.5">Filtrando por:</text>
    <rect class="q-lb" x="62" y="64" width="58" height="10" rx="5"/><text class="q-b" x="68" y="70.8" ${F} font-size="5.5">Cliente (2)  ×</text>
    <rect class="q-lb" x="124" y="64" width="62" height="10" rx="5"/><text class="q-b" x="130" y="70.8" ${F} font-size="5.5">Repetitiva: Sí  ×</text>
    <text class="q-b" x="194" y="71" ${F} font-size="5.5" text-decoration="underline">Borrar todos</text>
    <rect class="q-bg" x="14" y="78" width="292" height="11"/>${heads}${body}`, 'Q-Alert claims viewer with colour-coded 8D status chips and active filters');
}

function conexia(){
  const items = [0,1,2].map(i=>`<circle class="pv-lf" cx="42" cy="${66+i*26}" r="6"/><rect class="pv-t" x="52" y="${62+i*26}" width="28" height="3" rx="1.5"/><rect class="pv-m" x="52" y="${69+i*26}" width="20" height="3" rx="1.5"/>`).join('');
  const nav = [0,1,2].map(i=>`<circle class="${i===0?'pv-y':'pv-m'}" cx="${40+i*19}" cy="166" r="3"/>`).join('');
  const kp = [['12','Open'],['3','New'],['98%','Paid']].map((x,i)=>`<g class="lift" style="--z:${6+i*3}"><rect class="pv-bg" x="${150+i*52}" y="36" width="46" height="30" rx="5"/><text class="pv-t" x="${156+i*52}" y="53" ${F} font-size="11" font-weight="600">${x[0]}</text><text class="pv-m" x="${156+i*52}" y="62" ${F} font-size="6">${x[1]}</text></g>`).join('');
  return frame(`<g class="lift" style="--z:12"><rect class="pv-line" x="26" y="26" width="66" height="152" rx="10" stroke-width="1.5"/><rect class="pv-p" x="32" y="34" width="54" height="12" rx="3"/>${items}${nav}</g><rect class="pv-card" x="106" y="26" width="202" height="152" rx="8"/><rect class="pv-lf" x="106" y="26" width="34" height="152" rx="8"/>${[0,1,2,3].map(i=>`<rect class="pv-m" x="112" y="${44+i*14}" width="22" height="3" rx="1.5"/>`).join('')}${kp}${bars([.5,.7,.45,.85,.6,.75,.55],152,168,60,3)}`, 'Mobile app for residents and desktop admin panel');
}

function bpmn(){
  const id = 'ah' + (++uid);
  const ar = d => `<path class="sm" d="${d}" stroke-width="1.2" marker-end="url(#${id})"/>`;
  return frame(`<defs><marker id="${id}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path class="pv-m" d="M0 0L8 4L0 8z"/></marker></defs>
  <rect class="pv-line" x="14" y="24" width="292" height="78"/><rect class="pv-line" x="14" y="102" width="292" height="78"/>
  <text class="pv-m" x="20" y="35" ${F} font-size="6.5">QUALITY TEAM</text><text class="pv-m" x="20" y="113" ${F} font-size="6.5">SUPPLIER</text>
  <circle class="sg" cx="40" cy="66" r="9" stroke-width="1.6"/>${ar('M49 66H72')}
  <g class="lift" style="--z:6"><rect class="pv-card task" x="72" y="50" width="56" height="32" rx="6"/><text class="pv-t" x="100" y="69" text-anchor="middle" ${F} font-size="7">Log claim</text></g>${ar('M128 66H147')}
  <path class="sy" d="M160 54L172 66L160 78L148 66Z" stroke-width="1.4"/><path class="sy" d="M156 62L164 70M164 62L156 70" stroke-width="1.2"/>${ar('M172 66H196')}
  <g class="lift" style="--z:8"><rect class="pv-card task" x="196" y="50" width="56" height="32" rx="6"/><text class="pv-t" x="224" y="69" text-anchor="middle" ${F} font-size="7">Contain</text></g>${ar('M252 66H270')}
  <circle class="sc" cx="280" cy="66" r="9" stroke-width="3"/>
  ${ar('M160 78V121')}<text class="pv-m" x="166" y="100" ${F} font-size="6">no</text>
  <g class="lift" style="--z:10"><rect class="pv-card task" x="132" y="122" width="56" height="32" rx="6"/><text class="pv-t" x="160" y="141" text-anchor="middle" ${F} font-size="7">Request 8D</text></g>${ar('M188 138H224V83')}`, 'BPMN process diagram with two lanes');
}

function wechat(){
  const tiles = [0,1,2,3,4,5,6,7,8].map(n=>{const i=n%3,j=Math.floor(n/3);const c=['pv-p','pv-y','pv-g','pv-c'][n%4];return `<g class="lift" style="--z:${4+n}"><rect class="${c}" x="${182+i*40}" y="${52+j*40}" width="34" height="34" rx="9" opacity=".9"/></g>`}).join('');
  return frame(`<g class="lift" style="--z:6"><rect class="pv-card" x="30" y="36" width="96" height="22" rx="8"/><rect class="pv-m" x="40" y="44" width="60" height="3" rx="1.5"/><rect class="pv-m" x="40" y="50" width="40" height="3" rx="1.5"/></g>
  <g class="lift" style="--z:9"><rect class="pv-p" x="66" y="66" width="86" height="22" rx="8"/><rect class="pv-bg" x="76" y="74" width="58" height="3" rx="1.5"/><rect class="pv-bg" x="76" y="80" width="30" height="3" rx="1.5"/></g>
  <g class="lift" style="--z:12"><rect class="pv-card" x="30" y="98" width="110" height="22" rx="8"/><rect class="pv-m" x="40" y="106" width="70" height="3" rx="1.5"/></g>
  <g class="lift" style="--z:14"><rect class="pv-lf" x="40" y="130" width="110" height="40" rx="8"/><circle class="pv-g" cx="58" cy="150" r="9"/><rect class="pv-t" x="74" y="143" width="56" height="3" rx="1.5"/><rect class="pv-m" x="74" y="151" width="40" height="3" rx="1.5"/><rect class="pv-m" x="74" y="159" width="48" height="3" rx="1.5"/></g>
  <rect class="pv-card" x="170" y="28" width="136" height="150" rx="8"/><text class="pv-m" x="182" y="44" ${F} font-size="7">MINI PROGRAMS</text>${tiles}`, 'Chat and mini program screens of a superapp');
}

function slides(o){
  const front = o.kind==='chart'
    ? `<rect class="pv-t" x="106" y="80" width="92" height="6" rx="3"/><rect class="pv-m" x="106" y="92" width="64" height="4" rx="2"/>` + bars([.35,.55,.45,.75,.6], 108, 172, 52, 3).replace(/x="(\d+)"/g,(m,x)=>`x="${(+x)}"`)
    : o.kind==='cards'
    ? `<rect class="pv-t" x="106" y="80" width="92" height="6" rx="3"/><rect class="pv-m" x="106" y="92" width="64" height="4" rx="2"/>` + [0,1,2].map(i=>`<rect class="${['pv-p','pv-y','pv-g'][i]} dot" x="${106+i*58}" y="108" width="50" height="58" rx="6" opacity=".85" style="--i:${i}"/>`).join('')
    : `<rect class="pv-t" x="106" y="80" width="92" height="6" rx="3"/><rect class="pv-m" x="106" y="92" width="64" height="4" rx="2"/><g class="lift" style="--z:12"><circle class="pv-p" cx="190" cy="132" r="22"/><path class="pv-t" d="M183 120L204 132L183 144Z"/></g><circle class="pv-y dot" cx="262" cy="84" r="8"/><circle class="pv-g dot" cx="118" cy="164" r="6" style="--i:2"/>`;
  return frame(`<g class="lift" style="--z:3"><rect class="pv-card pv-sl" x="34" y="30" width="180" height="108" rx="7"/><rect class="pv-p" x="34" y="30" width="7" height="108" rx="3" opacity=".5"/></g>
    <g class="lift" style="--z:6"><rect class="pv-card pv-sl" x="62" y="46" width="180" height="108" rx="7"/><rect class="pv-y" x="62" y="46" width="7" height="108" rx="3" opacity=".5"/></g>
    <g class="lift" style="--z:10"><rect class="pv-bg pv-sl" x="92" y="62" width="196" height="122" rx="8"/>${front}</g>`, o.label);
}

/* Bosch-style previews: Bosch UI colours (blue #007BC0, green #00884A, yellow #FFCF00, red #ED0007, greys) */
const BX = { blue:'#007BC0', dark:'#00629A', green:'#00884A', yellow:'#FFCF00', red:'#ED0007', purple:'#9E2896', turq:'#18837E', g1:'#F3F4F6', g2:'#E0E2E5', g3:'#A4ABB3', ink:'#1F2933', mute:'#7B8794' };
function boschBar(title){
  return `<rect x="0" y="22" width="320" height="178" fill="${BX.g1}"/><rect x="0" y="22" width="320" height="18" fill="#fff"/>
    <rect x="0" y="22" width="320" height="2" fill="${BX.red}"/><rect x="0" y="24" width="320" height="1" fill="${BX.blue}" opacity=".0"/>
    <text x="14" y="35" ${F} font-size="7.5" font-weight="700" fill="${BX.ink}">${title}</text><circle cx="302" cy="31" r="4.5" fill="${BX.g2}"/>`;
}

/* Blocking & Fencing: the plant as a rectangle, machines of different sizes and shapes */
function blockingPv(){
  // [col, row, colSpan, rowSpan, state] on an 8 x 4 grid
  const M = [[0,0,2,1,'green'],[2,0,1,1,'green'],[3,0,1,2,'blue'],[4,0,2,1,'yellow'],[6,0,1,1,'green'],[7,0,1,2,'green'],
             [0,1,1,2,'green'],[1,1,1,1,'yellow'],[2,1,1,1,'green'],[4,1,1,1,'green'],[5,1,1,1,'red'],[6,1,1,2,'blue'],
             [1,2,2,1,'green'],[3,2,2,1,'green'],[5,2,1,1,'green'],[7,2,1,1,'yellow'],
             [0,3,3,1,'green'],[3,3,1,1,'blue'],[4,3,2,1,'green'],[6,3,2,1,'green']];
  const sq = M.map(([c, r, cw, rh, st], k) => {
    const x = 24 + c * 26, y = 62 + r * 28, w = cw * 26 - 6, h = rh * 28 - 8, hot = st === 'red';
    return `<g class="lift" style="--z:${3 + (k % 7)}"><rect class="mach" style="--i:${k}" x="${x}" y="${y}" width="${w}" height="${h}" rx="2.5" fill="${BX[st]}"/>${hot ? `<rect class="alert-ring" x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${h + 6}" rx="4" fill="none" stroke="${BX.red}" stroke-width="1.2"/>` : ''}</g>`;
  }).join('');
  const legend = [['green','OK'],['yellow','Check'],['blue','Maintenance'],['red','Defect source']].map((l, k) => `<rect x="${18 + k * 48}" y="184" width="7" height="7" rx="1.5" fill="${BX[l[0]]}"/><text x="${28 + k * 48}" y="190" ${F} font-size="5.5" fill="${BX.mute}">${l[1]}</text>`).join('');
  const days = [.35,.5,.3,.6,.45,1];
  const mini = days.map((v, i) => `<rect class="bar" style="--i:${i}" x="${255 + i * 8}" y="${(144 - v * 16).toFixed(1)}" width="5" height="${(v * 16).toFixed(1)}" rx="1" fill="${i === days.length - 1 ? BX.red : BX.g3}"/>`).join('');
  return frame(`${boschBar('Blocking &amp; Fencing · Plant layout')}
    <rect x="14" y="48" width="226" height="128" rx="4" fill="#fff" stroke="${BX.g3}" stroke-width="1"/>
    <text x="20" y="57" ${F} font-size="5" fill="${BX.mute}">PLANT</text>
    ${sq}${legend}
    <g class="lift" style="--z:10"><rect x="248" y="48" width="60" height="128" rx="4" fill="#fff" stroke="${BX.g2}"/>
      <text x="254" y="61" ${F} font-size="5" fill="${BX.mute}">BLOCKED PARTS</text><text x="254" y="77" ${F} font-size="13" font-weight="700" fill="${BX.ink}">3</text>
      <text x="254" y="91" ${F} font-size="5" fill="${BX.mute}">SOURCE</text><text x="254" y="103" ${F} font-size="9" font-weight="700" fill="${BX.red}">M-26</text>
      <text x="254" y="118" ${F} font-size="4.5" fill="${BX.mute}">DEFECTS / DAY</text>${mini}
      <line x1="254" y1="144.5" x2="302" y2="144.5" stroke="${BX.g2}" stroke-width=".8"/>
      <rect x="254" y="152" width="48" height="14" rx="2" fill="${BX.blue}"/><text x="278" y="161.5" text-anchor="middle" ${F} font-size="5.5" font-weight="600" fill="#fff">FENCE BATCH</text></g>`,
    'Plant layout with machines of different shapes and the defect source highlighted');
}

/* 8D claims tracker in Bosch colours */
function trackerPv(){
  const kpi = [['OPEN CLAIMS','42',BX.ink],['AVG. DAYS','12.4',BX.ink],['ON TIME','91%',BX.green]].map((k, i) =>
    `<g class="lift" style="--z:${5 + i * 3}"><rect x="${14 + i * 100}" y="48" width="92" height="36" rx="3" fill="#fff" stroke="${BX.g2}"/><rect x="${14 + i * 100}" y="48" width="3" height="36" fill="${[BX.blue, BX.yellow, BX.green][i]}"/>
     <text x="${22 + i * 100}" y="60" ${F} font-size="5.5" fill="${BX.mute}">${k[0]}</text><text x="${22 + i * 100}" y="77" ${F} font-size="14" font-weight="700" fill="${k[2]}">${k[1]}</text></g>`).join('');
  const vals = [.5,.62,.4,.8,.7,.55,.9,.65];
  const bars = vals.map((v, i) => `<rect class="bar grow" style="--i:${i}" x="${26 + i * 20}" y="${(182 - v * 70).toFixed(1)}" width="13" height="${(v * 70).toFixed(1)}" rx="1.5" fill="${i === 6 ? BX.red : i === 3 ? BX.yellow : BX.blue}"/>`).join('');
  const C = 2 * Math.PI * 24;
  const donut = `<g class="lift" style="--z:10"><rect x="200" y="92" width="106" height="98" rx="3" fill="#fff" stroke="${BX.g2}"/>
    <text x="208" y="104" ${F} font-size="5.5" fill="${BX.mute}">8D PHASES ON TIME</text>
    <circle cx="253" cy="146" r="24" fill="none" stroke="${BX.g2}" stroke-width="8"/>
    <circle class="sweep" style="--c:${C.toFixed(1)}" cx="253" cy="146" r="24" fill="none" stroke="${BX.green}" stroke-width="8" stroke-dasharray="${(C * .91).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 253 146)"/>
    <text x="253" y="149" text-anchor="middle" ${F} font-size="10" font-weight="700" fill="${BX.ink}">91%</text></g>`;
  return frame(`${boschBar('8D Claims Tracker')}${kpi}
    <rect x="14" y="92" width="178" height="98" rx="3" fill="#fff" stroke="${BX.g2}"/>
    <text x="22" y="104" ${F} font-size="5.5" fill="${BX.mute}">CLAIMS PER WEEK</text>
    <line x1="22" y1="182" x2="184" y2="182" stroke="${BX.g2}"/>${bars}${donut}`, 'Power BI 8D claims tracker with KPIs, weekly claims and on-time rate');
}
