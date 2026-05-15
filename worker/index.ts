/**
 * Cloudflare Worker entrypoint for bgremovers.org.
 *
 * Two responsibilities:
 *
 *   1. **301 redirect www.bgremovers.org → bgremovers.org** (preserves path
 *      and query string). Avoids splitting SEO authority between two
 *      hostnames and stops Google indexing duplicate URLs.
 *
 *   2. Delegate everything else to the static-assets handler bound as
 *      `env.ASSETS`. This is the same content that used to be served by
 *      the assets-only Worker — same /out directory, same files, same caching.
 *
 * Required wrangler.jsonc settings (already configured):
 *
 *   - `main`: this file
 *   - `assets.binding`: "ASSETS"
 *   - `assets.run_worker_first`: true   (otherwise the assets handler wins
 *                                        before the Worker can redirect)
 *
 * Cost: roughly 1 ms of Worker CPU per request — well within the free tier.
 */

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

const APEX_HOST = "bgremovers.org";
const WWW_HOST = "www.bgremovers.org";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 301 redirect www → apex, preserving path + query.
    if (url.hostname === WWW_HOST) {
      url.hostname = APEX_HOST;
      return Response.redirect(url.toString(), 301);
    }

    // Everything else is handled by the static-assets binding (same behaviour
    // as before this Worker existed).
    return env.ASSETS.fetch(request);
  },
};
