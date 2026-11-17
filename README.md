<div align="center">

# ☁️ Cloud Computing · SENA

**Una app para aprender la nube haciendo: lecciones, quizzes, laboratorios y entregables en un solo lugar.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Animaciones-motion-ff0080)

</div>

---

## 🎯 ¿Qué es esto?

Un proyecto personal de estudio para el curso de **Cloud Computing del SENA**.

La idea es tener una sola aplicación donde estén todas las actividades del curso, en vez de guías sueltas en PDF. Cada tema tiene su teoría, sus preguntas de práctica y sus laboratorios, y todo se puede ir marcando y repasando.

Los laboratorios se practican, por ahora, en **un servidor propio**. Más adelante se puede ampliar a AWS, Azure o Google Cloud.

## ✨ Qué tiene hoy

- 🏠 **Pantalla introductoria** con la lista de todos los temas del curso.
- 🎞️ **Animaciones**: portada con nubes flotantes, título que aparece con desenfoque, tarjetas que entran en cascada al hacer scroll, efectos al pasar el mouse y barra de progreso de lectura.
- ♿ **Respeta "movimiento reducido"**: si tu sistema lo pide, las animaciones se calman.
- 🧱 **Temas como datos**: la lista vive en un solo archivo, así que cambiar el temario no toca el diseño.

## 🗺️ Hoja de ruta

| Estado | Actividad |
| :---: | --- |
| ✅ | Pantalla introductoria con lista de temas |
| ⬜ | Página de cada tema |
| ⬜ | Lecciones teóricas |
| ⬜ | Quizzes con puntaje y retroalimentación |
| ⬜ | Laboratorios con checklist de pasos |
| ⬜ | Entregables y proyecto final |
| ⬜ | Guardar el progreso |
| ⬜ | Contenido real a partir de las guías del SENA |

> ⚠️ El temario actual es **provisional**. Se reemplazará con el contenido de las guías oficiales del SENA.

## 🚀 Cómo correrlo

Necesitas [Node.js](https://nodejs.org) 20 o superior.

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y listo.

Otros comandos:

```bash
npm run build   # compilar para producción
npm run start   # correr la versión compilada
npm run lint    # revisar el código
```

## 📚 Cómo agregar o cambiar un tema

Todo el temario está en [`src/data/topics.ts`](src/data/topics.ts). Agrega un objeto a la lista y aparece solo en la pantalla:

```ts
{
  id: "docker-compose",
  title: "Docker Compose",
  summary: "Levantar varios contenedores con un solo archivo.",
  emoji: "🐳",
  activities: ["lesson", "lab", "quiz"],
}
```

Tipos de actividad disponibles: `lesson` (lección), `quiz`, `lab` (laboratorio) y `deliverable` (entregable).

## 🗂️ Estructura

```
src/
├── app/
│   ├── layout.tsx        # Layout general, fuentes y metadatos
│   ├── page.tsx          # Página de inicio
│   └── globals.css       # Colores, tema y animaciones CSS
├── components/
│   └── Intro.tsx         # Pantalla introductoria animada
└── data/
    └── topics.ts         # Lista de temas del curso
```

## 🛠️ Tecnologías

- [Next.js](https://nextjs.org) (App Router)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [motion](https://motion.dev) para las animaciones

---

<div align="center">

Hecho para aprender. ☁️ 🖥️ 🚀

</div>
