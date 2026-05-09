/**
 * Tracker auth: signed-cookie session.
 *
 * Cookie value: `${expiresAt}.${signatureHex}`
 *   - expiresAt: epoch ms as string
 *   - signatureHex: HMAC-SHA256(secret, expiresAt) hex
 *
 * Edge-compatible (Web Crypto only, no Node Buffer).
 */

export const TRACKER_COOKIE_NAME = "tracker_auth";
export const TRACKER_SESSION_DAYS = 30;

const enc = new TextEncoder();

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) return new Uint8Array(0);
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function createSession(secret: string): Promise<{ value: string; expiresAt: Date }> {
  const expiresAt = new Date(Date.now() + TRACKER_SESSION_DAYS * 86400 * 1000);
  const payload = expiresAt.getTime().toString();
  const key = await importKey(secret);
  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return { value: `${payload}.${bytesToHex(sigBuffer)}`, expiresAt };
}

export async function verifySession(cookie: string | undefined, secret: string): Promise<boolean> {
  if (!cookie) return false;
  const dot = cookie.indexOf(".");
  if (dot < 1) return false;
  const payload = cookie.slice(0, dot);
  const sigHex = cookie.slice(dot + 1);

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  const key = await importKey(secret);
  const sigBytes = hexToBytes(sigHex);
  if (sigBytes.length === 0) return false;

  const ok = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes as unknown as BufferSource,
    enc.encode(payload),
  );
  if (!ok) return false;

  // Defense in depth: also constant-time compare hex
  const expectedSig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return timingSafeEqualHex(sigHex, bytesToHex(expectedSig));
}

export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function getEnvOrThrow(key: "TRACKER_PASSWORD" | "TRACKER_COOKIE_SECRET"): string {
  const v = process.env[key];
  if (!v) {
    throw new Error(`Missing env: ${key}. Set it in .env.local`);
  }
  return v;
}
