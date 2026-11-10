/* ---------- Contact links: fill these in and the buttons appear ---------- */
const PROFILE = {
  linkedin: "https://www.linkedin.com/in/alejandra-calderon-mendez",
  github: "",
  email: "calderonmendezalejandra@gmail.com",
  cv: { en: "assets/cv/CV_Alejandra_Calderon_Mendez_EN.pdf", es: "assets/cv/CV_Alejandra_Calderon_Mendez_ES.pdf" }
};

/* ---------- Content ---------- */
const CATS = { dashboards:'Dashboard', apps:'Web app', cases:'Case study', process:'Process', presentations:'Presentation' };

/* Images live in assets/img */
const IMG = 'assets/img/';
const WOOF_IMG = IMG+'woof-img.jpg';
const WOOF_COVER = IMG+'woof-cover.jpg';
const PDD_IMG = IMG+'pdd-img.jpg';
const VID_IMG = IMG+'vid-img.jpg';
const SB_IMG = IMG+'sb-img.jpg';
const LUM_IMG = IMG+'lum-img.jpg';
const TAG_COVER = IMG+'tag-cover.jpg';
const CHINA_COVER = IMG+'china-cover.jpg';
const BPMN_IMG = IMG+'bpmn-img.jpg';

/* Power BI "publish to web" links */
const PBI = {
  tagliatella: 'https://app.powerbi.com/view?r=eyJrIjoiOGQyZjhkOTUtODRkNS00ZjJiLWFkOTMtNWNmODkxNDUyNDU2IiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9',
  china:      'https://app.powerbi.com/view?r=eyJrIjoiZWY4Yjk2Y2EtMmNlZi00MWVjLWJjYWYtMDM0NWU2MTRlOGNhIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9',
  woof:       'https://app.powerbi.com/view?r=eyJrIjoiYTY3MjQxYzYtYWE3Yi00MzcwLTkxNTctNjEwZWU1OWI4N2Y3IiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9',
};

const PROJECTS = [
  { id:'tagliatella', cat:'dashboards', title:'Executive dashboard for La Tagliatella', blurb:'Power BI executive dashboard for a restaurant chain.',
    pv:()=>`<img src="${TAG_COVER}" width="720" alt="Cover of the La Tagliatella executive dashboard">`, real:true,
    summary:'An executive-level Power BI dashboard for the restaurant chain La Tagliatella, with KPIs built as DAX measures. Use the filters inside the report to explore it.',
    did:[], tools:['Power BI','DAX measures','Power Query','Data modelling'],
    embeds:[{title:'La Tagliatella executive dashboard', url:PBI.tagliatella}], links:[] },
  { id:'china-bi', cat:'dashboards', title:'China in the world', blurb:'Final Power BI project on China, fed by web scraping.',
    pv:()=>`<img src="${CHINA_COVER}" width="720" alt="Cover of the China in the world dashboard">`, real:true,
    summary:'My final business intelligence project, focused on China and built with data collected through web scraping.',
    did:['Collected the data with web scraping','Cleaned and shaped it with Power Query','Modelled it and built the report in Power BI with DAX measures'], tools:['Power BI','Web scraping','Power Query','DAX'],
    embeds:[{title:'China in the world, final project', url:PBI.china}], links:[] },
  { id:'woof', cat:'dashboards', tags:['dashboards','apps'], title:'Woof Studio · Market analysis and website', blurb:'Power BI market analysis and website for a mobile dog grooming business in Madrid.',
    pv:()=>`<img src="${WOOF_COVER}" width="720" alt="Cover of the Woof Studio market analysis report">`, real:true,
    summary:'Woof Studio is a mobile dog grooming service in the northwest of Madrid, where a fully equipped van parks outside the client’s home. For this group project for Business Intelligence and Analysis 2025/2026 we wrote the business plan, built a Power BI market analysis and launched the website.',
    didTitle:'What it shows',
    did:['About 1,089 estimated potential clients in the area','Average household income of 63,069 €, 1.98 times the Spanish average','4 of the 5 municipalities with the highest income are less than 15 minutes away by car','A website that explains the service in three steps, with prices by dog size, reviews, service areas and a booking form'],
    tools:['Power BI','Market analysis','Map visuals','Web design','Netlify'],
    embeds:[{title:'Woof Studio market analysis report', url:PBI.woof, ratio:'600/373.5'}],
    links:[{label:'Visit the website',url:'https://cerulean-brigadeiros-11e431.netlify.app/'},{label:'Read the business plan',url:'https://docs.google.com/document/d/1HO-EpKNwtPu6eFQnDlGk2w5tYsxNT-JFNIPl6kWhv4Q/edit?usp=sharing'}] },
  { id:'tracker-8d', cat:'dashboards', title:'Power BI 8D claims dashboard', blurb:'Power BI dashboard on top of the Q-Alert data to follow quality claims through the 8D method.',
    pv:trackerPv,
    summary:'A Power BI dashboard built during my internship at Bosch on top of the Q-Alert data, to track quality claims through the 8D problem-solving process.',
    did:['Wrote the DAX measures and calculated columns behind the figures','Built calendar tables for time intelligence by week, month and year','Added dynamic slicers so each team can focus on its own view'],
    tools:['Power BI','DAX measures','Calculated columns','Time intelligence'], note:'Internal company project. The preview shows sample figures, not company data.', links:[] },
  { id:'qalert', cat:'apps', title:'Q-Alert', blurb:'Internal web app to manage quality claims with the 8D method.',
    pv:appPv,
    summary:'An internal web app for the quality department at Bosch (Quality 4.0, QMM1). It follows each customer quality claim through the 8D problem-solving phases and shows at a glance which ones are on time and which are late. It cut the time to handle phases D1, D2 and D3 by 83%, from 2 hours to 20 minutes. I took part in its development during my internship.',
    didTitle:'What it does',
    did:['Claims viewer with the current 8D phase, the deadline and the completion date of every phase','Colour-coded status: on time, close to due or overdue, based on how much of each deadline has been used','Excel-style filters on each column, including a date filter by year, month and day, with active-filter chips and pagination','New claim form that numbers warnings and claims automatically and checks part numbers with autocomplete','Changelog page that lists what each version added, improved and fixed'],
    tools:['Angular','Node.js','SQL Server','GitLab'],
    note:'My part: improving the interface, adding features such as the column filters with pagination, connecting the app data to Power BI, deployment fixes and version control with GitLab. Internal company tool: the preview is an illustration with invented data, not a screenshot.', links:[] },
  { id:'blocking', cat:'apps', title:'Blocking & Fencing', blurb:'Internal web app to block non-conforming parts and trace the machine they came from.',
    pv:blockingPv,
    summary:'A second internal web app for the quality department at Bosch, built in the same style as Q-Alert. It manages the Blocking & Fencing process for non-conforming parts and automates the communication between departments, so every blocked batch can be traced.',
    didTitle:'My part',
    did:['Built the plant layout view that shows which machine each defective part came from','Followed the same interface patterns as Q-Alert so both tools feel like one system'],
    tools:['Angular','Node.js','SQL Server'],
    note:'Internal company tool: the preview is an illustration with invented data, not a screenshot.', links:[] },
  { id:'domesticgo', cat:'cases', tags:['cases','apps'], title:'DomesticGo', blurb:'Startup proposal for Santander X Explorer: one trusted place to hire help at home.',
    pv:()=>`<img src="${IMG}domesticgo.jpg" width="720" alt="DomesticGo landing page: the official finder for household services">`, real:true,
    summary:'Our proposal for the Santander X Explorer programme (Banco Santander and Fundación UCEIF) in my first year of university. DomesticGo, first called JUST SERVI, is a platform that connects households with verified providers of home services such as cleaning, elderly care and pet care. We worked on it during the 12 weeks of the programme, from January to April 2023, going from the first hypotheses to a landing page.',
    did:['Coordinated a team of four and the weekly deliverables, meeting 100% of the milestones','Mapped both sides of the market with a Value Proposition Canvas and a Customer Journey Map for clients and providers','Designed the service: verified profiles, payment held until the client confirms the job, real-time updates, reviews and a rewards system','Defined the MVP and launched a landing page in Webflow to collect early sign-ups'],
    tools:['Business Model Canvas','Value Proposition Canvas','Customer Journey Map','MVP','Webflow'],
    links:[{label:'Visit the landing page',url:'https://domesticgo.webflow.io/'},{label:'See the value proposition canvas',url:'assets/img/domesticgo-canvas.jpg'}] },
  { id:'wechat', cat:'cases', title:'WeChat as a super app', blurb:'Final degree project: the technology, business model and social impact of WeChat’s Mini Program ecosystem.',
    pv:()=>`<img src="${IMG}j-wechat.jpg" width="720" alt="WeChat Mini Programs from many brands">`, real:true,
    summary:'My final degree project at URJC: “WeChat as a super app: technology, business synergies and social consequences of the Mini Program ecosystem”. It studies Weixin, the mainland China version of WeChat, through the three lenses of my degree: the technology that runs it, the business model that makes it viable and its impact on society. It explains how a 2011 messaging app became the place where 1.2 billion people chat, pay, shop and reach public services, and why the West has no equivalent.',
    facts:[['1.2 bn','monthly active users (2023)'],['2.3 M','Mini Programs, with no download or install'],['¥67.8 tn','WeChat Pay transactions in Q3 2023']],
    didTitle:'What it covers',
    did:['The evolution from messaging (2011) to official accounts (2012), WeChat Pay (2013) and Mini Programs (2017)','How Mini Programs work: apps under 10 MB that run inside WeChat and reuse WeChat Pay and the user’s identity','Tencent’s business model: revenue streams, incentives for brands and developers, and WeCom as the bridge between companies and customers','The social side: data and privacy, user dependence and WeChat as semi-public infrastructure, from public services to COVID health codes','Why no Western company has built an equivalent'],
    tools:['Platform analysis','Business model analysis','Literature review','Tencent developer and investor documentation'],
    note:'In progress. Built on academic articles, Tencent’s technical and corporate documentation and industry reports, plus my own screenshots from using WeChat in Shenzhen.', links:[] },
  { id:'bpmn', cat:'process', title:'BPMN: music licensing process', blurb:'Process model with four participants, from the request to the final approval.',
    pv:()=>`<img src="${BPMN_IMG}" width="720" alt="BPMN diagram of a music licensing process">`, real:true, diagram:true,
    summary:'A BPMN model of a music licensing process with four participants: the users who request and pay for music, a collecting society, the artists and the producers. The society checks who manages the rights, handles each request and pays the artists and producers.',
    didTitle:'What it shows',
    did:['Four pools with message flows between them','Exclusive gateways for accepting or rejecting each request','Parallel gateways to handle artists and producers at the same time','Sub-processes that show how artists and producers manage a request'], tools:['BPMN','bpmn.io'], links:[] },
  { id:'starbucks', cat:'presentations', title:'Starbucks marketing strategy', blurb:'Group presentation analysing the brand’s marketing strategy.',
    pv:()=>`<img src="${SB_IMG}" width="720" alt="Cover slide of the Starbucks analysis presentation">`, real:true,
    summary:'A group presentation that analyses the marketing strategy of Starbucks, designed in Canva.',
    did:['Designed the presentation in Canva','Worked as part of a student team'], tools:['Canva','Marketing strategy'],
    embeds:[{title:'Starbucks marketing strategy presentation', url:'https://www.canva.cn/design/DAHY09q9ios/Qqr8s035F5J8NcMuKNc_Pw/view?embed', ratio:'16/9'}],
    links:[{label:'Open the presentation',url:'https://khsj.cn/d46vsv91nxd7cik'}] },
  { id:'pdd', cat:'presentations', title:'Pinduoduo · Management Information Systems', blurb:'Group presentation that made a budget platform look premium. Grade: A.',
    pv:()=>`<img src="${PDD_IMG}" width="720" alt="Cover slide of the Pinduoduo presentation">`, real:true,
    summary:'A group presentation (Group 7) for my Management Information Systems course, about Pinduoduo. I got an A in the course and was congratulated for making a low-price platform look luxurious.',
    did:['Gave a budget platform a premium visual identity','Designed the presentation in Canva'], tools:['Canva','Management information systems'],
    embeds:[{title:'Pinduoduo presentation for Management Information Systems', url:'https://www.canva.cn/design/DAHY0wlDMys/7RyB13PMTszLuwuq4YYVmA/view?embed', ratio:'16/9'}],
    links:[{label:'Open the presentation',url:'https://khsj.cn/qlj3bouhy91ybqi'}] },
  { id:'dreamteam', cat:'presentations', title:'Dream Team blind box', blurb:'Video pitch for a blind-box collectible inspired by Shenzhen University.',
    pv:()=>`<img src="${VID_IMG}" width="720" alt="Opening frame of the Dream Team video: drone view of Shenzhen University">`, real:true,
    summary:'A video presentation for a blind-box collectible in the style of Labubu, inspired by Shenzhen University. It helps students find out which role they would play in a “dream team” of students, based on their personality.',
    did:['Used drone footage of the campus for the video','Made the product images and the sound with AI'], tools:['Canva','Drone footage','AI-generated images','AI-generated sound'],
    embeds:[{title:'Dream Team blind box video', url:'https://www.canva.cn/design/DAGqsEpjDgI/bj2qFindQ6LHP8B3WXfGDg/watch?embed', ratio:'16/9'}],
    links:[{label:'Watch the video',url:'https://khsj.cn/83wobyu5mp0ngyr'}] },
  { id:'lumio', cat:'presentations', title:'Lumio Studio', blurb:'Web and mobile app proposal for a veterinary clinic.',
    pv:()=>`<img src="${LUM_IMG}" width="720" alt="Cover slide of the Lumio Studio proposal">`, real:true,
    summary:'A proposal to develop a website and a mobile app for a veterinary clinic, presented under the name Lumio Studio.',
    did:['Designed the proposal presentation in Canva'], tools:['Canva','Web and app proposal'],
    embeds:[{title:'Lumio presentation', url:'https://www.canva.com/design/DAHH91sr3ag/2bv5LGPPYjwxdP0BUNajcw/view?embed', ratio:'16/9'}],
    links:[{label:'Open the presentation',url:'https://www.canva.com/design/DAHH91sr3ag/2bv5LGPPYjwxdP0BUNajcw/view'}] }
];

const STOPS = [
  { tag:'Degree', when:'2022 – 2026', where:'Universidad Rey Juan Carlos', title:'Service Science, Management and Engineering', icon:'cap', img:'j-ise.jpg', pos:'50% 50%',
    text:'A degree that mixes business management with IT. On the data side: business intelligence with Power BI, databases and SQL, and data analysis with Python and Excel. Also IT governance (COBIT, ITIL 4), enterprise architecture with TOGAF and ArchiMate, Scrum and Kanban, and Java web services with REST and SOAP.', chips:['Business intelligence','SQL','IT governance','TOGAF'] },
  { tag:'Abroad', when:'Sep 2024 – Jul 2025', where:'Shenzhen University', title:'Exchange in China', icon:'plane', img:'j-shenzhen.jpg', pos:'50% 40%',
    text:'This is where my real interest in China began: it led to my thesis on WeChat and to studying Mandarin, now in my second year. I took 15 courses in two semesters, in a multicultural class and a digital ecosystem very different from Europe’s.', chips:['Business Administration','Mandarin','Cross-cultural management'] },
  { tag:'Learning by building', title:'Projects at university', icon:'blocks', img:'j-fce.jpg', pos:'50% 50%',
    text:'DomesticGo, a startup proposal for Santander X Explorer. Power BI dashboards for a restaurant chain and on China’s role in the world. Woof Studio, a business plan with its own website and market analysis.', chips:['DomesticGo','Power BI','Woof Studio'] },
  { tag:'Industry', when:'Nov 2025 – Jul 2026', where:'Bosch · Quality 4.0 (QMM1)', title:'Internship', icon:'gear', img:'j-bosch.jpg', pos:'50% 55%',
    text:'Helped develop Q-Alert, a quality claims web app that cut the time for 8D phases D1–D3 by 83%, and the layout of a Blocking & Fencing app. Connected the app data to Power BI and built AI agents with Copilot Studio.', chips:['Angular','Node.js','SQL Server','Power BI','Copilot Studio'] },
  { tag:'Currently', state:'now', title:'Final thesis', icon:'pen', img:'j-wechat.jpg', pos:'50% 50%',
    text:'Finishing my thesis on WeChat as a super app: the technology, business model and Mini Program ecosystem behind an app used by 1.2 billion people, its social impact and why the West has no equivalent.', chips:['Platform analysis','Business models','Mini Programs'] },
  { tag:'Next', state:'next', when:'Available now', where:'Madrid · open to relocation', title:'Data analysis, close to the business', icon:'arrow', img:'j-next.jpg', pos:'50% 22%',
    text:'Next, I want to grow as a data analyst: cleaning and modelling data with SQL and Power Query, building Power BI reports with DAX, and explaining what the numbers mean to the people who make decisions. Over time, I see myself bringing that to consulting and international projects.', chips:['Data analysis','SQL','Power BI','Python'] }
];

const TOOLKIT = [
  { t:'Data and BI', c:['Power BI Desktop and Service','DAX measures','Calculated columns','Time intelligence','Power Query (M)','Data modelling','SQL Server','Excel','Web scraping'] },
  { t:'Business analysis and process', c:['Requirements gathering','Stakeholder workshops','User stories','BPMN 2.0','Process mapping','Figma prototyping','Market analysis','P&L models'] },
  { t:'Development and integration', c:['Angular','Node.js','Java','Java Servlets','REST and SOAP web services','HTML / CSS / JavaScript','Supabase','Git and GitLab','IIS deployment'] },
  { t:'Cloud and delivery', c:['AWS (S3, CloudFront, IAM)','GitHub Actions','CI/CD'] },
  { t:'Architecture and governance', c:['TOGAF','ArchiMate (Archi)','IT governance (COBIT, ITIL 4)','ISO/IEC 20000','System dynamics (Vensim)'] },
  { t:'Ways of working', c:['Scrum','Kanban','Lean','Agile delivery','Microsoft Copilot Studio','SAP'] },
  { k:'langs', t:'Languages', c:['Spanish · native','English · C1','Mandarin Chinese · basic (2nd year)'] }
];

const ICONS = {
  cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/>',
  plane:'<path d="M21 3L3 10l7 3 3 7z"/><path d="M10 13L21 3"/>',
  blocks:'<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><path d="M17 13v8M13 17h8"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  pen:'<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>',
  arrow:'<path d="M4 12h15M13 6l6 6-6 6"/>'
};

/* ---------- Featured case studies (shown large, before the full grid) ---------- */
const FEATURED = [
  { id:'qalert', kicker:'Bosch · Quality 4.0 internship', title:'Q-Alert: one place to follow every quality claim',
    context:'The quality department at Bosch handles customer claims with the 8D problem-solving method. Every phase has its own deadline, and the first three phases took about 2 hours per claim.',
    challenge:'Show at a glance which claims are on time, close to their deadline or late, and make any claim easy to find.',
    did:['Improved the interface and added features such as Excel-style column filters with pagination','Connected the app data to Power BI for reporting','Fixed deployment issues and kept version control in GitLab'],
    metrics:[['83%','less time to handle phases D1–D3'],['2 h → 20 min','per claim in those phases'],['8D','phases tracked for every claim']],
    tools:['Angular','Node.js','SQL Server','Power BI','GitLab'],
    note:'Internal tool: the image is an illustration with invented data.' },
  { id:'woof', kicker:'Business Intelligence · Group project', title:'Woof Studio: is there a market for a mobile dog groomer?',
    context:'A business plan for a mobile dog grooming service in the northwest of Madrid, with its own website and a market analysis in Power BI.',
    challenge:'Find out whether the area has enough potential clients with enough income, and which towns the van should cover first.',
    did:['Estimated the number of potential clients','Compared household income with the Spanish average','Mapped driving times from the van to the richest towns'],
    metrics:[['~1,089','estimated potential clients'],['1.98×','household income vs. the Spanish average'],['4 of 5','richest towns less than 15 min away']],
    tools:['Power BI','Market analysis','Map visuals'] },
  { id:'domesticgo', kicker:'Santander X Explorer · Startup programme', title:'DomesticGo: one trusted place to hire help at home',
    context:'Our proposal for the Santander X Explorer programme (January–April 2023), in my first year: a platform to find and hire household services such as cleaning, elderly care and pet care.',
    challenge:'Make hiring someone for your home feel safe, for both sides: verified profiles, clear prices and payment released only when the job is done.',
    did:['Coordinated a team of four and the weekly deliverables','Mapped clients and providers with a Value Proposition Canvas and Customer Journey Maps','Defined the MVP and launched the landing page in Webflow'],
    metrics:[['100%','weekly milestones met'],['4','people in the team'],['12','weeks from first hypotheses to landing page']],
    tools:['Value Proposition Canvas','Customer Journey Map','MVP','Webflow'] }
];

/* Short credentials shown under the hero */
const CREDS = [
  ['Internship','Bosch · Quality 4.0'],
  ['Degree','Universidad Rey Juan Carlos'],
  ['Exchange','Shenzhen University · 2024–25'],
  ['Languages','Spanish · English C1 · Mandarin']
];

/* Projects grouped by where I did them (shown in this order) */
const GROUPS = [
  { id:'bosch', name:'Bosch', role:'Quality 4.0 internship', when:'Nov 2025 – Jul 2026', img:'j-bosch.jpg',
    text:'Internal tools for the quality department. The images are illustrations with invented data.',
    items:['tracker-8d','qalert','blocking'] },
  { id:'szu', name:'Shenzhen University', role:'International exchange', when:'Sep 2024 – Jul 2025', img:'j-shenzhen.jpg',
    text:'Business and information systems courses in one of China’s main technology hubs.',
    items:['starbucks','pdd','dreamteam'] },
  { id:'urjc', name:'Universidad Rey Juan Carlos', role:'Degree and final thesis', when:'2022 – 2026', img:'j-ise.jpg',
    text:'Dashboards, apps, process models and proposals from my degree.',
    items:['woof','china-bi','lumio','domesticgo','wechat','bpmn','tagliatella'] }
];
