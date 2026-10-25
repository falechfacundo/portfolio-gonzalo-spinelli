// Contenido del portfolio (copy basado en portafolio.md de Gonzalo). TODO = dato a completar.

export const site = {
  name: "Gonzalo Guillermo Spinelli",
  shortName: "Gonzalo Spinelli",
  role: "Producto de punta a punta",
  email: "spinelliggonzalo@gmail.com",
  github: "https://github.com/ggonzalospineli-ops",
  linkedin: "", // TODO: https://www.linkedin.com/in/...
  formspree: "", // TODO: https://formspree.io/f/xxxxxxx
};

// cada variant tiene su propio showcase animado en src/components/showcases/
export type Variant = "model3d" | "kernel" | "clinic" | "shop" | "dashboard" | "recommender" | "qr";
export type ProjectLink = { href: string; label?: string };
export type Project = {
  variant: Variant;
  title: string;
  kicker?: string;
  tagline?: string;
  desc: string;
  highlights?: string[];
  tags: string[];
  links: ProjectLink[];
  privateCode?: boolean;
  model?: string; // .glb en /public para el variant model3d
  items?: string[]; // productos del variant shop
};

export const projects: Project[] = [
  {
    variant: "model3d",
    title: "JorgeM: un jefe de Elden Ring creado con IA",
    kicker: "Terminado · funcionando en el juego",
    tagline: "Convertí a una persona real en un jefe jugable de uno de los videojuegos más exigentes del mundo.",
    desc: "Mod de Elden Ring que reemplaza a un jefe por un personaje 3D construido a partir de fotos de una persona real, conservando las animaciones y la IA de combate del original. Tiene su propio nombre dentro del juego y la calidad de un asset oficial.",
    highlights: [
      "Pipeline propio: malla 3D generada desde fotos con IA, corriendo localmente en una GPU de escritorio, con el rostro real proyectado sobre el modelo.",
      "Ingeniería inversa del formato de assets propietario de FromSoftware: malla, empaquetado, compresión y nombre del personaje.",
      "El modelo aparecía negro en el juego: lo rastreé hasta un único campo de color en el binario y corregí esos bytes sin re-serializar el archivo.",
    ],
    tags: ["Hunyuan3D", "PyTorch", "Blender", "Soulstruct", "Python"],
    links: [],
    model: "", // TODO: "/models/jorgem.glb"
  },
  {
    variant: "kernel",
    title: "Kali NetHunter en hardware sin soporte",
    kicker: "Objetivos cumplidos · sistema funcional",
    tagline: "Compilé desde cero un sistema operativo de seguridad para un teléfono que oficialmente no lo soporta.",
    desc: "Porte de Kali NetHunter a un Samsung fuera de la lista oficial, con un kernel de Android compilado a medida y sin tocar el sistema de uso diario ni los datos. Se complementa con una estación Wi-Fi portátil para auditar la seguridad de redes inalámbricas propias.",
    highlights: [
      "Kernel del fabricante compilado con su toolchain original, reconstruyendo toda la cadena de arranque.",
      "Causa raíz: Samsung ata la clave de cifrado del almacenamiento a la verificación de arranque dentro de TrustZone/Knox. Encontrarla destrabó el proyecto.",
      "Controladores integrados en el kernel para sortear la autenticación de módulos; todo documentado en una bitácora de ingeniería.",
    ],
    tags: ["C", "Kernel Linux", "Android", "TrustZone / Knox", "Seguridad defensiva"],
    links: [],
  },
  {
    variant: "clinic",
    title: "Otra Escena",
    kicker: "Publicada · en uso",
    tagline: "Historia clínica donde ni siquiera el servidor puede leer los datos.",
    desc: "PWA instalable para que profesionales de la salud mental gestionen su consultorio: pacientes, notas clínicas y honorarios, en iPhone, Windows, Mac o tablet, online u offline. Usa un modelo zero-knowledge real: el servidor nunca ve un dato en claro.",
    highlights: [
      "Cifrado en el dispositivo con AES-GCM; la clave se protege con contraseña (PBKDF2) o biometría.",
      "Desbloqueo con Face ID o huella vía WebAuthn.",
      "Sincronización extremo a extremo y backup cifrado; exportación anonimizada para supervisión.",
    ],
    tags: ["PWA", "WebCrypto", "WebAuthn", "Cloudflare Workers", "D1", "JavaScript"],
    links: [{ href: "https://ggonzalospineli-ops.github.io/otra-escena/", label: "Ver app" }],
  },
  {
    variant: "shop",
    title: "EPA Accesorios",
    kicker: "En producción",
    tagline: "Ecommerce de productos importados a precio competitivo.",
    desc: "Tienda online en operación con más de 1.400 productos activos: marroquinería, valijas, mochilas, billeteras, línea escolar y accesorios, con ofertas y control de stock.",
    highlights: [
      "Catálogo por categorías con variantes de color y talle, precios regulares y promocionales.",
      "Negocio real, en línea y operativo.",
    ],
    tags: ["Ecommerce", "Catálogo", "Stock"],
    links: [{ href: "https://www.epaccesorios.com.ar/", label: "Ver tienda" }],
    items: ["Valija", "Mochila", "Billetera"],
  },
  {
    variant: "shop",
    title: "Khorven",
    kicker: "Ecommerce · en colaboración",
    desc: "TODO: Tienda online con catálogo, carrito y checkout.",
    tags: ["TODO"],
    links: [{ href: "https://khorven-presentation.vercel.app", label: "Ver presentación" }],
    items: ["Remera", "Buzo", "Gorra"],
  },
  {
    variant: "dashboard",
    title: "Dashboard de analíticas",
    kicker: "En colaboración",
    desc: "TODO: Panel con métricas, gráficos y filtros para seguir el rendimiento del negocio.",
    tags: ["TODO"],
    links: [],
  },
  {
    variant: "recommender",
    title: "Rico y Barato",
    kicker: "En desarrollo activo",
    tagline: "Un motor que decide qué conviene pedir según antojo, hambre y presupuesto.",
    desc: "Recomienda qué pedir optimizando la relación precio/valor a partir de tres variables: tipo de antojo, nivel de hambre y presupuesto, sobre un dataset construido a medida.",
    highlights: [
      "Motor de recomendación aislado de la interfaz por un contrato de API documentado.",
      "Más de 25.000 productos de cientos de comercios, normalizados automáticamente.",
      "Tests que crecen con cada caso límite, donde el negocio más lo exige.",
    ],
    tags: ["Python", "Datos", "API", "Tests"],
    links: [],
  },
];

// trabajo en curso que todavía no tiene showcase propio
export const wip = [
  {
    title: "Automatización de procesos operativos",
    desc: "Reemplazo de una tarea manual recurrente por un proceso automático, sin trabajo manual ni error humano.",
  },
];
