"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { adaptabilityLevel, models, storageScenarios } from "@/data/deployment-models";
import { DatabaseIcon, modelIcons } from "./Icons";
import SectionTitle from "./SectionTitle";

export default function StorageAdaptability() {
  const [scenarioId, setScenarioId] = useState(storageScenarios[0].id);
  const scenario = storageScenarios.find((s) => s.id === scenarioId) ?? storageScenarios[0];
  const best = Math.max(...models.map((m) => scenario.fit[m.id].score));

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16" aria-labelledby="adaptabilidad">
      <SectionTitle
        kicker="Adaptabilidad"
        title="¿Qué tan bien se adapta según lo que se guarda?"
        sub="No es lo mismo guardar documentos del día a día que historias clínicas. Para cada necesidad de almacenamiento valoré qué tan bien la responde cada modelo."
      />

      <div className="mb-6 flex flex-wrap justify-center gap-3" role="group" aria-label="Requerimiento de almacenamiento">
        {storageScenarios.map((s) => {
          const on = s.id === scenarioId;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={on}
              onClick={() => setScenarioId(s.id)}
              className="relative cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              style={{
                borderColor: on ? "var(--accent-2)" : "var(--border)",
                color: on ? "var(--foreground)" : "var(--muted)",
              }}
            >
              {on && (
                <motion.span
                  layoutId="scenario-bg"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "color-mix(in srgb, var(--accent-2) 22%, transparent)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{s.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <p className="mx-auto mb-8 flex max-w-3xl items-start justify-center gap-3 text-center text-foreground/90">
            <DatabaseIcon className="mt-1 h-5 w-5 shrink-0 text-accent-2" />
            <span>
              <strong>Lo que se necesita:</strong> {scenario.need}
            </span>
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {models.map((m, i) => {
              const Icon = modelIcons[m.id];
              const { score, why } = scenario.fit[m.id];
              const isBest = score === best;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  className="relative rounded-2xl border p-6"
                  style={{
                    borderColor: isBest ? m.color : "var(--border)",
                    background: isBest ? `color-mix(in srgb, ${m.color} 9%, var(--card))` : "var(--card)",
                  }}
                >
                  {isBest && (
                    <span
                      className="absolute -top-3 right-4 rounded-full px-3 py-0.5 text-xs font-bold text-background"
                      style={{ background: m.color }}
                    >
                      Mayor adaptabilidad
                    </span>
                  )}
                  <span className="flex items-center gap-2 font-semibold" style={{ color: m.color }}>
                    <Icon className="h-5 w-5" /> {m.name}
                  </span>

                  <div className="mt-4 flex items-center gap-1.5" role="img" aria-label={`Adaptabilidad ${adaptabilityLevel[score].toLowerCase()}, ${score} de 5`}>
                    {Array.from({ length: 5 }).map((_, k) => (
                      <motion.span
                        key={k}
                        className="h-2.5 flex-1 origin-left rounded-full"
                        style={{ background: k < score ? m.color : "rgba(255,255,255,0.08)" }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.15 + i * 0.08 + k * 0.06 }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 font-mono text-xs text-muted">
                    Adaptabilidad {adaptabilityLevel[score].toLowerCase()} · {score}/5
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">{why}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
