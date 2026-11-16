import "server-only";

/**
 * Minimal GitHub Contents API client used by the publishing endpoint.
 *
 * Posts stay file-backed: publishing commits a file to the content repo and
 * the normal push-to-deploy pipeline takes it from there.
 */

/** An error whose message is safe and useful to show to the calling agent. */
export class PublishError extends Error {
  override name = "PublishError";
}

interface RepoConfig {
  apiUrl: string;
  token: string;
  repo: string;
  branch: string;
}

function repoConfig(): RepoConfig {
  const token = process.env.CONTENT_GITHUB_TOKEN;
  if (!token) {
    throw new PublishError(
      "Publishing is not configured on the server: CONTENT_GITHUB_TOKEN is missing.",
    );
  }
  return {
    apiUrl: (process.env.GITHUB_API_URL ?? "https://api.github.com").replace(/\/$/, ""),
    token,
    repo: process.env.CONTENT_GITHUB_REPO ?? "phanvantai/taiphanvan.dev",
    branch: process.env.CONTENT_GITHUB_BRANCH ?? "main",
  };
}

function contentsUrl(cfg: RepoConfig, path: string): string {
  const encoded = path.split("/").map(encodeURIComponent).join("/");
  return `${cfg.apiUrl}/repos/${cfg.repo}/contents/${encoded}`;
}

async function request(cfg: RepoConfig, url: string, init?: RequestInit): Promise<Response> {
  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${cfg.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "taiphanvan.dev-publisher",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
      },
    });
  } catch {
    throw new PublishError("Could not reach GitHub. Try again in a moment.");
  }
  if (res.status === 401 || res.status === 403) {
    console.error(`[publish] GitHub rejected the request: ${res.status} ${await res.text()}`);
    throw new PublishError(
      "GitHub rejected the server's credentials (expired token, missing write permission, or rate limit). The site owner needs to check CONTENT_GITHUB_TOKEN.",
    );
  }
  return res;
}

async function fail(res: Response, action: string): Promise<never> {
  console.error(`[publish] GitHub ${action} failed: ${res.status} ${await res.text()}`);
  if (res.status === 409 || res.status === 422) {
    throw new PublishError(
      `Could not ${action}: the file changed on GitHub at the same time. Try again.`,
    );
  }
  throw new PublishError(`Could not ${action}: GitHub returned ${res.status}.`);
}

/** File names in a repo directory. A missing directory is an empty list. */
export async function listFiles(dir: string): Promise<string[]> {
  const cfg = repoConfig();
  const res = await request(cfg, `${contentsUrl(cfg, dir)}?ref=${encodeURIComponent(cfg.branch)}`);
  if (res.status === 404) return [];
  if (!res.ok) await fail(res, "list posts");
  const entries = (await res.json()) as { name: string; type: string }[];
  if (!Array.isArray(entries)) return [];
  return entries.filter((e) => e.type === "file").map((e) => e.name);
}

export interface RepoFile {
  text: string;
  sha: string;
}

export async function readFile(path: string): Promise<RepoFile | null> {
  const cfg = repoConfig();
  const res = await request(cfg, `${contentsUrl(cfg, path)}?ref=${encodeURIComponent(cfg.branch)}`);
  if (res.status === 404) return null;
  if (!res.ok) await fail(res, "read the post");
  const body = (await res.json()) as { content?: string; sha: string };
  return { text: Buffer.from(body.content ?? "", "base64").toString("utf8"), sha: body.sha };
}

/** Create a file, or replace it when `sha` (the version being replaced) is given. */
export async function writeFile(
  path: string,
  text: string,
  message: string,
  sha?: string,
): Promise<void> {
  const cfg = repoConfig();
  const res = await request(cfg, contentsUrl(cfg, path), {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(text, "utf8").toString("base64"),
      branch: cfg.branch,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) await fail(res, "save the post");
}

export async function deleteFile(path: string, sha: string, message: string): Promise<void> {
  const cfg = repoConfig();
  const res = await request(cfg, contentsUrl(cfg, path), {
    method: "DELETE",
    body: JSON.stringify({ message, sha, branch: cfg.branch }),
  });
  if (!res.ok) await fail(res, "delete the post");
}
