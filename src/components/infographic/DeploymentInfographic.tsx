"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { models, ownInfrastructure, type ModelId, type Point } from "@/data/deployment-models";
import Comparison from "./Comparison";
import { ArrowLeftIcon, BulbIcon, CheckIcon, XIcon, modelIcons } from "./Icons";
import ModelDiagram from "./ModelDiagram";
import Recommender from "./Recommender";
import Requirements from "./Requirements";
import SectionTitle from "./SectionTitle";
import StorageAdaptability from "./StorageAdaptability";

const order: ModelId[] = models.map((m) => m.id);

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const row = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function PointList({
  points,
  color,
  kind,
}: {
  points: Point[];
  color: string;
  kind: "pro" | "con";
}) {
  const Icon = kind === "pro" ? CheckIcon : XIcon;
  const tone = kind === "pro" ? "#34d399" : "#fb7185";
  return (
    <motion.ul variants={list} initial="hidden" animate="show" className="space-y-3">
      {points.map((p) => (
        <motion.li
          key={p.title}
          variants={row}
          whileHover={{ x: 4 }}
          className="flex gap-3 rounded-xl border border-border bg-background/40 p-4"
          style={{ borderLeft: `3px solid ${kind === "pro" ? color : tone}` }}
        >
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            style={{ background: `color-mix(in srgb, ${tone} 18%, transparent)`, color: tone }}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <div>
            <p className="font-semibold leading-snug">{p.title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted">{p.detail}</p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default function DeploymentInfographic() {
  const [active, setActive] = useState<ModelId>("public");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const model = models.find((m) => m.id === active) ?? models[0];
  const Icon = modelIcons[model.id];

  function onTabKey(e: KeyboardEvent, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + order.length) % order.length;
    setActive(order[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-accent to-accent-2"
        style={{ scaleX: progress }}
      />

      {/* ───────── PORTADA ───────── */}
      <header className="relative overflow-hidden px-6 pb-20 pt-10">
        <div className="glow pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent-2/30 blur-[120px]" />
        <div className="glow pointer-events-none absolute -right-20 top-40 h-[320px] w-[320px] rounded-full bg-accent/20 blur-[110px]" />

        <div className="relative mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeftIcon className="h-4 w-4" /> Volver al inicio
          </Link>

          <div className="mt-12 text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-5 inline-block rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-sm text-accent backdrop-blur"
            >
              Actividad 1 · Infografía interactiva
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl"
            >
              Modelos de{" "}
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                despliegue
              </span>{" "}
              de la nube
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted"
            >
              Un modelo de despliegue responde dos preguntas: ¿de quién es la infraestructura? y ¿quién
              puede usarla? Según eso, la nube puede ser{" "}
              <strong className="text-foreground">pública</strong>,{" "}
              <strong className="text-foreground">privada</strong> o{" "}
              <strong className="text-foreground">híbrida</strong>. Acá explico cada una: cómo funciona,
              sus ventajas y desventajas, qué infraestructura necesita, qué tan bien se adapta según lo
              que se guarda, y al final una comparación.
            </motion.p>
          </div>

          {/* Espectro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mx-auto mt-16 max-w-3xl"
          >
            <div className="mb-3 flex justify-between text-xs text-muted sm:text-sm">
              <span>Recursos compartidos · menos control</span>
              <span className="text-right">Recursos dedicados · más control</span>
            </div>
            <div className="relative h-24">
              <motion.div
                className="absolute left-0 right-0 top-[34px] h-1.5 origin-left rounded-full bg-gradient-to-r from-[#38bdf8] via-[#34d399] to-[#a78bfa]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
              />
              {models
                .slice()
                .sort((a, b) => ["public", "hybrid", "private"].indexOf(a.id) - ["public", "hybrid", "private"].indexOf(b.id))
                .map((m, i) => {
                  const NodeIcon = modelIcons[m.id];
                  const left = ["0%", "50%", "100%"][i];
                  const on = m.id === active;
                  return (
                    <motion.button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setActive(m.id);
                        goTo("explorador");
                      }}
                      aria-label={`Ver ${m.name}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: "spring", delay: 0.9 + i * 0.15 }}
                      className="absolute top-0 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2"
                      style={{ left }}
                    >
                      <motion.span
                        className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 bg-card"
                        style={{ borderColor: m.color, color: m.color }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <NodeIcon className="h-7 w-7" />
                      </motion.span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: on ? m.color : "var(--foreground)" }}
                      >
                        {m.name.replace("Nube ", "")}
                      </span>
                    </motion.button>
                  );
                })}
            </div>
            <p className="mt-2 text-center text-sm text-muted">Clic en un modelo para ver el detalle ↓</p>
          </motion.div>
        </div>
      </header>

      {/* ───────── EXPLORADOR ───────── */}
      <section id="explorador" className="mx-auto w-full max-w-6xl scroll-mt-6 px-6 py-16" aria-labelledby="titulo-explorador">
        <SectionTitle
          kicker="Uno por uno"
          title="Los tres modelos al detalle"
          sub="De cada uno cuento cómo funciona, qué lo caracteriza y en qué casos se usa."
        />

        <div role="tablist" aria-label="Modelos de despliegue" className="grid gap-3 sm:grid-cols-3">
          {models.map((m, i) => {
            const TabIcon = modelIcons[m.id];
            const on = m.id === active;
            return (
              <button
                key={m.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`tab-${m.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`panel-${m.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(m.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className="relative cursor-pointer overflow-hidden rounded-2xl border p-5 text-left transition-colors"
                style={{ borderColor: on ? m.color : "var(--border)" }}
              >
                {on && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0"
                    style={{ background: `color-mix(in srgb, ${m.color} 14%, var(--card))` }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `color-mix(in srgb, ${m.color} 18%, transparent)`, color: m.color }}
                  >
                    <TabIcon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold">{m.name}</span>
                    <span className="block text-sm text-muted">{m.tag}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={model.id}
            id={`panel-${model.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${model.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid gap-6 lg:grid-cols-2"
          >
            {/* Esquema */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <ModelDiagram id={model.id} color={model.color} />
            </div>

            {/* Información */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3" style={{ color: model.color }}>
                <Icon className="h-7 w-7" />
                <h3 className="text-2xl font-bold">{model.name}</h3>
              </div>
              <p className="mt-3 leading-relaxed text-foreground/90">{model.definition}</p>

              <div
                className="mt-4 flex gap-3 rounded-xl p-4 text-sm leading-relaxed"
                style={{ background: `color-mix(in srgb, ${model.color} 10%, transparent)` }}
              >
                <BulbIcon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: model.color }} />
                <p>
                  <strong style={{ color: model.color }}>Una forma de verlo: </strong>
                  {model.analogy}
                </p>
              </div>

              <h4 className="mb-3 mt-6 font-mono text-xs uppercase tracking-widest text-muted">
                Características principales
              </h4>
              <motion.ul variants={list} initial="hidden" animate="show" className="space-y-2.5">
                {model.characteristics.map((c) => (
                  <motion.li key={c.title} variants={row} className="flex gap-3 text-sm">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: model.color }}
                    />
                    <span>
                      <strong>{c.title}.</strong> <span className="text-muted">{c.detail}</span>
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Infraestructura: conecta con la sección de requisitos */}
              <div className="mt-6 rounded-xl border border-border bg-background/40 p-4">
                <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
                  Infraestructura que exige
                </h4>
                <p className="text-sm leading-relaxed text-foreground/90">{model.infra}</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="w-32 shrink-0 text-xs text-muted">Infraestructura propia</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      key={model.id}
                      className="h-full rounded-full"
                      style={{ background: model.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(ownInfrastructure[model.id] / 5) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono text-xs text-muted">{ownInfrastructure[model.id]}/5</span>
                </div>
                <button
                  type="button"
                  onClick={() => goTo("infraestructura")}
                  className="mt-3 cursor-pointer text-sm font-medium text-accent hover:underline"
                >
                  Ver todos los requisitos ↓
                </button>
              </div>
            </div>

            {/* Ideal para + ejemplos */}
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Ideal para</h4>
                <div className="flex flex-wrap gap-2">
                  {model.idealFor.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-3 py-1 text-sm"
                      style={{ borderColor: `color-mix(in srgb, ${model.color} 45%, transparent)` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Ejemplos</h4>
                <div className="flex flex-wrap gap-2">
                  {model.examples.map((t) => (
                    <span
                      key={t}
                      className="rounded-md px-3 py-1 font-mono text-sm"
                      style={{
                        background: `color-mix(in srgb, ${model.color} 14%, transparent)`,
                        color: model.color,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="rounded-2xl border p-6 sm:col-span-2"
                style={{
                  borderColor: `color-mix(in srgb, ${model.color} 45%, transparent)`,
                  background: `color-mix(in srgb, ${model.color} 7%, var(--card))`,
                }}
              >
                <h4 className="mb-2 font-mono text-xs uppercase tracking-widest" style={{ color: model.color }}>
                  Ejemplo práctico
                </h4>
                <p className="leading-relaxed text-foreground/90">{model.example}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ───────── VENTAJAS Y DESVENTAJAS ───────── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16" aria-labelledby="pros-cons">
        <SectionTitle
          kicker="Lo bueno y lo malo"
          title={`Ventajas y desventajas de la ${model.name.toLowerCase()}`}
          sub="A los tres los evalué con los mismos criterios para que la comparación sea justa."
        />
        <div className="mb-8 flex flex-wrap justify-center gap-3" role="group" aria-label="Cambiar modelo">
          {models.map((m) => {
            const on = m.id === active;
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(m.id)}
                className="cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  borderColor: on ? m.color : "var(--border)",
                  background: on ? `color-mix(in srgb, ${m.color} 16%, transparent)` : "transparent",
                  color: on ? m.color : "var(--muted)",
                }}
              >
                {m.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={model.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-6 md:grid-cols-2"
          >
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#34d399]">
                <CheckIcon className="h-5 w-5" strokeWidth={3} /> Ventajas
              </h3>
              <PointList points={model.pros} color={model.color} kind="pro" />
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#fb7185]">
                <XIcon className="h-5 w-5" strokeWidth={3} /> Desventajas
              </h3>
              <PointList points={model.cons} color={model.color} kind="con" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <Requirements active={active} onSelect={setActive} />
      <StorageAdaptability />
      <Comparison />
      <Recommender onSelect={setActive} />

      {/* ───────── NOTA Y FUENTES ───────── */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto max-w-4xl space-y-4 text-sm leading-relaxed text-muted">
          <p>
            <strong className="text-foreground">Aparte:</strong> el NIST también habla de la nube{" "}
            <em>comunitaria</em> (la comparten varias organizaciones con intereses en común), y hoy se usa
            mucho el <em>multicloud</em>, que es trabajar con varios proveedores de nube pública a la vez.
          </p>
          <p>
            <strong className="text-foreground">Fuentes:</strong> SENA, <em>Características de la computación en
            la nube</em> (CF1, octubre 2025), para los modelos de despliegue, la infraestructura, la seguridad y
            los ejemplos. SENA, <em>Servicios de la computación en la nube</em> (CF2, octubre 2025), para algunos
            proveedores. NIST SP 800-145, <em>The NIST Definition of Cloud Computing</em> (2011), para las
            definiciones de referencia.
          </p>
          <p className="pt-4 text-center font-mono">Cloud Computing · SENA</p>
        </div>
      </footer>
    </MotionConfig>
  );
}
