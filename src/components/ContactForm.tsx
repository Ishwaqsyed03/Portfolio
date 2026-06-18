"use client";
import { useState } from "react";

// Web3Forms access key (tied to ishwaqsyed16@gmail.com).
// Get yours free at https://web3forms.com — paste it here (or set NEXT_PUBLIC_WEB3FORMS_KEY at build time).
// This key is safe to expose in client code; Web3Forms handles spam filtering server-side.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "43c43249-b643-416d-a4c0-c30400312d58";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
      setError("Contact form is not configured yet. Please email me directly.");
      setState("error");
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: data.name,
          subject: data.subject
            ? `Portfolio contact: ${data.subject}`
            : "New message from your portfolio",
          name: data.name,
          email: data.email,
          message: data.message,
          // honeypot — bots fill this, humans don't
          botcheck: data.botcheck,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Failed to send");
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
      {/* Honeypot field (hidden from users) */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
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
      {state === "sent" && (
        <p className="mt-3 text-sm text-green-400">Thanks! Your message has been sent — I&apos;ll get back to you soon.</p>
      )}
      <button disabled={state === "loading"} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 px-5 py-2.5 disabled:opacity-60">
        {state === "loading" ? "Sending…" : state === "sent" ? "Sent ✓" : "Send Message"}
      </button>
    </form>
  );
}
