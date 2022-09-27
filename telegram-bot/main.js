var Telegraf = require("telegraf").Telegraf;
var bot = new Telegraf("5682084032:AAErx6P1_Ipphv6MXI-G6lzYF6teHirpuSo");
bot.start(function (ctx) { return ctx.reply("Welcome"); });
bot.use(function (ctx, next) {
    bot.telegram.sendMessage(ctx.chat.id, "go and contact <a href=\"tg://user?id=921611370\">".concat(ctx.from.first_name, "</a> about the book she wants to borrow, also, your user_id is ").concat(ctx.from.id), { parse_mode: "HTML" });
    next();
});
bot.launch();
// Enable graceful stop
process.once("SIGINT", function () { return bot.stop("SIGINT"); });
process.once("SIGTERM", function () { return bot.stop("SIGTERM"); });
