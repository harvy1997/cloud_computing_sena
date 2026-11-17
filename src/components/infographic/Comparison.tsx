"use client";

import { motion } from "motion/react";
import { criteria, models, tableRows } from "@/data/deployment-models";
import { modelIcons } from "./Icons";
import SectionTitle from "./SectionTitle";

export default function Comparison() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-10" aria-labelledby="comparacion">
      <SectionTitle
        compact
        kicker="Resumen"
        title="Los tres modelos lado a lado"
        sub="Cinco criterios puntuados de 1 a 5: a más puntos, mejor para quien contrata."
      />

      {/* Leyenda de colores */}
      <div className="mb-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
        {models.map((m) => (
          <span key={m.id} className="flex items-center gap-2" style={{ color: m.color }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: m.color }} />
            {m.name}
          </span>
        ))}
      </div>

      {/* Barras compactas */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {criteria.map((c, ci) => (
            <li key={c.id}>
              <p className="mb-1.5 text-sm font-semibold" title={c.hint}>
                {c.label}
              </p>
              <div className="space-y-1">
                {models.map((m) => {
                  const v = c.scores[m.id];
                  return (
                    <div key={m.id} className="flex items-center gap-2" role="img" aria-label={`${m.name}: ${v} de 5`}>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: m.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(v / 5) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: ci * 0.06, ease: "easeOut" }}
                        />
                      </div>
                      <span className="w-6 text-right font-mono text-[11px] text-muted">{v}</span>
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tabla compacta */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="mt-5 overflow-x-auto rounded-2xl border border-border bg-card"
      >
        <table className="w-full min-w-160 border-collapse text-left text-xs sm:text-sm">
          <caption className="sr-only">Comparación de características entre nube pública, privada e híbrida</caption>
          <thead>
            <tr>
              <th scope="col" className="w-32 p-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                Característica
              </th>
              {models.map((m) => {
                const Icon = modelIcons[m.id];
                return (
                  <th key={m.id} scope="col" className="p-3">
                    <span className="flex items-center gap-2 font-semibold" style={{ color: m.color }}>
                      <Icon className="h-4 w-4" />
                      {m.name}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row) => (
              <tr key={row.label} className="group border-t border-border">
                <th scope="row" className="p-3 align-top font-semibold">
                  {row.label}
                </th>
                {models.map((m) => (
                  <td
                    key={m.id}
                    className="p-3 align-top leading-snug text-foreground/85 transition-colors group-hover:bg-white/3"
                  >
                    {row.values[m.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}
