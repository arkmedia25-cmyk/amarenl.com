import { NextRequest, NextResponse } from "next/server";
import { sendCAPIEvent } from "@/lib/meta-pixel";

/**
 * Server-side mirror of a client-fired Meta Pixel event. Called fire-and-forget
 * from client components right after the browser-side fbq() call, so the same
 * conversion is reported twice (browser + server) — the server copy survives
 * ad blockers and Safari/iOS tracking restrictions that drop the browser one.
 */
export async function POST(req: NextRequest) {
  let body: {
    event_name?: string;
    custom_data?: Record<string, unknown>;
    event_source_url?: string;
    email?: string;
    phone?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const { event_name, custom_data, event_source_url, email, phone } = body;
  if (!event_name || !event_source_url) {
    return NextResponse.json({ ok: false, error: "event_name and event_source_url required" }, { status: 400 });
  }

  const cookieHeader = req.headers.get("cookie") || "";
  const fbp = cookieHeader.match(/_fbp=([^;]+)/)?.[1];
  const fbc = cookieHeader.match(/_fbc=([^;]+)/)?.[1];

  const sent = await sendCAPIEvent({
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url,
    user_data: {
      client_ip_address: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      client_user_agent: req.headers.get("user-agent") || undefined,
      fbp,
      fbc,
      email,
      phone,
    },
    custom_data: custom_data || {},
  });

  return NextResponse.json({ ok: sent });
}
