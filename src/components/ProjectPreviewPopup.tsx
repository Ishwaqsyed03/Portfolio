"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LazyVideo from "./LazyVideo";

/**
 * Hover pop-up: a small "window" at screen ratio that pops over the project card.
 * Shows a cycling gallery of website screenshots, a short overview, and a visit link.
 */
export default function ProjectPreviewPopup({
  title,
  type,
  overview,
  tech,
  href,
  visitLabel,
  shots,
  video,
  align = "center",
}: {
  title: string;
  type: string;
  overview: string;
  tech: string[];
  href: string;
  visitLabel: string;
  shots: string[];
  video?: string;
  align?: "left" | "center" | "right";
}) {
  const gallery = shots.length ? shots : [];
  const [i, setI] = useState(0);

  // Auto-advance the gallery while the popup is open.
  useEffect(() => {
    if (gallery.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % gallery.length), 2200);
    return () => clearInterval(id);
  }, [gallery.length]);

  const host = (() => {
    try {
      return new URL(href).host;
    } catch {
      return "preview";
    }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={`absolute -top-6 z-50 flex w-[160%] max-w-[min(640px,92vw)] items-start ${
        align === "left"
          ? "left-0 justify-start"
          : align === "right"
          ? "right-0 justify-end"
          : "left-1/2 -translate-x-1/2 justify-center"
      }`}
      style={{ perspective: 1000 }}
    >
      <div className="w-full overflow-hidden rounded-2xl border border-white/20 bg-zinc-900/95 shadow-2xl shadow-black/70 backdrop-blur-xl">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 h-8 px-3 bg-zinc-800/90 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          <span className="ml-2 flex-1 truncate rounded bg-black/40 px-2 py-0.5 text-[10px] text-zinc-400">
            {host}
          </span>
        </div>

        {/* Screen — windows-screen ratio */}
        <a href={href} target="_blank" rel="noreferrer" className="group/screen relative block aspect-[16/10] bg-zinc-950">
          {video ? (
            <LazyVideo src={video} className="absolute inset-0 h-full w-full object-cover object-top" />
          ) : gallery.length ? (
            gallery.map((src, idx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`${title} screenshot ${idx + 1}`}
                className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-500/20 to-fuchsia-500/20 text-base font-semibold text-white">
              {title}
            </div>
          )}

          {/* hover-to-open hint */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover/screen:bg-black/30 group-hover/screen:opacity-100">
            <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-black">
              Open live ↗
            </span>
          </div>

          {/* gallery dots */}
          {!video && gallery.length > 1 && (
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setI(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-4 bg-white" : "w-1.5 bg-white/40"
                  }`}
                  aria-label={`Screenshot ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </a>

        {/* Overview + link */}
        <div className="p-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-sky-400">
            {type}
          </div>
          <p className="mb-3 text-sm leading-relaxed text-zinc-300 line-clamp-3">
            {overview}
          </p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
          >
            {visitLabel}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
