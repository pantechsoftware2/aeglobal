import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  country?: unknown;
  course?: unknown;
  intake?: unknown;
  message?: unknown;
};

const fieldLimits = {
  name: 100,
  email: 160,
  phone: 30,
  country: 100,
  course: 160,
  intake: 80,
  message: 1200
} as const;

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = await request.json() as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const lead = {
    name: cleanString(payload.name, fieldLimits.name),
    email: cleanString(payload.email, fieldLimits.email),
    phone: cleanString(payload.phone, fieldLimits.phone),
    country: cleanString(payload.country, fieldLimits.country),
    course: cleanString(payload.course, fieldLimits.course),
    intake: cleanString(payload.intake, fieldLimits.intake),
    message: cleanString(payload.message, fieldLimits.message)
  };

  if (!lead.name || (!lead.email && !lead.phone)) {
    return NextResponse.json({ error: "Name and email or phone are required." }, { status: 400 });
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ error: "Invalid contact details." }, { status: 400 });
  }
  if (lead.phone && !/^[+()\d][\d\s().-]{6,28}$/.test(lead.phone)) {
    return NextResponse.json({ error: "Invalid contact details." }, { status: 400 });
  }

  const integrationUrl = process.env.B2C_INTEGRATION_API_URL;
  const integrationKey = process.env.B2C_INTEGRATION_API_KEY;
  if (!integrationUrl || !integrationKey) {
    console.error("Lead integration is not configured.");
    return NextResponse.json({ error: "Lead service unavailable." }, { status: 503 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(integrationUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${integrationKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lead),
      signal: controller.signal,
      cache: "no-store"
    });

    if (!response.ok) {
      console.error(`Lead integration returned ${response.status}.`);
      return NextResponse.json({ error: "Lead service unavailable." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead integration request failed.", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Lead service unavailable." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
