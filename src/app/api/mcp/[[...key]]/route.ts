import { createHash, timingSafeEqual } from "node:crypto";

import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { createPublishServer } from "@/lib/publish/mcp-server";

/**
 * MCP endpoint (Streamable HTTP, stateless) for publishing blog posts.
 *
 * Auth is a single shared secret, MCP_PUBLISH_TOKEN, sent either as
 * `Authorization: Bearer <token>` or — for clients that can only be given a
 * URL — as the last path segment: `/api/mcp/<token>`.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MIN_TOKEN_LENGTH = 32;

interface RouteContext {
  params: Promise<{ key?: string[] }>;
}

function json(status: number, message: string, headers?: HeadersInit): Response {
  return Response.json(
    { jsonrpc: "2.0", error: { code: -32000, message }, id: null },
    { status, headers },
  );
}

function matches(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function POST(req: Request, { params }: RouteContext): Promise<Response> {
  const expected = process.env.MCP_PUBLISH_TOKEN;
  if (!expected || expected.length < MIN_TOKEN_LENGTH) {
    return json(503, "Publishing is not configured on this server.");
  }

  const bearer = /^Bearer\s+(.+)$/i.exec(req.headers.get("authorization") ?? "")?.[1];
  const provided = bearer ?? (await params).key?.[0];
  if (!provided || !matches(provided, expected)) {
    return json(401, "Unauthorized.", { "WWW-Authenticate": "Bearer" });
  }

  // Stateless: a fresh server per request, plain JSON responses, no sessions.
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  const server = createPublishServer();
  await server.connect(transport);
  return transport.handleRequest(req);
}

/** No server-initiated streams or sessions to manage. */
function methodNotAllowed(): Response {
  return json(405, "Method not allowed. Use POST.", { Allow: "POST" });
}

export { methodNotAllowed as GET, methodNotAllowed as DELETE };
