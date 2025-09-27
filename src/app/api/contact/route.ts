import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter (per runtime instance)
const recent = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const last = recent.get(ip) || 0;
    if (now - last < 30_000) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    recent.set(ip, now);

    // TODO: integrate with email provider (Resend/SendGrid) or webhook
    console.log("Contact form:", { name, email, subject, message });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
