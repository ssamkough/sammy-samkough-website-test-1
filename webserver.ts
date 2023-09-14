import type { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();
router
  .get("/", async (context: Context, next) => {
    try {
      await context.send({
        root: `${Deno.cwd()}/public/`,
        index: "index.html",
      });
    } catch {
      await next();
    }
  })
  .get("/about", async (context: Context, next) => {
    try {
      await context.send({
        root: `${Deno.cwd()}/public/about/`,
        index: "index.html",
      });
    } catch {
      await next();
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/public/`,
    index: "index.html",
  });
});

console.log("should be running on http://localhost:8000")
await app.listen({ port: 8000 });
