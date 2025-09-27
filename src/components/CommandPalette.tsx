"use client";
import { useEffect, useState } from "react";

const COMMANDS = [
  { label: "Go to About", href: "#about" },
  { label: "Go to Skills", href: "#skills" },
  { label: "Go to Projects", href: "#projects" },
  { label: "Go to Experience", href: "#experience" },
  { label: "Go to Trusted By", href: "#trusted" },
  { label: "Go to Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const filtered = COMMANDS.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-zinc-900/90 backdrop-blur">
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className="w-full bg-transparent px-4 py-3 text-base outline-none"
        />
        <ul className="max-h-80 overflow-auto divide-y divide-white/5">
          {filtered.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 hover:bg-white/5"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-4 py-2 text-xs text-zinc-400">Press Esc to close • Ctrl/⌘+K to toggle</div>
      </div>
    </div>
  );
}
