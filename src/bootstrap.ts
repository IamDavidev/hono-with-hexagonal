import { serve } from "https://deno.land/std@0.167.0/http/server.ts";
import { Hono } from "npm:hono@3.1.0";

export const abortController = new AbortController();

export function $bootstrap(abortController: AbortController) {
  const app = new Hono();

  app.get("/", (ctx) => {
    return ctx.text("Hono with Hexagonal Architecture");
  });

  try {
    serve(app.fetch, {
      port: 8080,
      signal: abortController.signal,
    });
  } catch (_e) {
    abortController.abort();
  }
}