// Contenido del portfolio (copy basado en portafolio.md de Gonzalo). TODO = dato a completar.

export const site = {
  name: "Gonzalo Guillermo Spinelli",
  shortName: "Gonzalo Spinelli",
  email: "spinelliggonzalo@gmail.com",
  github: "https://github.com/ggonzalospineli-ops",
  linkedin: "", // TODO: https://www.linkedin.com/in/...
  formspree: "", // TODO: https://formspree.io/f/xxxxxxx
};

// cada visual es un componente en src/components/visuals/ que se anima con el scroll (--p y data-step)
export type Visual = "model3d" | "kernel" | "cipher" | "catalog" | "checkout" | "dashboard" | "doorbell" | "recommender";
export type ProjectLink = { href: string; label: string };
export type Project = {
  visual: Visual;
  name: string; // nombre corto para el índice
  headline: string; // frase grande del capítulo
  discipline: string;
  status: string;
  desc: string;
  highlights?: string[];
  tags: string[];
  links: ProjectLink[];
  dark?: boolean; // capítulo con fondo negro
  model?: string; // .glb en /public para el visual model3d
};

export const projects: Project[] = [
  {
    visual: "model3d",
    name: "JorgeM",
    headline: "Una persona real, convertida en jefe de Elden Ring.",
    discipline: "IA generativa 3D · Ingeniería inversa",
    status: "Terminado",
    desc: "Mod de Elden Ring que reemplaza a un jefe por un personaje 3D construido a partir de fotos de una persona real, conservando las animaciones y la IA de combate del original.",
    highlights: [
      "Malla 3D generada desde fotos con IA, corriendo en una GPU de escritorio. Sin nube.",
      "Formato de assets propietario de FromSoftware revertido: malla, empaquetado y compresión.",
      "El modelo aparecía negro: un único campo de color en el binario, corregido byte a byte.",
    ],
    tags: ["Hunyuan3D", "PyTorch", "Blender", "Soulstruct", "Python"],
    links: [],
    dark: true,
    model: "", // TODO: "/models/jorgem.glb"
  },
  {
    visual: "kernel",
    name: "Kali NetHunter",
    headline: "Un sistema operativo de seguridad, en un teléfono que no lo soporta.",
    discipline: "Sistemas de bajo nivel · Seguridad defensiva",
    status: "Objetivos cumplidos",
    desc: "Porte de Kali NetHunter a un Samsung fuera de la lista oficial, con un kernel compilado a medida y sin tocar el sistema de uso diario. Complementado con una estación Wi-Fi portátil para auditar redes propias.",
    highlights: [
      "Kernel del fabricante compilado con su toolchain original.",
      "Causa raíz: la clave de cifrado del almacenamiento está atada a la verificación de arranque en TrustZone/Knox.",
      "Controladores integrados en el kernel; todo documentado en una bitácora de ingeniería.",
    ],
    tags: ["C", "Kernel Linux", "Android", "TrustZone / Knox"],
    links: [],
    dark: true,
  },
  {
    visual: "cipher",
    name: "Otra Escena",
    headline: "Historia clínica que ni el servidor puede leer.",
    discipline: "Criptografía aplicada · PWA",
    status: "En uso",
    desc: "PWA para que profesionales de la salud mental gestionen su consultorio en cualquier dispositivo, online u offline. Modelo zero-knowledge: el servidor nunca ve un dato en claro.",
    highlights: [
      "Cifrado en el dispositivo con AES-GCM; clave protegida por PBKDF2 o biometría.",
      "Desbloqueo con Face ID o huella vía WebAuthn.",
      "Sincronización extremo a extremo y backup cifrado.",
    ],
    tags: ["WebCrypto", "WebAuthn", "Cloudflare Workers", "D1"],
    links: [{ href: "https://ggonzalospineli-ops.github.io/otra-escena/", label: "Ver app" }],
  },
  {
    visual: "catalog",
    name: "EPA Accesorios",
    headline: "1.400 productos importados. Un negocio real, en línea.",
    discipline: "Ecommerce",
    status: "En producción",
    desc: "Tienda online en operación: marroquinería, valijas, mochilas, billeteras, línea escolar y accesorios, con ofertas, variantes y control de stock.",
    highlights: [
      "Catálogo por categorías con variantes de color y talle.",
      "Precios regulares y promocionales, con control de stock.",
    ],
    tags: ["Ecommerce", "Catálogo", "Stock"],
    links: [{ href: "https://www.epaccesorios.com.ar/", label: "Ver tienda" }],
  },
  {
    visual: "checkout",
    name: "Khorven",
    headline: "TODO: frase de Khorven.",
    discipline: "Ecommerce · En colaboración",
    status: "TODO",
    desc: "TODO: Tienda online con catálogo, carrito y checkout.",
    tags: ["TODO"],
    links: [], // TODO: link a la tienda
  },
  {
    visual: "dashboard",
    name: "Analytics",
    headline: "TODO: frase del dashboard de analíticas.",
    discipline: "Datos · En colaboración",
    status: "TODO",
    desc: "TODO: Panel con métricas, gráficos y filtros para seguir el rendimiento del negocio.",
    tags: ["TODO"],
    links: [],
  },
  {
    visual: "doorbell",
    name: "Timbre QR",
    headline: "Un timbre sin cables. Suena en tu teléfono.",
    discipline: "IoT · PWA",
    status: "Funcionando",
    desc: "TODO: El visitante escanea un QR en la puerta y el aviso llega al teléfono al instante. Una webapp muestra quién tocó y el historial de visitas.",
    highlights: ["TODO: cómo viaja el aviso del QR al teléfono (push, WebSocket, etc.)."],
    tags: ["PWA", "Notificaciones push"],
    links: [],
  },
  {
    visual: "recommender",
    name: "Rico y Barato",
    headline: "25.000 opciones. Tres que valen la pena.",
    discipline: "Datos · Motor de recomendación",
    status: "En desarrollo",
    desc: "Recomienda qué pedir optimizando precio y valor según tres variables: antojo, hambre y presupuesto, sobre un dataset construido a medida.",
    highlights: [
      "Motor aislado de la interfaz por un contrato de API documentado.",
      "Más de 25.000 productos de cientos de comercios, normalizados automáticamente.",
      "Tests que crecen con cada caso límite.",
    ],
    tags: ["Python", "Datos", "API", "Tests"],
    links: [],
  },
];

// trabajo en curso que todavía no tiene capítulo propio
export const wip = [
  {
    title: "Automatización de procesos operativos",
    desc: "Reemplazo de una tarea manual recurrente por un proceso automático, sin error humano.",
  },
];

export const stats = [
  { n: 1400, suffix: "+", label: "productos en producción" },
  { n: 25000, suffix: "+", label: "datos normalizados" },
  { n: 0, suffix: "", label: "bytes en claro en el servidor" },
  { n: 1, suffix: "", label: "GPU local, sin nube" },
];

export const capabilities = [
  { k: "01", t: "Bajo nivel", d: "C, kernel Linux y seguridad de dispositivos. Compilar, revertir formatos binarios, entender el arranque del hardware.", tags: ["C", "Kernel Linux", "TrustZone"] },
  { k: "02", t: "Criptografía aplicada", d: "Zero-knowledge y cifrado extremo a extremo en productos que usa gente real todos los días.", tags: ["WebCrypto", "WebAuthn", "AES-GCM"] },
  { k: "03", t: "IA generativa 3D", d: "Pipelines de 3D y video que corren en hardware propio, sin costos de nube.", tags: ["PyTorch", "Hunyuan3D", "Blender"] },
  { k: "04", t: "Producto web", d: "PWAs livianas y serverless, sin frameworks superfluos, separando el motor de la interfaz.", tags: ["JavaScript", "Cloudflare Workers", "D1"] },
  { k: "05", t: "Datos y automatización", d: "Datasets propios a escala, normalizados automáticamente y cubiertos con tests.", tags: ["Python", "ETL", "Tests"] },
];
