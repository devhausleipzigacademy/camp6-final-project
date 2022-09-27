const { Telegraf } = require("telegraf");

const bot = new Telegraf("5682084032:AAErx6P1_Ipphv6MXI-G6lzYF6teHirpuSo");

bot.start((ctx) => ctx.reply("Welcome"));

bot.use((ctx, next) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    `Go and contact <a href="tg://user?id=921611370">${ctx.from.first_name}</a> about the book she wants to borrow, also, your user_id is ${ctx.from.id}`,
    { parse_mode: "HTML" }
  );
  next();
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
