# dedoer.com

The Doer marketing site. Vite + React, multi-page, deployed to GitHub Pages.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
```

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.

One time setup: **Settings > Pages > Build and deployment > Source = GitHub Actions**. Until that is switched, Pages keeps serving the repository files as they are, which no longer works for this site.

## Where things live

| Path | What it is |
| --- | --- |
| `index.html`, `organizations.html`, `brands.html` | Page shells, one per URL |
| `src/pages/` | Page content (Home, Organizations, Brands) |
| `src/components/` | Layout (frame, nav, footer), app mockups, form, glass panel |
| `src/effects/ScrollWorld.jsx` | React Three Fiber scroll world in the homepage hero |
| `src/effects/Gradient.jsx` | ShaderGradient section backgrounds |
| `src/effects/LiquidLogo.jsx` | Paper Design liquid metal Doer mark (footer) |
| `src/effects/smoothScroll.js` | Lenis smooth scroll wired into GSAP ScrollTrigger |
| `src/styles/` | `site.css` (design system) and `premium.css` (effects layer) |
| `src/config.js` | Store links, emails, phone, Formspree endpoint, Spline scene URL |
| `public/` | Copied as is: privacy, delete account, join/open deep links, bank walkthroughs, `.well-known`, `CNAME`, images |

Heavy effects only load where they will run smoothly. Visitors with reduced motion turned on, no WebGL, or a very low power device get a still hero with the live phone mockup instead.

## Using a Spline scene in the hero

1. Build the scene in Spline (prompt below).
2. In Spline: **Export > Code Export > React**, copy the `https://prod.spline.design/.../scene.splinecode` URL.
3. Paste it into `SPLINE_SCENE` in `src/config.js`. The hero then shows your Spline scene instead of the built in 3D world. Clear it to switch back.

### Spline prompt

> Create an interactive 3D hero scene for Doer, a walking app that rewards people for steps. Mood: premium, cinematic, calm confidence, dark studio at night.
>
> Background: near black #0D0D0D with soft fog fading into the distance. A faint gold grid floor (#6B5526 lines, very low opacity) stretching to the horizon.
>
> Hero object: a winding path of rounded, pill shaped footprints (alternating left and right, like someone walking) curving from the foreground into the distance. Footprints are matte cream #F0EBE1 when idle. A wave of light travels along the path on a loop: each footprint lights up warm gold #D4A843 with a soft emissive glow as the wave passes, then settles to a dimmer gold, as if every step is being counted.
>
> Around the path: 10 to 15 floating gold coins (#D4A843, polished metal, thin bright rim #FFE3A0) at different heights, slowly spinning and bobbing. At the far end of the path, a large thin glowing gold ring standing upright like a finish line, with a second thinner lime #A6E22E ring behind it, rotating slowly.
>
> Atmosphere: tiny warm gold dust particles drifting upward. Soft bloom on the glowing parts only. Warm key light from the upper right, cool faint rim light from the left.
>
> Camera: slightly above head height looking down the path, placed so the left 45% of the frame is calm empty dark space (the headline text sits there). Path and coins sit in the right half and recede into the center.
>
> Interaction: on mouse move, the camera gently parallaxes (small, smooth, max 5 degrees). On hover over a coin, it spins faster and glows brighter. On scroll (use Spline's scroll event), move the camera forward along the path toward the finish ring.
>
> No text, no logos, no UI in the scene. Transparent background off. Keep total polygon count low and textures small so it loads fast on phones. Export for web.
