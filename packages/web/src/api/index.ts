import { Hono } from 'hono';
import { cors } from "hono/cors"
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "./database";
import { waitlist } from "./database/schema";

const waitlistSchema = z.object({
  email: z.string().email(),
});

const app = new Hono()
  .basePath('api')
  .use(cors({ origin: (origin) => origin ?? "*", credentials: true, exposeHeaders: ["set-auth-token"] }))
  .get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }, 200))
  .get('/health', (c) => c.json({ status: 'ok' }, 200))
  .post('/waitlist', zValidator("json", waitlistSchema), async (c) => {
    const { email } = c.req.valid("json");
    try {
      await db.insert(waitlist).values({ email }).onConflictDoNothing();
      return c.json({ success: true }, 200);
    } catch (err) {
      return c.json({ success: false, error: "Failed to join waitlist" }, 500);
    }
  });

export type AppType = typeof app;
export default app;
