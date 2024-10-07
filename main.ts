import { Bot } from "grammY/mod.ts";

const TELEGRAM_BOT_TOKEN = "TELEGRAM_BOT_TOKEN";

const token = Deno.env.get(TELEGRAM_BOT_TOKEN)?.trim();

if (typeof token === "undefined") {
  const errorMsg = `Not able to obtain the Telegram Bot API Token from the environment variable ${TELEGRAM_BOT_TOKEN}`;
  console.error(errorMsg);
  throw new Error(errorMsg);
}

const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();
