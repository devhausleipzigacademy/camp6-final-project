import { NextApiRequest, NextApiResponse } from "next";
import { TelegramClient, TelegramTypes } from "messaging-api-telegram";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new TelegramClient({
    accessToken: process.env.NEXT_TELEGRAM_TOKEN,
  });
  console.log(req.query);

  const sender = await client.getChatMember(
    req.query.sender as string,
    parseInt(req.query.sender as string)
  );
  const receiver = await client.getChatMember(
    req.query.receiver as string,
    parseInt(req.query.receiver as string)
  );
  console.log(sender);
  console.log(receiver);

  client.sendMessage(
    req.query.receiver as string,
    `Hi ${receiver.user.firstName} you got a book request from <a href="tg://user?id=${req.query.sender}">${sender.user.firstName}</a> pls check your requests in the app`,
    { parseMode: TelegramTypes.ParseMode.HTML }
  );

  res.status(200).json({ message: "message sent" });
}

// 5403530190