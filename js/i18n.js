/* Language layer. English lives in data.js and index.html; this file holds the Spanish version.
   The chosen language is kept in localStorage and in the URL (?lang=es), so a link opens in that language. */

const LANG = (() => {
  const q = new URLSearchParams(location.search).get('lang');
  if(q === 'es' || q === 'en') return q;
  try{ const s = localStorage.getItem('ac-lang'); if(s === 'es' || s === 'en') return s; }catch(e){}
  return (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
})();
document.documentElement.lang = LANG;

/* ---------- Interface strings ---------- */
const UI = {
  en: {
    'nav.work':'Work','nav.projects':'Projects','nav.journey':'Journey','nav.toolkit':'Toolkit','nav.contact':'Contact',
    'skip':'Skip to content','theme':'Switch light or dark theme',
    'hero.avail':'Open to junior roles in tech consulting, business and data',
    'hero.lead':'I build dashboards, web apps and process models that make a business <em>easier to see</em>.',
    'hero.sub':'Finishing my degree in Service Science, Management and Engineering at Universidad Rey Juan Carlos, with only my thesis defence left in April. I have internship experience at Bosch in Quality 4.0. I work between business and technology.',
    'hero.cta1':'See my work','hero.cta2':'Get in touch',
    'card.role':'Business × Technology','card.projects':'Projects','card.reports':'Live BI reports','card.langs':'Languages',
    'card.now':'<b>Currently:</b> working on my final thesis on WeChat as a superapp','photo.alt':'Portrait of Alejandra Calderón Méndez',
    'feat.eyebrow':'Featured work','feat.title':'Three projects, told as cases','feat.sub':'The context, the problem, what I did and what came out of it.',
    'case.context':'Context','case.challenge':'Challenge','case.did':'What I did','case.read':'Read the case',
    'all.eyebrow':'All projects','all.title':'Projects by chapter','all.sub':'Grouped by where I did them. Open one to explore the live report, the site or the slides.',
    'filter.all':'All','view':'View details','illustration':'Illustration',
    'j.eyebrow':'My journey','j.title':'From a business degree to building things','j.sub':'Use the arrows (also on your keyboard) or drag the cards. Open a card to read that chapter.',
    'j.prev':'Previous chapter','j.next':'Next chapter','j.when':'When','j.where':'Where','j.chapter':'Chapter','j.of':'of',
    'tk.eyebrow':'Toolkit','tk.title':'What I work with','tk.sub':'From the data model to the screen, and the process around it.',
    'c.eyebrow':'Contact','c.title':"Let's talk.",'c.text':'I am looking for junior roles where business and technology meet: consulting, business or data analysis, and cloud. Write to me or find me online.',
    'c.copy':'Copy email','c.copied':'Copied',
    'foot.built':'Built with HTML, CSS and JavaScript · Hosted on AWS (S3 + CloudFront)',
    'dlg.close':'Close ✕','dlg.did':'What I did','dlg.tools':'Tools','dlg.full':'Open full screen ↗',
    'dgm.help':'Zoom with the buttons, Ctrl + scroll, or drag to move','dgm.fit':'Fit','dgm.full':'Full screen','dgm.exit':'Exit full screen',
    'creds':'Background','cv':'Download CV','g.more':'Show {n} more','g.less':'Show less'
  },
  es: {
    'nav.work':'Casos','nav.projects':'Proyectos','nav.journey':'Recorrido','nav.toolkit':'Herramientas','nav.contact':'Contacto',
    'skip':'Saltar al contenido','theme':'Cambiar entre tema claro y oscuro',
    'hero.avail':'Disponible para puestos junior en consultoría, negocio y datos',
    'hero.lead':'Creo dashboards, aplicaciones web y modelos de procesos que hacen que un negocio <em>se vea con claridad</em>.',
    'hero.sub':'Termino el grado en Ciencia, Gestión e Ingeniería de Servicios en la Universidad Rey Juan Carlos, a falta de presentar el TFG en abril. Tengo experiencia en prácticas en Bosch, en Quality 4.0. Trabajo entre el negocio y la tecnología.',
    'hero.cta1':'Ver mi trabajo','hero.cta2':'Hablemos',
    'card.role':'Negocio × Tecnología','card.projects':'Proyectos','card.reports':'Informes BI en línea','card.langs':'Idiomas',
    'card.now':'<b>Actualmente:</b> trabajando en mi TFG sobre WeChat como superapp','photo.alt':'Retrato de Alejandra Calderón Méndez',
    'feat.eyebrow':'Casos destacados','feat.title':'Tres proyectos contados como casos','feat.sub':'El contexto, el problema, lo que hice y lo que salió de ello.',
    'case.context':'Contexto','case.challenge':'Reto','case.did':'Qué hice','case.read':'Leer el caso',
    'all.eyebrow':'Todos los proyectos','all.title':'Proyectos por etapas','all.sub':'Agrupados según dónde los hice. Abre uno para ver el informe en vivo, la web o las diapositivas.',
    'filter.all':'Todos','view':'Ver detalles','illustration':'Ilustración',
    'j.eyebrow':'Mi recorrido','j.title':'Del negocio a la tecnología','j.sub':'Usa las flechas (también las del teclado) o arrastra las tarjetas. Abre una para leer esa etapa.',
    'j.prev':'Etapa anterior','j.next':'Etapa siguiente','j.when':'Cuándo','j.where':'Dónde','j.chapter':'Etapa','j.of':'de',
    'tk.eyebrow':'Herramientas','tk.title':'Con qué trabajo','tk.sub':'Del modelo de datos a la pantalla, y el proceso que hay alrededor.',
    'c.eyebrow':'Contacto','c.title':'Hablemos.','c.text':'Busco un puesto junior donde se crucen el negocio y la tecnología: consultoría, análisis de negocio o de datos, y cloud. Escríbeme o encuéntrame en línea.',
    'c.copy':'Copiar correo','c.copied':'Copiado',
    'foot.built':'Hecha con HTML, CSS y JavaScript · Alojada en AWS (S3 + CloudFront)',
    'dlg.close':'Cerrar ✕','dlg.did':'Qué hice','dlg.tools':'Herramientas','dlg.full':'Abrir a pantalla completa ↗',
    'dgm.help':'Amplía con los botones, Ctrl + rueda, o arrastra para moverte','dgm.fit':'Ajustar','dgm.full':'Pantalla completa','dgm.exit':'Salir de pantalla completa',
    'creds':'Trayectoria','cv':'Descargar CV','g.more':'Ver {n} más','g.less':'Ver menos'
  }
};
const T = k => (UI[LANG] && UI[LANG][k]) ?? UI.en[k] ?? k;

/* ---------- Spanish content ---------- */
const ES = {
  cats: { dashboards:'Dashboard', apps:'Aplicación web', cases:'Caso de estudio', process:'Proceso', presentations:'Presentación' },
  plural: { dashboards:'Dashboards', apps:'Aplicaciones web', cases:'Casos de estudio', process:'Procesos', presentations:'Presentaciones' },
  links: {
    'Visit the website':'Visitar la web','Read the business plan':'Leer el plan de empresa','Open the dashboard':'Abrir el dashboard',
    'Visit the prototype':'Ver el prototipo','Visit the landing page':'Ver la landing page','See the value proposition canvas':'Ver el canvas de propuesta de valor','Open the presentation':'Abrir la presentación','Watch the video':'Ver el vídeo','Try the quiz':'Probar el cuestionario','Open the whiteboard':'Abrir la pizarra'
  },
  embeds: { 'Regional economic analysis':'Análisis económico regional', 'Orders analysis':'Análisis de pedidos' },
  projects: {
    'tagliatella': { title:'Dashboard ejecutivo para La Tagliatella', blurb:'Dashboard ejecutivo en Power BI para una cadena de restaurantes.',
      summary:'Un dashboard de nivel directivo en Power BI para la cadena de restaurantes La Tagliatella, con KPIs construidos como medidas DAX. Usa los filtros del informe para explorarlo.' },
    'china-bi': { title:'China en el mundo', blurb:'Informe de Power BI sobre la economía y el comercio de China, con datos obtenidos por web scraping, Power Query y DAX.',
      summary:'Un proyecto de inteligencia de negocio de tema libre. Elegí China porque creo que merece la pena entender cómo se relaciona esta potencia con el resto del mundo, con la Unión Europea y con España.\n\nEl informe tiene cuatro páginas: una visión general, el crecimiento de China desde 1980, su comercio con sus principales socios y la riqueza de cada provincia.',
      didTitle:'Mi parte',
      did:['Recogí los datos con web scraping de fuentes públicas de economía y comercio','Limpié y combiné las tablas con Power Query','Construí el modelo de datos y los KPI con medidas DAX: multiplicador del PIB, ratio exportaciones/importaciones, cuota de cada provincia en el PIB y brecha Guangdong–Tíbet','Diseñé un informe con navegación entre páginas y un estilo visual coherente'],
      tools:['Power BI','Web scraping','Power Query','DAX','Modelado de datos'] },
    'woof': { title:'Woof Studio · Análisis de mercado y web', blurb:'Análisis de mercado en Power BI y web para una peluquería canina móvil en Madrid.',
      summary:'Plan de empresa de un grupo de cinco personas para la asignatura de Iniciativa Empresarial. El reto era diseñar un negocio viable con 30.000 € de inversión inicial que diera beneficios al cierre del primer ejercicio contable.\n\nNuestra propuesta fue Woof Studio, un servicio de peluquería canina móvil en el noroeste de Madrid: una furgoneta totalmente equipada aparca delante de casa del cliente.\n\nHicimos el plan de empresa y la web del servicio. Por iniciativa propia añadí un análisis de mercado en Power BI: estima los clientes potenciales de la zona y mide los tiempos en coche hasta cada municipio, para calcular el gasto en gasolina de cada ruta de la furgoneta.',
      didTitle:'Qué muestra',
      did:['Caja positiva desde el segundo mes: el primer año cierra con 36.889 € en tesorería, por encima de los 30.000 € de inversión','Rentabilidad económica del 48 % y financiera del 25 % el primer año','Unos 1.089 clientes potenciales estimados en la zona','Renta media por hogar de 63.069 €, 1,98 veces la media española','4 de los 5 municipios con más renta están a menos de 15 minutos en coche','Una web que explica el servicio en tres pasos, con precios según el tamaño del perro, opiniones, zonas de servicio y formulario de reserva'],
      tools:['Power BI','Análisis de mercado','Mapas','Diseño web','Netlify'] },
    'pizarra': { blurb:'Pizarra colaborativa en tiempo real que programé para mis clases online de matemáticas y que uso cada semana.',
      summary:'Durante años di mis clases con Microsoft Whiteboard, hasta que Microsoft lo cerró este mes y dejó de funcionar. Tenía que buscar otra pizarra y, como además quiero dar más clases online, decidí hacer la mía.\n\nLo más importante para mí era poder ver cómo mis alumnos resuelven los ejercicios sin mi ayuda: los alumnos con tablet escriben en la pizarra y yo lo veo en directo. Al terminar cada clase les mando la pizarra con todo lo explicado ese día, algo que siempre agradecen.\n\nEl alumno entra con un enlace, sin registrarse. La programé con ayuda de Claude (IA): definí lo que tenía que hacer, dirigí el desarrollo, la desplegué en AWS y la probé en clases reales.',
      didTitle:'Qué hace',
      did:['Los alumnos escriben con su tablet y yo lo veo en directo, con el cursor de cada uno','Exportar toda la pizarra en alta resolución (PNG o SVG), sin marca de agua, para enviarla después de clase','Zoom de hasta el 3.000 % para escribir con comodidad','Cuentas de profe con código de invitación y carpetas por asignatura','Modo solo lectura para que los alumnos no dibujen','Un botón dentro de la sala que abre el enlace de Google Meet de la clase'],
      extra:{ title:'Cómo está hecha', items:['Angular 21 con TypeScript estricto, componentes standalone, signals y rutas bajo demanda','Excalidraw (React) integrado en un componente de Angular como motor de dibujo','Servidor Node.js con Express para la API y Socket.io para sincronizar a varias personas dibujando a la vez','Seguridad: contraseñas cifradas con scrypt, sesiones firmadas con HMAC, bloqueo tras intentos fallidos y límites contra abusos','Desplegada en AWS Lightsail con Docker y Caddy para el HTTPS automático','Pruebas automáticas de cuentas, permisos, límites y de dos usuarios dibujando a la vez'] } },
    'tracker-8d': { title:'Dashboard de Power BI de reclamaciones 8D', blurb:'Dashboard de Power BI con los datos de Q-Alert para seguir las reclamaciones de calidad por el método 8D.',
      summary:'Un dashboard de Power BI que hice durante mis prácticas en Bosch con los datos de Q-Alert, para seguir las reclamaciones de calidad a lo largo del proceso de resolución 8D.',
      did:['Escribí las medidas DAX y las columnas calculadas detrás de las cifras','Construí tablas de calendario para analizar por semana, mes y año','Añadí segmentadores dinámicos para que cada equipo vea su parte'],
      tools:['Power BI','Medidas DAX','Columnas calculadas','Inteligencia de tiempo'],
      note:'Proyecto interno de la empresa. La imagen muestra cifras de ejemplo, no datos de la empresa.' },
    'qalert': { blurb:'Aplicación web interna para gestionar reclamaciones de calidad con el método 8D.',
      summary:'Una aplicación web interna para el departamento de calidad de Bosch (Quality 4.0, QMM1). Sigue cada reclamación de calidad de cliente por las fases de resolución 8D y muestra de un vistazo cuáles van en plazo y cuáles con retraso. Redujo un 83 % el tiempo de gestión de las fases D1, D2 y D3, de 2 horas a 20 minutos. Participé en su desarrollo durante mis prácticas.',
      didTitle:'Qué hace',
      did:['Visor de reclamaciones con la fase 8D actual, el plazo y la fecha de cierre de cada fase','Estado por colores: en plazo, cerca del límite o con retraso, según cuánto se ha consumido de cada plazo','Filtros tipo Excel en cada columna, incluido un filtro de fechas por año, mes y día, con chips de filtros activos y paginación','Formulario de nueva reclamación que numera avisos y reclamaciones automáticamente y valida los números de pieza con autocompletado','Página de changelog con lo que añade, mejora y corrige cada versión'],
      note:'Mi parte: mejorar la interfaz, añadir funcionalidades como los filtros por columna con paginación, conectar los datos de la aplicación con Power BI, correcciones de despliegue y el control de versiones con GitLab. Herramienta interna: la imagen es una ilustración con datos inventados, no una captura.' },
    'blocking': { blurb:'Aplicación web interna para bloquear piezas no conformes y rastrear la máquina de la que vienen.',
      summary:'Una segunda aplicación web interna para el departamento de calidad de Bosch. Gestiona el proceso de Blocking & Fencing de piezas no conformes y automatiza la comunicación entre departamentos, para que cada lote bloqueado se pueda rastrear. Sigue los mismos patrones de interfaz que Q-Alert, pero al principio las dos aplicaciones se habían construido juntas, con la misma base de datos y el mismo backend, así que cualquier cambio en una afectaba a la otra. Para independizarlas se hizo un fork del repositorio en GitLab y cada proyecto pasó a tener su propia base de datos y su propio backend.',
      didTitle:'Mi parte',
      did:['Construí la vista del layout de planta que muestra de qué máquina viene cada pieza defectuosa','Mantuve los mismos patrones de interfaz que Q-Alert para que los usuarios se muevan entre las dos herramientas sin tener que aprender nada nuevo','Participé con un compañero en la separación de los dos proyectos: fork en GitLab y base de datos y backend propios para cada aplicación'],
      note:'Herramienta interna: la imagen es una ilustración con datos inventados, no una captura.' },
    'domesticgo': { blurb:'Propuesta de startup para Santander X Explorer: un único sitio de confianza para contratar ayuda en casa.',
      summary:'Nuestra propuesta para el programa Santander X Explorer (Banco Santander y Fundación UCEIF) en primero de carrera. DomesticGo, que empezó llamándose JUST SERVI, es una plataforma que conecta hogares con proveedores verificados de servicios domésticos como limpieza, cuidado de personas mayores o de mascotas. Trabajamos en ella durante las 12 semanas del programa, de enero a abril de 2023, desde las primeras hipótesis hasta una landing page.',
      did:['Coordiné un equipo de cuatro personas y las entregas semanales, cumpliendo el 100 % de los hitos','Mapeamos los dos lados del mercado con un Value Proposition Canvas y un Customer Journey Map para clientes y proveedores','Diseñamos el servicio: perfiles verificados, pago retenido hasta que el cliente confirma el trabajo, seguimiento en tiempo real, reseñas y un sistema de recompensas','Definimos el MVP y lanzamos una landing page en Webflow para captar los primeros registros'] },
    'wechat': { title:'WeChat como superapp', blurb:'Trabajo de fin de grado: la tecnología, el modelo de negocio y el impacto social del ecosistema de miniprogramas de WeChat.',
      summary:'Mi trabajo de fin de grado en la URJC: “WeChat como super app: disección tecnológica, sinergias empresariales y consecuencias sociales del ecosistema de miniprogramas”. Estudia Weixin, la versión de WeChat de China continental, desde las tres áreas del grado: la tecnología que la sostiene, el modelo de negocio que la hace viable y su impacto en la sociedad. Explica cómo una app de mensajería de 2011 se ha convertido en el lugar donde 1.200 millones de personas chatean, pagan, compran y acceden a servicios públicos, y por qué en Occidente no existe un equivalente.',
      facts:[['1.200 M','usuarios activos mensuales (2023)'],['2,3 M','miniprogramas, sin descarga ni instalación'],['67,8 bill. ¥','en transacciones de WeChat Pay en el 3T de 2023']],
      didTitle:'Qué analiza',
      did:['La evolución de la mensajería (2011) a las cuentas oficiales (2012), WeChat Pay (2013) y los miniprogramas (2017)','Cómo funcionan los miniprogramas: apps de menos de 10 MB que se ejecutan dentro de WeChat y reutilizan WeChat Pay y la identidad del usuario','El modelo de negocio de Tencent: fuentes de ingresos, incentivos para marcas y desarrolladores, y WeCom como puente entre empresas y clientes','La dimensión social: datos y privacidad, dependencia de los usuarios y WeChat como infraestructura semipública, de los servicios públicos a los códigos sanitarios del COVID','Por qué ninguna empresa occidental ha conseguido un equivalente'],
      tools:['Análisis de plataformas','Análisis de modelo de negocio','Revisión bibliográfica','Documentación técnica y corporativa de Tencent'],
      note:'En curso. Basado en artículos académicos, documentación técnica y corporativa de Tencent e informes especializados, además de capturas propias usando WeChat en Shenzhen.' },
    'bpmn': { title:'BPMN: proceso de licencias musicales', blurb:'Modelo de proceso con cuatro participantes, desde la solicitud hasta la aprobación final.',
      summary:'Un modelo BPMN de un proceso de licencias musicales con cuatro participantes: los usuarios que solicitan y pagan la música, una entidad de gestión, los artistas y los productores. La entidad comprueba quién gestiona los derechos, tramita cada solicitud y paga a artistas y productores.',
      didTitle:'Qué muestra',
      did:['Cuatro pools con flujos de mensajes entre ellos','Compuertas exclusivas para aceptar o rechazar cada solicitud','Compuertas paralelas para atender a la vez a artistas y productores','Subprocesos que muestran cómo gestionan una solicitud artistas y productores'] },
    'starbucks': { title:'Starbucks en China: plan estratégico', blurb:'Plan para que Starbucks recupere terreno en China frente a Luckin Coffee y Manner: tres líneas estratégicas con objetivos SMART, KPIs y cronograma.',
      summary:'Una presentación de grupo para la asignatura de Marketing en la Universidad de Shenzhen sobre Starbucks en China, donde cadenas locales como Luckin Coffee y Manner le están quitando cuota de mercado.\n\nTras analizar la estrategia actual y los retos de la marca, propusimos tres líneas estratégicas: reinventar el producto, con bebidas más saludables y ediciones limitadas con sabores tradicionales chinos como el osmanto o el lichi; intensificar el marketing digital en Douyin y Xiaohongshu, con influencers, campañas de contenido generado por los usuarios y ofertas personalizadas en la app a partir de big data; y reforzar la cadena de suministro, con más café de origen local, inventario con analítica predictiva y proveedores certificados en prácticas sostenibles.\n\nCada línea se tradujo en objetivos SMART con KPIs medibles y un cronograma a un año. Lo que se ve aquí son las partes que hice yo.',
      didTitle:'Mi parte',
      did:['Desarrollé la propuesta estratégica y el plan de acción detallado','Comparé la presencia de Starbucks, Luckin Coffee y Manner en Douyin y Xiaohongshu por seguidores e interacción','Definí los objetivos SMART y sus KPIs: alcance, engagement, tasa de conversión, porcentaje de abastecimiento local y precisión de la previsión de demanda','Construí el cronograma a un año de las tres líneas estratégicas','Diseñé mis diapositivas en Canva China y los cronogramas en Mural'],
      tools:['Canva','Mural','Benchmarking','Objetivos SMART','KPIs','Roadmap'] },
    'pdd': { title:'Pinduoduo · Sistemas de Información de Gestión', blurb:'Presentación de grupo sobre Pinduoduo y el e-commerce en China. Nota: A.',
      summary:'Presentación sobre Pinduoduo para la asignatura de Sistemas de Información de Gestión en la Universidad de Shenzhen.\n\nRecorre el mercado del e-commerce en China, la historia de la empresa y sus retos de negocio, y después su gestión, organización, tecnología y sistemas de información, hasta proponer una solución.\n\nSaqué una A en la asignatura, y la profesora destacó que el diseño hiciera que una plataforma de precios bajos pareciera de lujo. Lo que se ve aquí son las partes que hice yo.',
      didTitle:'Mi parte',
      did:['Contexto de mercado: cómo creció el e-commerce en China, de Alibaba y JD.com a Meituan, y su peso en las ventas minoristas mundiales','Historia de Pinduoduo: el paso de la venta directa al marketplace, la compra en grupo para bajar precios, la viralidad a través de WeChat, y su misión, visión y valores','Retos de negocio: la competencia con Alibaba y JD.com, los hábitos de compra que cambió la COVID-19, la confianza y la seguridad en la plataforma, y una cadena de suministro agrícola poco eficiente','Rediseñé toda la presentación en Canva China para que las partes del grupo fueran coherentes entre sí y con la estética de Pinduoduo'], tools:['Canva','Análisis de mercado','Sistemas de información de gestión'] },
    'dreamteam': { title:'Blind box Dream Team', blurb:'Vídeo pitch de un coleccionable blind box inspirado en la Universidad de Shenzhen, con un cuestionario en WeChat.',
      summary:'Vídeo pitch para la asignatura de Emprendimiento en la Universidad de Shenzhen: un coleccionable blind box inspirado en la universidad, al estilo de Labubu, con llaveros con las personalidades de un “dream team” de estudiantes.\n\nEmpieza con un storytelling grabado con mi dron sobre el campus y, a partir del minuto 0:32, muestra cómo serían los puestos de venta de los llaveros. La voz y el texto se generaron con IA, como pedía el ejercicio.\n\nPara llevar la idea a la práctica creé un cuestionario de 10 preguntas en WeChat: cada estudiante descubre qué personalidad del dream team es, por ejemplo “The Hacker”, y recoge su llavero, que se conecta con otros seis para completar el equipo. El cuestionario sigue funcionando y se puede probar.',
      didTitle:'Mi parte',
      did:['Grabé las imágenes del campus con mi dron DJI Mini 4 Pro','Generé con IA las imágenes de los puestos de venta, la voz y el texto del vídeo','Creé en WeChat un cuestionario de 10 preguntas con puntuación que asigna a cada estudiante una de siete personalidades','Recogí todas las respuestas en WeChat y generé informes con las métricas'],
      tools:['Canva','DJI Mini 4 Pro','IA generativa','Cuestionario en WeChat (Wenjuanxing)','Informes de métricas'] },
    'lumio': { blurb:'Propuesta de web y app móvil para una clínica veterinaria.',
      summary:'Una propuesta para desarrollar una web y una app móvil para una clínica veterinaria, presentada con el nombre Lumio Studio.',
      did:['Diseñé la presentación de la propuesta en Canva'], tools:['Canva','Propuesta web y app'] }
  },
  featured: {
    'qalert': { kicker:'Bosch · Prácticas en Quality 4.0', title:'Q-Alert: un solo sitio para seguir cada reclamación de calidad',
      context:'El departamento de calidad de Bosch gestiona las reclamaciones de clientes con el método 8D. Cada fase tiene su propio plazo y las tres primeras llevaban unas 2 horas por reclamación.',
      challenge:'Ver de un vistazo qué reclamaciones van en plazo, cuáles están cerca del límite y cuáles van con retraso, y encontrar cualquiera rápido.',
      did:['Mejoré la interfaz y añadí funcionalidades como los filtros por columna tipo Excel con paginación','Conecté los datos de la aplicación con Power BI para los informes','Corregí problemas de despliegue y llevé el control de versiones en GitLab'],
      metrics:[['83 %','menos tiempo en las fases D1–D3'],['2 h → 20 min','por reclamación en esas fases'],['8D','fases seguidas en cada reclamación']],
      note:'Herramienta interna: la imagen es una ilustración con datos inventados.' },
    'woof': { kicker:'Iniciativa Empresarial · Proyecto de grupo', title:'Woof Studio: ¿hay mercado para una peluquería canina móvil?',
      context:'Un plan de empresa para un servicio de peluquería canina móvil en el noroeste de Madrid, con su propia web y un análisis de mercado en Power BI.',
      challenge:'Crear un negocio viable con 30.000 € de inversión inicial y beneficios al cierre del primer año. Para eso había que averiguar si la zona tiene suficientes clientes con renta suficiente, y qué municipios debería cubrir primero la furgoneta.',
      did:['Por iniciativa propia, añadí al plan un análisis de mercado en Power BI','Estimé los clientes potenciales y comparé la renta de los hogares con la media española','Medí los tiempos en coche hasta cada municipio para calcular el gasto en gasolina por ruta'],
      metrics:[['~1.089','clientes potenciales estimados'],['1,98×','renta por hogar frente a la media española'],['4 de 5','municipios con más renta a menos de 15 min']],
      tools:['Power BI','Análisis de mercado','Mapas'] },
    'domesticgo': { kicker:'Santander X Explorer · Programa de emprendimiento', title:'DomesticGo: un único sitio de confianza para contratar ayuda en casa',
      context:'Nuestra propuesta para el programa Santander X Explorer (enero–abril de 2023), en primero de carrera: una plataforma para encontrar y contratar servicios domésticos como limpieza, cuidado de mayores o de mascotas.',
      challenge:'Que contratar a alguien para tu casa sea seguro para las dos partes: perfiles verificados, precios claros y pago liberado solo cuando el trabajo está hecho.',
      did:['Coordiné un equipo de cuatro personas y las entregas semanales','Mapeamos clientes y proveedores con un Value Proposition Canvas y Customer Journey Maps','Definimos el MVP y lanzamos la landing page en Webflow'],
      metrics:[['100 %','de hitos semanales cumplidos'],['4','personas en el equipo'],['12','semanas de las primeras hipótesis a la landing']] }
  },
  creds: [['Prácticas','Bosch · Quality 4.0'],['Grado','Universidad Rey Juan Carlos'],['Intercambio','Shenzhen University · 2024–25'],['Idiomas','Español · Inglés C1 · Mandarín']],
  stops: [
    { tag:'Grado', title:'Ciencia, Gestión e Ingeniería de Servicios',
      text:'Un grado que mezcla gestión empresarial y TI. En la parte de datos: inteligencia de negocio con Power BI, bases de datos y SQL, y análisis de datos con Python y Excel. Además, gobierno TI (COBIT, ITIL 4), arquitectura empresarial con TOGAF y ArchiMate, Scrum y Kanban, y servicios web en Java con REST y SOAP.', chips:['Inteligencia de negocio','SQL','Gobierno TI','TOGAF'] },
    { tag:'Extranjero', when:'sep 2024 – jul 2025', title:'Intercambio en China',
      text:'Aquí empezó de verdad mi interés por China: de ahí salió mi TFG sobre WeChat y por eso estudio mandarín, ya en segundo año. Cursé 15 asignaturas en dos semestres, en un entorno multicultural y en un ecosistema digital muy distinto al europeo.', chips:['Administración de empresas','Mandarín','Gestión intercultural'] },
    { tag:'Aprender construyendo', title:'Proyectos en la universidad',
      text:'DomesticGo, una propuesta de startup para Santander X Explorer. Dashboards de Power BI para una cadena de restaurantes y sobre el papel de China en el mundo. Woof Studio, un plan de empresa con su propia web y análisis de mercado.' },
    { tag:'Empresa', when:'nov 2025 – jul 2026', where:'Bosch · Quality 4.0 (QMM1)', title:'Prácticas',
      text:'Participé en el desarrollo de Q-Alert, una aplicación de reclamaciones de calidad que redujo un 83 % el tiempo de las fases D1–D3 del 8D, y en el layout de una aplicación de Blocking & Fencing. Conecté los datos de la aplicación con Power BI y creé agentes de IA con Copilot Studio.' },
    { tag:'Actualmente', title:'Trabajo de fin de grado',
      text:'Termino mi TFG sobre WeChat como super app: la tecnología, el modelo de negocio y el ecosistema de miniprogramas de una app que usan 1.200 millones de personas, su impacto social y por qué en Occidente no hay un equivalente.', chips:['Análisis de plataformas','Modelos de negocio','Miniprogramas'] },
    { tag:'Siguiente', when:'Disponible ya', where:'Madrid · disponible para mudarme', title:'Análisis de datos, cerca del negocio',
      text:'Ahora quiero crecer como analista de datos: limpiar y modelar datos con SQL y Power Query, construir informes de Power BI con DAX y explicar qué dicen los números a quien toma las decisiones. Con el tiempo, me veo llevando eso a la consultoría y a proyectos internacionales.', chips:['Análisis de datos','SQL','Power BI','Python'] }
  ],
  journey: {
    chips:['URJC','Shenzhen University','Proyectos URJC','Bosch','TFG WeChat','Lo siguiente'],
    cta:{0:'Ver proyectos de la URJC',1:'Ver proyectos de SZU',2:'Ver proyectos de la URJC',3:'Ver proyectos de Bosch',4:'Sobre el TFG',5:'Hablemos'}
  },
  toolkit: ['Datos y BI','Análisis de negocio y procesos','Desarrollo e integración','Cloud y despliegue','Arquitectura y gobierno','Formas de trabajo','Idiomas'],
  toolkitChips: {
    'Power BI Desktop and Service':'Power BI Desktop y Service','DAX measures':'Medidas DAX','Calculated columns':'Columnas calculadas','Time intelligence':'Inteligencia de tiempo',
    'Data modelling':'Modelado de datos','Requirements gathering':'Toma de requisitos','Stakeholder workshops':'Talleres con stakeholders','User stories':'Historias de usuario',
    'Process mapping':'Mapeo de procesos','Figma prototyping':'Prototipado en Figma','Market analysis':'Análisis de mercado','P&L models':'Cuentas de resultados (P&L)',
    'REST and SOAP web services':'Servicios web REST y SOAP','Git and GitLab':'Git y GitLab','IIS deployment':'Despliegue en IIS',
    'IT governance (COBIT, ITIL 4)':'Gobierno TI (COBIT, ITIL 4)','System dynamics (Vensim)':'Dinámica de sistemas (Vensim)','Agile delivery':'Entrega ágil',
    'Spanish · native':'Español · nativo','English · C1':'Inglés · C1','Mandarin Chinese · basic (2nd year)':'Chino mandarín · básico (2.º año)'
  }
};

ES.groups = {
  bosch:{ role:'Prácticas en Quality 4.0', when:'nov 2025 – jul 2026', text:'Herramientas internas para el departamento de calidad. Las imágenes son ilustraciones con datos inventados.' },
  szu:{ role:'Intercambio internacional', when:'sep 2024 – jul 2025', text:'Asignaturas de empresa y sistemas de información en uno de los grandes polos tecnológicos de China.' },
  urjc:{ role:'Grado y TFG', text:'Dashboards, aplicaciones, modelos de procesos y propuestas de la carrera.' },
  own:{ name:'Proyectos personales', role:'Por mi cuenta', when:'En uso', text:'Herramientas que construyo porque las necesito.' }
};

/* Merge the Spanish layer into the content before anything renders */
if(LANG === 'es'){
  Object.assign(CATS, ES.cats);
  PROJECTS.forEach(p => {
    const o = ES.projects[p.id]; if(o) Object.assign(p, o);
    (p.links || []).forEach(l => { if(ES.links[l.label]) l.label = ES.links[l.label]; });
    (p.embeds || []).forEach(e => { if(e.label && ES.embeds[e.label]) e.label = ES.embeds[e.label]; });
  });
  FEATURED.forEach(f => Object.assign(f, ES.featured[f.id] || {}));
  GROUPS.forEach(g => Object.assign(g, ES.groups[g.id] || {}));
  CREDS.splice(0, CREDS.length, ...ES.creds);
  STOPS.forEach((s, i) => Object.assign(s, ES.stops[i] || {}));
  TOOLKIT.forEach((g, i) => { g.t = ES.toolkit[i] || g.t; g.c = g.c.map(c => ES.toolkitChips[c] || c); });
}

/* Static text in index.html: data-i18n (text), data-i18n-html (markup), data-i18n-aria, data-i18n-alt */
function applyStatic(){
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = T(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = T(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', T(el.dataset.i18nAria)); });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => { el.alt = T(el.dataset.i18nAlt); });
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === LANG));
}
function setLang(l){
  if(l === LANG) return;
  try{ localStorage.setItem('ac-lang', l); sessionStorage.setItem('ac-scroll', String(scrollY)); }catch(e){}
  const u = new URL(location.href); u.searchParams.set('lang', l);
  location.replace(u.toString());
}
