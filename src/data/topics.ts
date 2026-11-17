// Lista de temas del curso.
// OJO: es un temario PROVISIONAL. Cuando lleguen las guías del SENA,
// se reemplaza este archivo y toda la app se actualiza sola.

export type ActivityType = "lesson" | "quiz" | "lab" | "deliverable";

export const activityLabels: Record<ActivityType, string> = {
  lesson: "Lección",
  quiz: "Quiz",
  lab: "Laboratorio",
  deliverable: "Entregable",
};

export type Topic = {
  id: string;
  title: string;
  summary: string;
  emoji: string;
  activities: ActivityType[];
};

export const topics: Topic[] = [
  {
    id: "intro",
    title: "¿Qué es la nube?",
    summary: "De dónde viene, para qué sirve y por qué todo el mundo habla de ella.",
    emoji: "☁️",
    activities: ["lesson", "quiz"],
  },
  {
    id: "modelos-servicio",
    title: "IaaS, PaaS y SaaS",
    summary: "Los tres sabores de servicio y cuándo usar cada uno.",
    emoji: "🍰",
    activities: ["lesson", "quiz"],
  },
  {
    id: "modelos-despliegue",
    title: "Nube pública, privada e híbrida",
    summary: "Quién es dueño de la infraestructura y qué implica.",
    emoji: "🏢",
    activities: ["lesson", "quiz"],
  },
  {
    id: "virtualizacion",
    title: "Virtualización",
    summary: "Cómo un servidor se convierte en muchos servidores.",
    emoji: "🧩",
    activities: ["lesson", "lab"],
  },
  {
    id: "mi-servidor",
    title: "Mi propio servidor",
    summary: "Preparamos el servidor propio: Linux, SSH y primeros comandos.",
    emoji: "🖥️",
    activities: ["lesson", "lab", "deliverable"],
  },
  {
    id: "redes-seguridad",
    title: "Redes y seguridad",
    summary: "IPs, puertos, firewall y buenas prácticas para no dejar la puerta abierta.",
    emoji: "🔐",
    activities: ["lesson", "lab", "quiz"],
  },
  {
    id: "almacenamiento",
    title: "Almacenamiento",
    summary: "Archivos, bloques, objetos y copias de seguridad.",
    emoji: "🗄️",
    activities: ["lesson", "lab"],
  },
  {
    id: "contenedores",
    title: "Contenedores con Docker",
    summary: "Empaquetar una app y correrla igual en cualquier lado.",
    emoji: "📦",
    activities: ["lesson", "lab", "quiz"],
  },
  {
    id: "automatizacion",
    title: "Automatización y serverless",
    summary: "Que las máquinas hagan el trabajo repetitivo por ti.",
    emoji: "⚡",
    activities: ["lesson", "lab"],
  },
  {
    id: "monitoreo-costos",
    title: "Monitoreo y costos",
    summary: "Saber qué está pasando y cuánto cuesta.",
    emoji: "📈",
    activities: ["lesson", "quiz"],
  },
  {
    id: "proyecto-final",
    title: "Proyecto final",
    summary: "Juntamos todo: desplegamos una app completa en nuestro servidor.",
    emoji: "🚀",
    activities: ["lab", "deliverable"],
  },
];
