import { webhookCallback } from "grammY/mod.ts"
import bot from "./bot.ts"
import { USE_WEBHOOK } from "./Constants.ts"

const shouldUseWebhook =
  Deno.env.get(USE_WEBHOOK)?.trim().toLowerCase() === "true"

if (shouldUseWebhook === false) {
  bot.start()
}

const handleUpdate = webhookCallback(bot, "std/http")

Deno.serve(async (req) => {
  if (req.method === "POST") {
    const url = new URL(req.url)
    if (url.pathname.slice(1) === bot.token) {
      try {
        return await handleUpdate(req)
      } catch (err) {
        console.error(err)
      }
    }
  }
  return new Response()
})
