"use client";

import { motion } from "motion/react";

export default function SectionTitle({
  kicker,
  title,
  sub,
  compact = false,
}: {
  kicker: string;
  title: string;
  sub?: string;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`text-center ${compact ? "mb-6" : "mb-10"}`}
    >
      <p className="font-mono text-sm uppercase tracking-widest text-accent">{kicker}</p>
      <h2 className={`mt-2 font-bold ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}>{title}</h2>
      {sub && <p className="mx-auto mt-3 max-w-2xl text-muted">{sub}</p>}
    </motion.div>
  );
}
