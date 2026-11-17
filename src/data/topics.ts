// Menú de actividades del curso.
// Se agregan aquí, una a una, a medida que se van definiendo.

export type ActivityType = "lesson" | "quiz" | "lab" | "deliverable" | "infographic";

export const activityLabels: Record<ActivityType, string> = {
  lesson: "Lección",
  quiz: "Quiz",
  lab: "Laboratorio",
  deliverable: "Entregable",
  infographic: "Infografía",
};

export type Topic = {
  id: string;
  title: string;
  summary: string;
  emoji: string;
  activities: ActivityType[];
  /** Ruta de la actividad */
  href: string;
  /** Texto del enlace en la tarjeta */
  cta: string;
};

export const topics: Topic[] = [
  {
    id: "modelos-despliegue",
    title: "Modelos de despliegue de la nube",
    summary: "Nube pública, privada e híbrida: características, ventajas, desventajas y cuándo usar cada una.",
    emoji: "🏢",
    activities: ["infographic"],
    href: "/actividades/modelos-despliegue",
    cta: "Abrir infografía interactiva",
  },
];
