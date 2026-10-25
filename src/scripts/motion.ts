// motion.ts — scroll suave, apariciones y el "motor" de scroll: cada [data-scrub] recibe
// --p (0 → 1) y data-step, y los visuales se animan solo con CSS a partir de eso.
import Lenis from "lenis";

const $$ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

document.documentElement.dataset.motion = "on";
const reduced =
  matchMedia("(prefers-reduced-motion: reduce)").matches || !document.documentElement.classList.contains("js-motion");

/* ---------- scroll suave ---------- */
let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  const raf = (t: number) => {
    lenis!.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href")!;
    const target = document.querySelector<HTMLElement>(id);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + scrollY;
    lenis ? lenis.scrollTo(y, { duration: 1.6 }) : scrollTo({ top: y, behavior: "smooth" });
    if (id === "#main") target.focus({ preventScroll: true });
  });
});

/* ---------- apariciones ---------- */
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    }),
  { rootMargin: "0px 0px -4% 0px" },
);
$$("[data-reveal]").forEach((el) => io.observe(el));
requestAnimationFrame(() => document.getElementById("top")?.classList.add("is-in"));

/* ---------- contadores ---------- */
const fmt = (n: number) => n.toLocaleString("es-AR");
const countIo = new IntersectionObserver((entries) =>
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    countIo.unobserve(e.target);
    const el = e.target as HTMLElement;
    const to = Number(el.dataset.countTo);
    const t0 = performance.now();
    const step = (t: number) => {
      const k = clamp((t - t0) / 1800);
      el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - k, 4))));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }),
);
if (!reduced) $$("[data-count-to]").forEach((el) => countIo.observe(el));

/* ---------- motor de scroll ---------- */
// modos: "pin" = la sección es más alta que la pantalla y su contenido queda fijo;
// "exit" = progreso mientras la sección sale por arriba; "auto" = pin si es alta, si no "view"
const scrubs = $$("[data-scrub]");
const hscroll = $$("[data-hscroll]");
const chapters = $$("[data-chapter]");
const sections = $$("[data-nav-label]");
const nav = document.getElementById("nav");
const navSection = document.querySelector<HTMLElement>("[data-nav-section]");
const navCount = document.querySelector<HTMLElement>("[data-nav-count]");
const navProgress = document.querySelector<HTMLElement>("[data-nav-progress]");
const total = String(chapters.length).padStart(2, "0");

const progressOf = (el: HTMLElement, mode: string, vh: number) => {
  const r = el.getBoundingClientRect();
  if (mode === "exit") return clamp(-r.top / r.height);
  if (mode === "pin" || (mode === "auto" && r.height > vh * 1.4)) return clamp(-r.top / (r.height - vh));
  // "view": de que asoma abajo hasta que su centro llega arriba del centro
  return clamp((vh - r.top) / (vh * 0.5 + r.height * 0.6));
};

// el alto de la banda horizontal depende de cuánto mide el track
const sizeHscroll = () =>
  hscroll.forEach((sec) => {
    const track = sec.querySelector<HTMLElement>("[data-track]")!;
    const extra = Math.max(0, track.scrollWidth - innerWidth);
    sec.style.setProperty("--caps-h", `${innerHeight + extra}px`);
    sec.dataset.extra = String(extra);
  });

let ticking = false;
const update = () => {
  ticking = false;
  const vh = innerHeight;
  scrubs.forEach((el) => {
    const p = reduced ? 1 : progressOf(el, el.dataset.scrub!, vh);
    el.style.setProperty("--p", p.toFixed(4));
    const steps = Number(el.dataset.steps || 0);
    if (steps) el.dataset.step = String(Math.min(steps, Math.floor(p * steps)));
  });
  hscroll.forEach((sec) => {
    const p = parseFloat(sec.style.getPropertyValue("--p")) || 0;
    sec.style.setProperty("--x", `${p * Number(sec.dataset.extra || 0)}px`);
  });

  // nav: fondo al scrollear, modo oscuro sobre secciones negras, sección actual y progreso
  nav?.classList.toggle("is-stuck", scrollY > 20);
  const probe = 70;
  let current: HTMLElement | null = null;
  for (const s of sections) if (s.getBoundingClientRect().top <= probe) current = s;
  nav?.classList.toggle("on-dark", !!current?.classList.contains("is-dark"));
  if (navSection && current) navSection.textContent = current.dataset.navLabel!;
  if (navCount) navCount.textContent = `${current?.dataset.chapter ?? "00"} / ${total}`;
  const max = document.documentElement.scrollHeight - vh;
  navProgress?.style.setProperty("transform", `scaleX(${max > 0 ? scrollY / max : 0})`);
};
const request = () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
};

sizeHscroll();
update();
addEventListener("scroll", request, { passive: true });
addEventListener("resize", () => {
  sizeHscroll();
  request();
});
addEventListener("load", () => {
  sizeHscroll();
  request();
});
