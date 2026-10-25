import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// tell the inline fallback in Layout.astro that motion took over; if it already gave up
// (slow network), `js-motion` is gone and we stay static instead of re-hiding visible content
document.documentElement.dataset.motion = "on";
const reduced =
  matchMedia("(prefers-reduced-motion: reduce)").matches ||
  !document.documentElement.classList.contains("js-motion");
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- static fallbacks (reduced motion) ---------- */
if (reduced) {
  $$("[data-count-to]").forEach((el) => (el.textContent = el.dataset.countTo ?? ""));
}

/* ---------- smooth scroll ---------- */
let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const scrollToY = (y: number) =>
  lenis ? lenis.scrollTo(y, { duration: 1.4 }) : window.scrollTo({ top: y, behavior: "smooth" });

$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href")!;
    const target = id === "#home" ? null : $(id);
    if (id !== "#home" && !target) return;
    e.preventDefault();
    scrollToY(target ? target.getBoundingClientRect().top + scrollY - 20 : 0);
    // skip link: move keyboard focus too, not just the scroll position
    if (id === "#main" && target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });
});

/* ---------- nav + progress + scroll-spy ---------- */
const nav = $("#nav");
const progress = $("#progress");
const onScroll = () => {
  nav?.classList.toggle("is-stuck", scrollY > 24);
  if (progress) {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? clamp(scrollY / max) : 0})`;
  }
};
onScroll();
addEventListener("scroll", onScroll, { passive: true });

const spyLinks = $$<HTMLAnchorElement>("[data-spy]");
spyLinks.forEach((link) => {
  const section = $(link.dataset.spy!);
  if (!section) return;
  ScrollTrigger.create({
    trigger: section,
    start: "top 55%",
    end: "bottom 55%",
    onToggle: (self) => {
      if (self.isActive) spyLinks.forEach((l) => l.setAttribute("data-active", String(l === link)));
    },
  });
});

/* ---------- hero intro ---------- */
if (!reduced) {
  gsap.set("[data-hero-in]", { opacity: 0, y: 26 });
  gsap.set(nav, { y: -30, opacity: 0 });

  const intro = gsap.timeline({
    defaults: { ease: "expo.out" },
    // release the compositor layers the CSS hints created
    onComplete: () => gsap.set(".split-line > span", { willChange: "auto" }),
  });
  intro
    .to(nav, { y: 0, opacity: 1, duration: 1.2 }, 0)
    .to(".split-line > span", { y: 0, duration: 1.5, stagger: 0.13 }, 0.15)
    .to("[data-hero-in]", { opacity: 1, y: 0, duration: 1.3, stagger: 0.1 }, 0.55);

  // count up hero stats
  $$("[data-count-to]").forEach((el) => {
    const target = Number(el.dataset.countTo);
    const o = { v: 0 };
    el.textContent = "0";
    gsap.to(o, {
      v: target,
      duration: 2,
      delay: 1.2,
      ease: "expo.out",
      onUpdate: () => (el.textContent = String(Math.round(o.v))),
    });
  });

  // floating chips parallax
  $$("[data-parallax]").forEach((el) => {
    gsap.to(el, {
      y: Number(el.dataset.parallax),
      ease: "none",
      scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
    });
  });
}

/* ---------- pointer-driven effects ---------- */
if (finePointer && !reduced) {
  // ambient cursor glow
  const glow = $("#cursor-glow");
  if (glow) {
    const gx = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3" });
    const gy = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3" });
    addEventListener(
      "pointermove",
      (e) => {
        gx(e.clientX - glow.offsetWidth / 2);
        gy(e.clientY - glow.offsetHeight / 2);
        glow.style.opacity = "1";
      },
      { passive: true },
    );
  }

  // profile card 3D tilt
  $$("[data-tilt]").forEach((el) => {
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3" });
    gsap.set(el, { transformPerspective: 900 });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 14);
      rx((0.5 - (e.clientY - r.top) / r.height) * 14);
    });
    el.addEventListener("pointerleave", () => {
      rx(0);
      ry(0);
    });
  });

  // magnetic buttons
  $$("[data-magnetic]").forEach((el) => {
    const x = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.6)" });
    const y = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.6)" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.28);
      y((e.clientY - (r.top + r.height / 2)) * 0.4);
    });
    el.addEventListener("pointerleave", () => {
      x(0);
      y(0);
    });
  });
}

// spotlight border/glow follows the cursor (no motion cost when reduced)
if (finePointer) {
  $$(".spot").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- scroll reveals ---------- */
if (!reduced) {
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 89%",
    once: true,
    onEnter: (els) =>
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.09,
        overwrite: true,
        onComplete: () => gsap.set(els, { willChange: "auto" }),
      }),
  });

  // word-by-word text illumination
  $$("[data-words]").forEach((p) => {
    const words = $$(".w", p);
    gsap.to(words, {
      opacity: 1,
      ease: "none",
      stagger: 0.5,
      scrollTrigger: { trigger: p, start: "top 82%", end: "bottom 48%", scrub: 0.5 },
    });
  });

  // project images: subtle parallax inside their frame
  $$("[data-img]").forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  // stacking cards: the ones underneath recede as the next one covers them.
  // Same query as the `stack:` variant in global.css — below it cards flow normally.
  const stack = $$("[data-stack]");
  gsap.matchMedia().add("(min-width: 64rem) and (min-height: 45rem)", () => {
    stack.forEach((card, i) => {
      const next = stack[i + 1];
      if (!next) return;
      // dim instead of fading: opacity would let the card underneath show through
      gsap.fromTo(
        card,
        { scale: 1, filter: "brightness(1)" },
        {
          scale: 0.94,
          filter: "brightness(0.55)",
          ease: "none",
          transformOrigin: "50% 0%",
          scrollTrigger: { trigger: next, start: "top 85%", end: "top 25%", scrub: true },
        },
      );
    });
  });
}

/* ---------- cta ---------- */
(function cta() {
  const root = $("[data-cta]");
  if (!root || reduced) return;
  gsap.from(root, {
    scale: 0.94,
    y: 60,
    opacity: 0,
    duration: 1.4,
    ease: "expo.out",
    scrollTrigger: { trigger: root, start: "top 85%", once: true },
  });
})();

/* ---------- pause ambient CSS loops off-screen ---------- */
const offscreen = new IntersectionObserver((entries) =>
  entries.forEach((e) => e.target.toggleAttribute("data-offscreen", !e.isIntersecting)),
);
$$("[data-pause-offscreen]").forEach((el) => offscreen.observe(el));

addEventListener("load", () => ScrollTrigger.refresh());
// web fonts can swap after load and shift trigger positions
document.fonts.ready.then(() => ScrollTrigger.refresh());
