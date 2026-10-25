// Contenido del portfolio. Los textos marcados con TODO son placeholders a completar.

export const site = {
  name: "Gonzalo Guillermo Spinelli",
  shortName: "Gonzalo Spinelli",
  role: "Vibecoder · builder con IA",
  email: "spinelliggonzalo@gmail.com",
  github: "", // TODO: https://github.com/...
  linkedin: "", // TODO: https://www.linkedin.com/in/...
  formspree: "", // TODO: https://formspree.io/f/xxxxxxx
};

// cada variant tiene su propio showcase animado en src/components/showcases/
export type Variant = "model3d" | "qr" | "clinic" | "shop" | "dashboard";
export type ProjectLink = { href: string; label?: string };
export type Project = {
  variant: Variant;
  title: string;
  kicker?: string;
  desc: string;
  decision?: string;
  tags: string[];
  links: ProjectLink[];
  privateCode?: boolean;
  model?: string; // .glb en /public para el variant model3d
};

export const projects: Project[] = [
  {
    variant: "model3d",
    title: "Mod 3D para Elden Ring",
    kicker: "Modding con IA",
    desc: "TODO: Importé un modelo 3D personalizado dentro de Elden Ring usando Claude Code para resolver el pipeline: conversión del modelo, rigging y empaquetado del mod.",
    decision: "TODO: qué fue lo más difícil y cómo lo resolviste.",
    tags: ["Claude Code", "Blender", "Modding"],
    links: [],
    model: "", // TODO: "/models/personaje.glb"
  },
  {
    variant: "qr",
    title: "Timbre inteligente con QR",
    kicker: "IoT para casa",
    desc: "TODO: El visitante escanea un QR en la puerta y el timbre suena en el teléfono. Una webapp muestra quién tocó y el historial de visitas.",
    decision: "TODO: cómo se conecta el QR con el teléfono (notificaciones push, WebSocket, etc.).",
    tags: ["Claude Code", "Webapp", "Notificaciones push"],
    links: [],
  },
  {
    variant: "clinic",
    title: "Gestión de pacientes para psicología",
    kicker: "Proyecto para un profesional",
    desc: "TODO: Webapp para que un psicólogo lleve sus pacientes: agenda de turnos, fichas e historial de sesiones.",
    decision: "TODO: cómo se protegen los datos sensibles de los pacientes.",
    tags: ["Claude Code", "Webapp", "Base de datos"],
    links: [],
    privateCode: true,
  },
  {
    variant: "shop",
    title: "Khorven",
    kicker: "Ecommerce · en colaboración",
    desc: "TODO: Tienda online con catálogo, carrito y checkout.",
    tags: ["TODO"],
    links: [{ href: "https://khorven-presentation.vercel.app", label: "Ver presentación" }],
  },
  {
    variant: "dashboard",
    title: "Dashboard de analíticas",
    kicker: "En colaboración",
    desc: "TODO: Panel con métricas, gráficos y filtros para seguir el rendimiento del negocio.",
    tags: ["TODO"],
    links: [],
  },
];
