"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  media?: { src: string; alt: string }[];
};

export default function CaseStudyModal({ open, onClose, title, description, media = [] }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-3xl rounded-2xl border border-white/10 bg-zinc-950 p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button aria-label="Close" onClick={onClose} className="rounded-md border border-white/10 px-2 py-1 text-sm hover:bg-white/5">Close</button>
            </div>
            <p className="text-zinc-400 mt-2">{description}</p>
            {media.length > 0 && (
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {media.map((m) => (
                  <div key={m.src} className="relative aspect-video overflow-hidden rounded-lg border border-white/10">
                    <Image src={m.src} alt={m.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
