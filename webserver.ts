import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import type { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();
router
  .get("/", async (context: Context) => {
    const html_file = await Deno.readFile("./src/index.html");
    context.response.body = html_file;
  })
  .get("/about", async (context: Context) => {
    const html_file = await Deno.readFile("./src/about/index.html");
    context.response.body = html_file;
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
