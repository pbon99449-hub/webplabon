import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

const QUEUE_DIR = path.join(process.cwd(), ".tmp");
const QUEUE_FILE = path.join(QUEUE_DIR, "contact-queue.ndjson");

function getBackendBaseUrl() {
  const raw = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";
  return raw.replace(/\/$/, "");
}

function getErrorMessage(data, fallback) {
  if (typeof data?.detail === "string" && data.detail.trim()) return data.detail;
  if (Array.isArray(data?.detail) && data.detail[0]?.msg) return data.detail[0].msg;
  if (typeof data?.error === "string" && data.error.trim()) return data.error;
  return fallback;
}

async function queueContact(payload) {
  await mkdir(QUEUE_DIR, { recursive: true });
  const row = JSON.stringify({ queued_at: new Date().toISOString(), ...payload });
  await appendFile(QUEUE_FILE, `${row}\n`, "utf8");
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!payload?.name || !payload?.email || !payload?.message) {
    return Response.json({ error: "name, email, message are required." }, { status: 400 });
  }

  const backendUrl = `${getBackendBaseUrl()}/api/contacts`;

  try {
    const upstream = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await upstream.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!upstream.ok) {
      const message = getErrorMessage(data, `Upstream failed (${upstream.status})`);
      return Response.json({ error: message }, { status: upstream.status });
    }

    return Response.json(data || { success: true }, { status: upstream.status });
  } catch {
    await queueContact(payload);
    return Response.json(
      {
        queued: true,
        message: "Backend unavailable. Message was saved locally and can be retried later.",
      },
      { status: 202 }
    );
  }
}
