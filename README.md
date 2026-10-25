# Portfolio · Gonzalo Guillermo Spinelli

Astro 5 + Tailwind 4 + GSAP + Lenis.

```sh
npm install
npm run dev
```

## Dónde editar

- `src/data/portfolio.ts`: datos personales (`site`) y proyectos.
- Cada proyecto tiene un `variant` que elige su showcase animado en `src/components/showcases/`:
  `model3d`, `qr`, `clinic`, `shop`, `dashboard`.
- Para el modelo 3D: copiar el `.glb` a `public/models/` y completar `model` en el proyecto.
