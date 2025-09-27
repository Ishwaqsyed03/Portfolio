"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to send");
      setState("sent");
      form.reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Full Name</label>
          <input name="name" required className="w-full rounded-md bg-transparent border border-white/10 px-3 py-2 outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Email</label>
          <input type="email" name="email" required className="w-full rounded-md bg-transparent border border-white/10 px-3 py-2 outline-none focus:border-sky-500" />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm text-zinc-300 mb-1">Subject</label>
        <input name="subject" required className="w-full rounded-md bg-transparent border border-white/10 px-3 py-2 outline-none focus:border-sky-500" />
      </div>
      <div className="mt-4">
        <label className="block text-sm text-zinc-300 mb-1">Message</label>
        <textarea name="message" required rows={6} className="w-full rounded-md bg-transparent border border-white/10 px-3 py-2 outline-none focus:border-sky-500" />
      </div>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      <button disabled={state === "loading"} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 px-5 py-2.5 disabled:opacity-60">
        {state === "loading" ? "Sending…" : state === "sent" ? "Sent ✓" : "Send Message"}
      </button>
    </form>
  );
}
