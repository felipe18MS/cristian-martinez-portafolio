# Cristian Martínez — Portfolio

Portafolio 3D interactivo construido con **React + TypeScript + Three.js**, con Vite como bundler.

## Concepto

La escena 3D no es decorativa: representa literalmente una arquitectura por capas
(Interfaz → Lógica → Datos → Fundación). Al hacer scroll, la cámara desciende a través
de las capas, y cada nodo flotante usa una forma "tech" distinta según la capa:

- **Interfaz** → símbolos de código `</>`
- **Lógica** → nodos de red/API (anillo + hub)
- **Datos** → íconos de base de datos (cilindros apilados)
- **Fundación** → racks de servidor

Cada capa además tiene trazas de circuito estilo PCB y un barrido holográfico que
recorre lentamente todo el stack.

## Cómo correrlo

Necesitas [Node.js](https://nodejs.org) 18 o superior instalado.

```bash
npm install
npm run dev
```

Abre la URL que muestra la terminal (normalmente `http://localhost:5173`).

Para generar la build de producción:

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
  assets/          Foto de perfil y CV (PDF) — reemplázalos por los tuyos con el mismo nombre
  data/            content.ts — todo el texto y datos del sitio, en un solo lugar
  hooks/           Hooks reutilizables (scroll, sección activa, reduced motion)
  three/           Lógica de Three.js: escena, cámara, luces (scene.ts) y formas 3D (shapes.ts)
  components/      Un componente + su .css por sección de la página
  App.tsx          Ensambla todos los componentes
  main.tsx         Punto de entrada de React
  index.css        Estilos globales compartidos
  styles/tokens.css  Paleta de colores y tipografías (variables CSS)
```

## Editar el contenido

Casi todo el texto del sitio vive en **`src/data/content.ts`** — nombre, biografía,
experiencia, skills, educación y datos de contacto. No necesitas tocar los componentes
para actualizar el contenido.

Para cambiar la foto o el CV, reemplaza los archivos en `src/assets/` manteniendo el
mismo nombre (`profile.jpg`, `cv.pdf`), o actualiza el import correspondiente en
`Hero.tsx` / `Navbar.tsx` / `Contact.tsx` / `MobileMenu.tsx`.

## Paleta

| Variable | Uso |
|---|---|
| `--cyan` `#4ed9c8` | Capa de interfaz / acciones primarias |
| `--violet` `#9c86f5` | Capa de lógica / backend |
| `--amber` `#e8a23d` | Capa de datos / fundación |
| `--bg` `#0b121d` | Fondo |

## Próximos pasos sugeridos

- Agregar enlaces reales de GitHub / LinkedIn en `content.ts` y en el `Contact.tsx`.
- Desplegar en Vercel o Netlify (`npm run build` genera la carpeta `dist/`).
- Si quieres una versión en Vue 3 / Nuxt para comparar y aprender, pídemela.
