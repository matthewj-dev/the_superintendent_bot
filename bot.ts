import { Bot } from "grammY/mod.ts";
import { TELEGRAM_BOT_TOKEN } from "./Constants.ts";

const token = Deno.env.get(TELEGRAM_BOT_TOKEN)?.trim();

if (typeof token === "undefined") {
  throw new Error(
    `Not able to obtain the Telegram Bot API Token from the environment variable ${TELEGRAM_BOT_TOKEN}`,
  );
}

const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on("message", (ctx) => ctx.reply("Got another message!"));

export default bot;
