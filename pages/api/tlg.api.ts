import { NextApiRequest, NextApiResponse } from "next";
import { TelegramClient } from "messaging-api-telegram";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new TelegramClient({
    accessToken: process.env.NEXT_TELEGRAM_TOKEN,
  });

  client.sendMessage(5403530190, "Hello");

  res.status(200).json({ message: "message sent" });
}
