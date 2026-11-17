"use client";

import Link from "next/link";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { activityLabels, topics } from "@/data/topics";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 18 } },
};

function FloatingCloud({
  className,
  delay = 0,
  duration = 9,
}: {
  className: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute select-none ${className}`}
      animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      ☁️
    </motion.span>
  );
}

export default function Intro() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    // reducedMotion="user": si el sistema pide menos movimiento, se respeta
    <MotionConfig reducedMotion="user">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-accent to-accent-2"
        style={{ scaleX: progress }}
      />

      {/* HERO */}
      <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="glow pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent-2/30 blur-[120px]" />
        <div className="glow pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-accent/20 blur-[110px]" />

        <FloatingCloud className="left-[8%] top-[18%] text-6xl opacity-70" duration={10} />
        <FloatingCloud className="right-[10%] top-[26%] text-5xl opacity-50" delay={1.5} duration={12} />
        <FloatingCloud className="bottom-[22%] left-[16%] text-4xl opacity-40" delay={3} duration={8} />

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-sm text-accent backdrop-blur"
        >
          SENA · Cloud Computing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="max-w-3xl text-5xl font-bold tracking-tight sm:text-7xl"
        >
          Aprendamos{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            la nube
          </span>
          , una práctica a la vez
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-xl text-lg text-muted"
        >
          Lecciones, quizzes, laboratorios y entregables. Todo en un solo lugar,
          y por ahora corriendo en nuestro propio servidor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 rounded-lg border border-border bg-card/70 px-4 py-2 font-mono text-sm text-muted backdrop-blur"
        >
          <span className="text-accent">$</span> ssh mi-servidor
          <span className="cursor ml-0.5 text-accent">▍</span>
        </motion.div>

        <motion.a
          href="#temas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="mt-10 rounded-full bg-gradient-to-r from-accent to-accent-2 px-8 py-3 font-semibold text-background shadow-lg shadow-accent-2/30"
        >
          Ver las actividades
        </motion.a>

        <motion.span
          aria-hidden
          className="absolute bottom-8 text-2xl text-muted"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </header>

      {/* TEMAS */}
      <main id="temas" className="mx-auto w-full max-w-6xl scroll-mt-8 px-6 pb-32 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Actividades</h2>
          <p className="mt-3 text-muted">
            {topics.length === 1 ? "1 actividad" : `${topics.length} actividades`} · iremos agregando más
          </p>
        </motion.div>

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap justify-center gap-5"
        >
          {topics.map((topic, i) => {
            const content = (
              <>
                <span className="absolute right-4 top-3 font-mono text-5xl font-bold text-white/[0.04] transition-colors group-hover:text-accent/15">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <motion.div
                  className="mb-4 inline-block text-4xl"
                  whileHover={{ rotate: [0, -12, 12, -6, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {topic.emoji}
                </motion.div>

                <h3 className="text-xl font-semibold">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{topic.summary}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {topic.activities.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-border px-3 py-1 font-mono text-xs text-accent-2"
                    >
                      {activityLabels[a]}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm font-semibold text-accent">{topic.cta} →</p>
              </>
            );

            return (
              <motion.li
                key={topic.id}
                variants={item}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative w-full overflow-hidden rounded-2xl border border-border bg-card hover:border-accent/60 sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.85rem)]"
              >
                <Link href={topic.href} className="block p-6">
                  {content}
                </Link>
              </motion.li>
            );
          })}
        </motion.ol>
      </main>

      <footer className="border-t border-border py-8 text-center font-mono text-sm text-muted">
        Cloud Computing · SENA
      </footer>
    </MotionConfig>
  );
}
