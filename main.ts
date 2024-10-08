import { webhookCallback } from "https://deno.land/x/grammy@v1.30.0/mod.ts";
import bot from "./bot.ts";
import { USE_WEBHOOK } from "./Constants.ts";

const shouldUseWebhook = Deno.env.get(USE_WEBHOOK)?.trim() === "true"
  ? true
  : false;

if (shouldUseWebhook === false) {
  bot.start();
}

const handleUpdate = webhookCallback(bot, "std/http");

Deno.serve(async (req) => {
  console.debug('Request Recieved' + req.url);
  if (req.method === "POST") {
    const url = new URL(req.url);
    if (url.pathname.slice(1) === bot.token) {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
  }
  return new Response();
});
