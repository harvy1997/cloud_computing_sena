"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { models, questions, type ModelId } from "@/data/deployment-models";
import { BulbIcon, CheckIcon, modelIcons } from "./Icons";
import SectionTitle from "./SectionTitle";

const ids: ModelId[] = ["public", "private", "hybrid"];

export default function Recommender({ onSelect }: { onSelect: (id: ModelId) => void }) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const scores = ids.reduce(
    (acc, id) => {
      acc[id] = questions.reduce((sum, q) => sum + (answers[q.id] ? (q.weights[id] ?? 0) : 0), 0);
      return acc;
    },
    {} as Record<ModelId, number>,
  );
  const maxPossible = ids.reduce(
    (acc, id) => {
      acc[id] = questions.reduce((sum, q) => sum + (q.weights[id] ?? 0), 0);
      return acc;
    },
    {} as Record<ModelId, number>,
  );
  const top = Math.max(...ids.map((id) => scores[id]));
  const winners = top === 0 ? [] : ids.filter((id) => scores[id] === top);
  const winnerModels = models.filter((m) => winners.includes(m.id));

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20" aria-labelledby="recomendador">
      <SectionTitle
        kicker="¿Y cuál elijo?"
        title="¿Cómo decidir cuál usar?"
        sub="Depende de la situación de la organización. Marcando cada caso se ve hacia cuál modelo se inclina la decisión."
      />

      <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
        <ul className="space-y-3">
          {questions.map((q, i) => {
            const on = !!answers[q.id];
            return (
              <motion.li
                key={q.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: !a[q.id] }))}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl border p-4 text-left transition-colors"
                  style={{
                    borderColor: on ? "var(--accent)" : "var(--border)",
                    background: on ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "var(--card)",
                  }}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border"
                    style={{
                      borderColor: on ? "var(--accent)" : "var(--border)",
                      background: on ? "var(--accent)" : "transparent",
                    }}
                  >
                    {on && <CheckIcon className="h-4 w-4 text-background" strokeWidth={3} />}
                  </span>
                  <span className="text-sm leading-snug">{q.text}</span>
                </button>
              </motion.li>
            );
          })}
        </ul>

        <div className="rounded-2xl border border-border bg-card p-6" aria-live="polite">
          <ul className="mb-6 space-y-3">
            {models.map((m) => {
              const Icon = modelIcons[m.id];
              const pct = maxPossible[m.id] ? (scores[m.id] / maxPossible[m.id]) * 100 : 0;
              return (
                <li key={m.id}>
                  <div className="mb-1 flex items-center gap-2 text-sm" style={{ color: m.color }}>
                    <Icon className="h-4 w-4" />
                    {m.name}
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: m.color }}
                      animate={{ width: `${pct}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <AnimatePresence mode="wait">
            <motion.div
              key={winners.join("-") || "none"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-border p-4"
            >
              {winnerModels.length === 0 ? (
                <p className="flex items-start gap-2 text-sm text-muted">
                  <BulbIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  Marca alguna situación para ver la recomendación.
                </p>
              ) : (
                <>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    {winnerModels.length > 1 ? "Empate entre" : "Recomendado"}
                  </p>
                  <p className="mt-1 text-xl font-bold">
                    {winnerModels.map((m, i) => (
                      <span key={m.id}>
                        {i > 0 && <span className="text-muted"> o </span>}
                        <span style={{ color: m.color }}>{m.name}</span>
                      </span>
                    ))}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {winnerModels.map((m) => m.verdict).join(" ")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    <strong className="text-foreground">Infraestructura que implica: </strong>
                    {winnerModels.map((m) => m.infra).join(" ")}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(winnerModels[0].id);
                      document.getElementById("explorador")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-3 cursor-pointer text-sm font-medium text-accent hover:underline"
                  >
                    Ver el análisis de la {winnerModels[0].name.toLowerCase()} ↑
                  </button>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <p className="mt-4 text-xs text-muted">
            Es una simplificación: en la vida real también pesan el presupuesto, la normativa, el equipo y los tiempos.
          </p>
        </div>
      </div>
    </section>
  );
}
