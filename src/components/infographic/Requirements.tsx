"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  infraComponents,
  models,
  ownInfrastructure,
  requirementAreas,
  securityPractices,
  type ModelId,
} from "@/data/deployment-models";
import { areaIcons, modelIcons, ShieldIcon } from "./Icons";
import SectionTitle from "./SectionTitle";

export default function Requirements({
  active,
  onSelect,
}: {
  active: ModelId;
  onSelect: (id: ModelId) => void;
}) {
  const [areaId, setAreaId] = useState(requirementAreas[0].id);
  const area = requirementAreas.find((a) => a.id === areaId) ?? requirementAreas[0];

  return (
    <section id="infraestructura" className="mx-auto w-full max-w-6xl scroll-mt-6 px-6 py-16" aria-labelledby="requisitos">
      <SectionTitle
        kicker="Infraestructura"
        title="¿Qué infraestructura pide cada modelo?"
        sub="La infraestructura de la nube es el conjunto de recursos físicos y virtuales que permiten ofrecer servicios por Internet. Estos son los seis requisitos técnicos básicos y quién los cubre en cada modelo."
      />

      <div className="mb-6 flex flex-wrap justify-center gap-3" role="group" aria-label="Requisito técnico">
        {requirementAreas.map((a) => {
          const Icon = areaIcons[a.id];
          const on = a.id === areaId;
          return (
            <button
              key={a.id}
              type="button"
              aria-pressed={on}
              onClick={() => setAreaId(a.id)}
              className="relative flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              style={{
                borderColor: on ? "var(--accent)" : "var(--border)",
                color: on ? "var(--accent)" : "var(--muted)",
              }}
            >
              {on && (
                <motion.span
                  layoutId="area-bg"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "color-mix(in srgb, var(--accent) 12%, transparent)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative">{a.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={area.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <p className="mx-auto mb-6 max-w-3xl text-center leading-relaxed text-foreground/90">
            <strong>{area.label}:</strong> {area.what}
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {models.map((m, i) => {
              const Icon = modelIcons[m.id];
              const on = m.id === active;
              return (
                <motion.button
                  key={m.id}
                  type="button"
                  onClick={() => onSelect(m.id)}
                  aria-pressed={on}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  whileHover={{ y: -4 }}
                  className="cursor-pointer rounded-2xl border p-6 text-left transition-colors"
                  style={{
                    borderColor: on ? m.color : "var(--border)",
                    background: on ? `color-mix(in srgb, ${m.color} 9%, var(--card))` : "var(--card)",
                  }}
                >
                  <span className="flex items-center gap-2 font-semibold" style={{ color: m.color }}>
                    <Icon className="h-5 w-5" /> {m.name}
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-foreground/90">
                    {area.byModel[m.id]}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nivel de infraestructura propia */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h3 className="font-semibold">¿Cuánta infraestructura propia se necesita?</h3>
        <p className="mb-5 mt-1 text-sm text-muted">1 es nada propio y 5 es todo propio.</p>
        <ul className="space-y-3">
          {models.map((m) => (
            <li key={m.id} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-sm" style={{ color: m.color }}>
                {m.name}
              </span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: m.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(ownInfrastructure[m.id] / 5) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <span className="w-8 text-right font-mono text-xs text-muted">{ownInfrastructure[m.id]}/5</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Componentes de la infraestructura */}
      <div className="mt-10">
        <h3 className="mb-4 text-center text-xl font-bold">¿De qué está hecha?</h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {infraComponents.map((c, i) => {
            const Icon = areaIcons[c.id];
            return (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-border bg-card p-4"
              >
                <Icon className="h-6 w-6 text-accent" />
                <p className="mt-3 text-sm font-semibold leading-snug">{c.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{c.detail}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Seguridad */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 rounded-2xl border border-border bg-card p-6"
      >
        <h3 className="flex items-center gap-2 font-semibold">
          <ShieldIcon className="h-5 w-5 text-accent" />
          Seguridad que acompaña a la infraestructura
        </h3>
        <p className="mb-4 mt-1 text-sm text-muted">
          Busca garantizar la confidencialidad, la integridad y la disponibilidad de los datos. Las prácticas más comunes:
        </p>
        <ul className="flex flex-wrap gap-2">
          {securityPractices.map((p) => (
            <li key={p} className="rounded-full border border-border px-3 py-1 text-sm">
              {p}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
