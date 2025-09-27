"use client";
import { motion } from "framer-motion";
import { EXPERIENCE } from "../content/data";

export default function Experience() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" aria-hidden />
      <ul className="space-y-8">
        {EXPERIENCE.map((r) => (
          <li key={r.title} className="relative pl-10">
            <span className="absolute left-3 top-2 h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.6)]" aria-hidden />
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-[200px_1fr] gap-4">
              <div className="text-sm text-zinc-400">{r.period}</div>
              <div>
                <h3 className="font-semibold">{r.title}</h3>
                <ul className="list-disc pl-5 text-zinc-400 text-sm mt-1">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}
