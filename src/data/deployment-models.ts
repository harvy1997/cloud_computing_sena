// Contenido de la actividad 1: infografía sobre modelos de despliegue de la nube.
// Fuente principal: material CF1 del SENA, "Características de la computación en la nube"
// (capítulo 3: modelos de despliegue; capítulo 4: infraestructura de la nube).
// Apoyo: NIST SP 800-145 (definiciones) y material CF2 del SENA (proveedores).

export type ModelId = "public" | "private" | "hybrid";

export type Point = { title: string; detail: string };

export type DeploymentModel = {
  id: ModelId;
  name: string;
  tag: string;
  color: string;
  definition: string;
  analogy: string;
  verdict: string;
  /** Resumen de la infraestructura que exige */
  infra: string;
  characteristics: Point[];
  pros: Point[];
  cons: Point[];
  idealFor: string[];
  examples: string[];
  /** Ejemplo práctico (del material CF1) */
  example: string;
};

export const models: DeploymentModel[] = [
  {
    id: "public",
    name: "Nube pública",
    tag: "Compartida",
    color: "#38bdf8",
    definition:
      "Es infraestructura que le pertenece a un proveedor y que este ofrece por Internet a muchos clientes al mismo tiempo. Los recursos se comparten físicamente, pero cada cliente queda aislado de los demás de forma lógica.",
    analogy:
      "Es como el transporte público: la flota es de todos, se paga por viaje y uno no se ocupa del mantenimiento.",
    verdict:
      "Se busca rapidez, poco costo inicial y poder crecer sin comprar equipos.",
    infra:
      "Casi nada propio: solo una conexión estable a Internet. El hardware, el centro de datos y la virtualización los pone el proveedor.",
    characteristics: [
      { title: "Es del proveedor", detail: "El proveedor construye, es dueño y opera los centros de datos." },
      { title: "Multi-inquilino", detail: "Varios clientes comparten el mismo hardware, con aislamiento lógico." },
      { title: "Se accede por Internet", detail: "Cualquier persona con conexión puede usarla, desde una consola web, la línea de comandos o APIs." },
      { title: "Pago por uso", detail: "No se compra hardware: se paga según lo que se consume." },
      { title: "Elástica", detail: "Los recursos suben o bajan en minutos según la demanda." },
    ],
    pros: [
      { title: "Reducción de costos iniciales", detail: "Se paga solo por lo que se utiliza (de CAPEX a OPEX)." },
      { title: "Escalabilidad", detail: "Se aumentan o disminuyen recursos según la demanda." },
      { title: "Accesible desde cualquier dispositivo", detail: "Favorece la colaboración y el trabajo remoto." },
      { title: "Mantenimiento a cargo del proveedor", detail: "El proveedor actualiza los sistemas de forma automática." },
    ],
    cons: [
      { title: "Preocupaciones de seguridad", detail: "Los datos se almacenan en entornos compartidos." },
      { title: "Menor control sobre la infraestructura", detail: "Es un reto cuando se necesitan configuraciones específicas." },
      { title: "Dependencia del proveedor", detail: "Irse a otro proveedor puede salir caro (vendor lock-in)." },
      { title: "Costos variables", detail: "Si no se monitorea el consumo, la factura se puede disparar sin aviso." },
    ],
    idealFor: [
      "Almacenamiento y respaldo",
      "Aulas virtuales y aprendizaje colaborativo",
      "Desarrollo y ejecución de aplicaciones",
      "Big data e inteligencia artificial",
      "Alojamiento de sitios web",
    ],
    examples: ["Amazon Web Services", "Microsoft Azure", "Google Cloud", "IBM Cloud", "Oracle Cloud (OCI)"],
    example:
      "Una empresa de comercio electrónico con muchas transacciones diarias aloja su página web y su base de datos de clientes en AWS. Así evita comprar servidores propios y puede escalar en temporadas de alta demanda, como promociones o fechas especiales de ventas.",
  },
  {
    id: "private",
    name: "Nube privada",
    tag: "Dedicada",
    color: "#a78bfa",
    definition:
      "Es infraestructura dedicada a una sola organización. Puede estar en sus propios centros de datos o alojada por un proveedor externo, pero nadie más comparte esos recursos.",
    analogy:
      "Es como tener casa propia: es solo suya y se arregla a su gusto, pero comprarla y mantenerla corre por cuenta del dueño.",
    verdict:
      "Se prioriza tener el control, el aislamiento y cumplir la normativa, aunque se pierda flexibilidad en costos.",
    infra:
      "Todo propio: hardware, centro de datos con energía y refrigeración, red, virtualización y respaldo, más el personal que lo administre.",
    characteristics: [
      { title: "Exclusividad de los recursos", detail: "Los servidores, el almacenamiento y las aplicaciones son para una sola organización." },
      { title: "Dos formas de desplegarla", detail: "En centros de datos propios, o con un proveedor externo que dedica recursos exclusivos." },
      { title: "Mayor control", detail: "Se decide sobre el entorno tecnológico, la red, el acceso y los datos." },
      { title: "Personalizable", detail: "Se pueden ajustar configuraciones y políticas de seguridad." },
      { title: "Cumplimiento más riguroso", detail: "Facilita cumplir normativas legales y sectoriales." },
    ],
    pros: [
      { title: "Alto nivel de seguridad y control", detail: "La organización define configuraciones, políticas de acceso y medidas de protección." },
      { title: "Personalización", detail: "La infraestructura se diseña a la medida de la organización." },
      { title: "Cumplimiento normativo más directo", detail: "Es esencial en sectores con información altamente sensible o regulada." },
      { title: "Rendimiento predecible", detail: "Con recursos dedicados no se compite con otros clientes." },
    ],
    cons: [
      { title: "Altas inversiones", detail: "Hardware, mantenimiento y personal especializado representan un costo considerable." },
      { title: "Escalabilidad restringida", detail: "Depende de los recursos físicos disponibles; no crece bajo demanda." },
      { title: "Necesita equipo especializado", detail: "Hay que administrar sistemas, redes y seguridad por cuenta propia." },
      { title: "Mantenimiento propio", detail: "Las actualizaciones, las fallas y los respaldos los resuelve la organización." },
    ],
    idealFor: ["Datos sensibles", "Sistemas críticos", "Aplicaciones muy personalizadas", "Cumplimiento normativo estricto"],
    examples: ["VMware vSphere", "OpenStack", "Proxmox", "Servidor propio del curso (a pequeña escala)"],
    example:
      "Una entidad de salud gestiona los historiales clínicos electrónicos de sus pacientes en una nube privada. La información queda en un entorno exclusivo, con protocolos de seguridad personalizados y cumpliendo las regulaciones de protección de datos del sector; así controla quién accede a los registros y reduce el riesgo de filtraciones.",
  },
  {
    id: "hybrid",
    name: "Nube híbrida",
    tag: "Combinada",
    color: "#34d399",
    definition:
      "Mezcla una nube privada con una pública, conectadas entre sí: los datos y aplicaciones críticas se mantienen en un espacio seguro y exclusivo, y los recursos de la pública se usan para cargas menos sensibles o variables.",
    analogy:
      "Es como tener casa propia y alquilar un salón extra cuando llegan muchos invitados.",
    verdict:
      "Se necesita lo mejor de los dos lados: datos protegidos en lo privado y elasticidad en lo público cuando sube la demanda.",
    infra:
      "Lo esencial propio, más recursos en la nube pública, unidos por un enlace seguro y redundante, con un equipo que domine ambos entornos.",
    characteristics: [
      { title: "Dos entornos combinados", detail: "Una nube privada y una pública, trabajando juntas." },
      { title: "Segmentación de datos", detail: "Los datos sensibles en la privada y la información menos crítica en la pública." },
      { title: "Inversión propia limitada a lo esencial", detail: "Los aumentos de demanda se gestionan con servicios públicos de pago por uso." },
      { title: "Entornos conectados", detail: "VPN, enlaces dedicados y APIs permiten mover cargas de un lado a otro." },
      { title: "Cloud bursting", detail: "Cuando la capacidad propia no alcanza, se desborda hacia la nube pública." },
    ],
    pros: [
      { title: "Optimización de costos", detail: "Combina inversión propia con servicios bajo demanda." },
      { title: "Escalabilidad flexible", detail: "Se ajusta a las necesidades en tiempo real." },
      { title: "Segmentación de datos", detail: "Diferencia entre información crítica y no crítica, y permite cumplir normativas sin perder flexibilidad." },
      { title: "Continuidad del negocio", detail: "Mayor capacidad de recuperación y redundancia en caso de fallos." },
      { title: "Adaptación estratégica", detail: "Permite mover cargas de trabajo entre entornos según los objetivos." },
    ],
    cons: [
      { title: "Gestión cuidadosa y personal capacitado", detail: "Integrar y operar dos entornos exige más diseño y más habilidades." },
      { title: "Vulnerabilidades en la integración", detail: "Si no se maneja con las herramientas adecuadas, la unión de los entornos puede generar fallos de seguridad." },
      { title: "Problemas de interoperabilidad", detail: "Los dos entornos deben poder trabajar bien entre sí." },
      { title: "Costos de conectividad", detail: "Los enlaces dedicados y la transferencia de datos suman a la factura." },
    ],
    idealFor: [
      "Equilibrar seguridad, costos y escalabilidad",
      "Separar información crítica de la no crítica",
      "Picos de demanda",
      "Migración a la nube por etapas",
    ],
    examples: ["Azure Arc / Azure Stack", "AWS Outposts", "Google Distributed Cloud", "Oracle (híbrida y multicloud)"],
    example:
      "El SENA podría alojar sus plataformas de formación virtual en una nube híbrida: los datos sensibles de gestión académica, matrículas y evaluaciones se mantendrían en una nube privada, con control y seguridad, y los contenidos de aprendizaje (videos, foros, actividades interactivas) irían en una nube pública, con acceso masivo, flexible y menor costo de almacenamiento.",
  },
];

// Valoración de 1 a 5 (más es mejor para el usuario)
export type Criterion = {
  id: string;
  label: string;
  hint: string;
  scores: Record<ModelId, number>;
};

export const criteria: Criterion[] = [
  { id: "cost", label: "Costo inicial bajo", hint: "Qué tan poca inversión inicial pide", scores: { public: 5, private: 1, hybrid: 3 } },
  { id: "control", label: "Control", hint: "Cuánto se puede decidir sobre la infraestructura", scores: { public: 2, private: 5, hybrid: 4 } },
  { id: "scale", label: "Escalabilidad", hint: "Qué tan rápido se crece o se reduce", scores: { public: 5, private: 2, hybrid: 4 } },
  { id: "privacy", label: "Aislamiento y privacidad", hint: "Qué tan separados quedan los datos de terceros", scores: { public: 3, private: 5, hybrid: 4 } },
  { id: "ease", label: "Facilidad de gestión", hint: "Cuánto trabajo operativo exige", scores: { public: 5, private: 2, hybrid: 2 } },
];

export const tableRows: { label: string; values: Record<ModelId, string> }[] = [
  {
    label: "Propiedad",
    values: {
      public: "Proveedor de nube",
      private: "La organización o un tercero dedicado",
      hybrid: "Mixta: propia y del proveedor",
    },
  },
  {
    label: "Inquilinos",
    values: {
      public: "Varios (multi-tenant)",
      private: "Uno solo (single-tenant)",
      hybrid: "Uno en la privada, varios en la pública",
    },
  },
  {
    label: "Acceso",
    values: {
      public: "Internet",
      private: "Intranet o VPN",
      hybrid: "VPN o enlace dedicado entre ambos",
    },
  },
  {
    label: "Modelo de costos",
    values: {
      public: "Pago por uso (OPEX)",
      private: "Inversión inicial alta (CAPEX) + operación",
      hybrid: "Inversión base + pago por picos",
    },
  },
  {
    label: "Control",
    values: {
      public: "Limitado al servicio contratado",
      private: "Total",
      hybrid: "Alto en lo privado, limitado en lo público",
    },
  },
  {
    label: "Escalabilidad",
    values: {
      public: "Casi ilimitada, en minutos",
      private: "Limitada por el hardware propio",
      hybrid: "Elástica gracias a la pública",
    },
  },
  {
    label: "Infraestructura propia",
    values: {
      public: "Ninguna",
      private: "Toda",
      hybrid: "Solo la parte privada",
    },
  },
  {
    label: "Seguridad",
    values: {
      public: "Responsabilidad compartida: el proveedor protege la infraestructura y el cliente sus datos y accesos",
      private: "Toda la responsabilidad es de la organización",
      hybrid: "Responsabilidad dividida; las políticas deben ser coherentes en ambos entornos",
    },
  },
  {
    label: "Cumplimiento normativo",
    values: {
      public: "Hay que validar regiones y certificaciones del proveedor",
      private: "Más fácil de demostrar y auditar",
      hybrid: "Los datos regulados se quedan en la privada",
    },
  },
  {
    label: "Ideal para",
    values: {
      public: "Almacenamiento, aplicaciones web, desarrollo, big data e IA",
      private: "Datos sensibles y sistemas críticos",
      hybrid: "Equilibrar seguridad, costos y escalabilidad",
    },
  },
];

export type Question = {
  id: string;
  text: string;
  weights: Partial<Record<ModelId, number>>;
};

export const questions: Question[] = [
  { id: "sensitive", text: "Manejan datos muy sensibles o regulados", weights: { private: 2, hybrid: 1 } },
  { id: "spikes", text: "La demanda sube y baja mucho (picos o temporadas)", weights: { public: 2, hybrid: 1 } },
  { id: "budget", text: "No hay presupuesto para comprar equipos", weights: { public: 2 } },
  { id: "team", text: "Tienen un equipo técnico que puede administrar la infraestructura", weights: { private: 1, hybrid: 1 } },
  { id: "legacy", text: "Tienen sistemas propios que todavía no pueden migrar", weights: { hybrid: 2, private: 1 } },
  { id: "growth", text: "Guardan muchos datos y el volumen crece rápido", weights: { public: 2, hybrid: 1 } },
];

// ───────── Infraestructura de la nube (CF1, capítulo 4) ─────────

// 4.1 Requisitos técnicos básicos: quién los cubre en cada modelo
export type RequirementArea = {
  id: "internet" | "datacenter" | "hardware" | "network" | "virtualization" | "backup";
  label: string;
  /** Qué es el requisito */
  what: string;
  byModel: Record<ModelId, string>;
};

export const requirementAreas: RequirementArea[] = [
  {
    id: "internet",
    label: "Internet rápido y redundante",
    what: "La nube depende de la conectividad: se requiere banda ancha con enlaces de respaldo para evitar caídas y garantizar continuidad.",
    byModel: {
      public: "El proveedor ya cuenta con redes redundantes; el cliente necesita una conexión a Internet estable y con buen ancho de banda.",
      private: "La organización debe contratar y mantener su propia conexión de banda ancha, con enlaces de respaldo.",
      hybrid: "Hace falta Internet para la parte pública y un enlace seguro y redundante (VPN o enlace dedicado) entre los dos entornos.",
    },
  },
  {
    id: "datacenter",
    label: "Centro de datos",
    what: "Energía ininterrumpida y refrigeración avanzada aseguran la operación constante de servidores y equipos de red, evitando fallas por cortes eléctricos o sobrecalentamiento.",
    byModel: {
      public: "Lo pone el proveedor: el cliente no necesita espacio, energía ni refrigeración propios.",
      private: "Se necesita un centro de datos o sala técnica propia (o dedicada por un tercero), con UPS, refrigeración y control de acceso físico.",
      hybrid: "Solo se requiere para la parte privada; la parte pública usa los centros de datos del proveedor.",
    },
  },
  {
    id: "hardware",
    label: "Hardware especializado",
    what: "Servidores de alto rendimiento, unidades de almacenamiento masivo y procesadores optimizados para atender muchas solicitudes a la vez.",
    byModel: {
      public: "Lo aporta el proveedor y se contrata por uso, sin comprar equipos.",
      private: "La organización compra, instala y mantiene el hardware, lo que implica una inversión alta.",
      hybrid: "Hardware propio solo para lo esencial; la capacidad extra se contrata a la nube pública.",
    },
  },
  {
    id: "network",
    label: "Redes robustas",
    what: "Routers, switches y balanceadores de carga distribuyen el tráfico entre servidores, mejoran la eficiencia y reducen los tiempos de respuesta.",
    byModel: {
      public: "La red física es del proveedor; el cliente configura redes virtuales, balanceo y reglas de acceso.",
      private: "Toda la red (equipos físicos, segmentación y balanceo de carga) es responsabilidad de la organización.",
      hybrid: "Se necesita una red que una ambos entornos y que se gestione de forma centralizada, por ejemplo con redes definidas por software (SDN).",
    },
  },
  {
    id: "virtualization",
    label: "Virtualización",
    what: "Hipervisores y contenedores crean entornos virtuales que aprovechan mejor el hardware y permiten escalar según la demanda.",
    byModel: {
      public: "Ya viene incluida: el cliente crea máquinas virtuales o contenedores sobre la plataforma del proveedor.",
      private: "Hay que implementar la capa de virtualización propia, con hipervisores como VMware, OpenStack o Proxmox.",
      hybrid: "Una plataforma común de virtualización y orquestación facilita mover cargas entre la nube privada y la pública.",
    },
  },
  {
    id: "backup",
    label: "Respaldo y seguridad",
    what: "Copias de seguridad automáticas, cifrado de datos y firewalls especializados protegen la información y mantienen la integridad de los servicios.",
    byModel: {
      public: "Responsabilidad compartida: el proveedor protege la infraestructura y el cliente configura accesos, cifrado y respaldos.",
      private: "Todo corre por cuenta de la organización: copias, cifrado, firewalls, control de acceso y auditoría.",
      hybrid: "Políticas e identidades unificadas en los dos entornos, cifrado en tránsito y en reposo, y respaldo cruzado entre ambos.",
    },
  },
];

// 4.2 Componentes de la infraestructura
export const infraComponents: { id: string; title: string; detail: string }[] = [
  {
    id: "servers",
    title: "Servidores físicos y virtuales",
    detail: "Base del procesamiento de datos y de la ejecución de aplicaciones; los entornos virtuales atienden muchas solicitudes a la vez.",
  },
  {
    id: "networks",
    title: "Redes",
    detail: "Routers, switches y redes definidas por software (SDN) que dan conexiones seguras, rápidas y gestionables de forma centralizada.",
  },
  {
    id: "storage",
    title: "Sistemas de almacenamiento",
    detail: "Almacenamiento en bloques, en archivos o en objetos, según lo que necesite cada organización o aplicación.",
  },
  {
    id: "management",
    title: "Gestión y automatización",
    detail: "Herramientas para monitorear, administrar y desplegar recursos, reduciendo tiempos y errores en la operación.",
  },
  {
    id: "facility",
    title: "Infraestructura del centro de datos",
    detail: "Seguridad física, control de acceso, extinción de incendios, refrigeración avanzada y energía redundante.",
  },
];

// 4.3 Consideraciones de seguridad
export const securityPractices: string[] = [
  "Cifrado en tránsito y en reposo",
  "Firewalls virtuales y segmentación de redes",
  "Gestión de identidades y accesos (IAM) con MFA",
  "Privilegio mínimo",
  "Confianza cero (zero trust)",
  "Respuesta a incidentes y auditorías continuas",
  "Estándares como ISO 27001 o NIST",
];

// Nivel de infraestructura propia que pide cada modelo (1 = ninguna, 5 = toda)
export const ownInfrastructure: Record<ModelId, number> = { public: 1, private: 5, hybrid: 4 };

// ───────── Adaptabilidad según requerimientos de almacenamiento ─────────
export type StorageScenario = {
  id: string;
  label: string;
  need: string;
  fit: Record<ModelId, { score: number; why: string }>;
};

export const adaptabilityLevel = ["", "Muy baja", "Baja", "Media", "Alta", "Muy alta"];

export const storageScenarios: StorageScenario[] = [
  {
    id: "files",
    label: "Archivos de trabajo y colaboración",
    need: "Documentos y evidencias que se necesitan desde cualquier lugar y que varias personas editan al tiempo.",
    fit: {
      public: { score: 5, why: "Es su caso más natural: almacenamiento de archivos con sincronización y acceso desde cualquier parte (Google Drive, OneDrive)." },
      private: { score: 3, why: "Funciona, pero el acceso desde afuera depende de VPN y de infraestructura propia, y eso le quita comodidad." },
      hybrid: { score: 4, why: "Los archivos de uso diario pueden ir en la pública y el repositorio documental formal quedarse en la privada." },
    },
  },
  {
    id: "regulated",
    label: "Datos regulados o confidenciales",
    need: "Historias clínicas, datos financieros o personales que tienen que cumplir normativa de protección y auditoría.",
    fit: {
      public: { score: 3, why: "Se puede, con cifrado, la región adecuada y certificaciones (ISO/IEC 27001, SOC 2), pero hay que validar bien el cumplimiento." },
      private: { score: 5, why: "Permite controlar dónde están los datos, quién entra y qué hace, y eso facilita las auditorías." },
      hybrid: { score: 4, why: "Los datos regulados se quedan en lo privado y a la pública solo se manda información menos crítica." },
    },
  },
  {
    id: "growth",
    label: "Volumen que crece rápido",
    need: "Multimedia, registros (logs) o analítica de datos con un crecimiento difícil de predecir.",
    fit: {
      public: { score: 5, why: "La capacidad se amplía a demanda y se paga solo lo que se guarda, sin comprar discos." },
      private: { score: 2, why: "Crecer implica comprar, instalar y configurar más hardware, con tiempos y costos altos." },
      hybrid: { score: 4, why: "El excedente se desborda a la pública mientras lo esencial se mantiene en la infraestructura propia." },
    },
  },
  {
    id: "backup",
    label: "Respaldo y recuperación ante desastres",
    need: "Copias de seguridad y continuidad del servicio si falla el sitio principal.",
    fit: {
      public: { score: 4, why: "Ofrece replicación entre regiones y almacenamiento económico para copias, aunque se depende de un solo proveedor." },
      private: { score: 3, why: "Hace falta un segundo sitio propio para replicar, y eso duplica la inversión." },
      hybrid: { score: 5, why: "Se opera en local y se tiene una réplica en la nube pública, sin necesidad de montar un segundo centro de datos." },
    },
  },
  {
    id: "latency",
    label: "Baja latencia y alto rendimiento",
    need: "Bases de datos transaccionales que responden en milisegundos y se consultan todo el tiempo.",
    fit: {
      public: { score: 3, why: "Hay opciones de alto rendimiento, pero la latencia depende de la región y de la conexión a Internet." },
      private: { score: 5, why: "La red local y los recursos dedicados dan un rendimiento estable y predecible." },
      hybrid: { score: 4, why: "La base de datos se deja cerca de las aplicaciones y los servicios menos críticos se van a la pública." },
    },
  },
];
