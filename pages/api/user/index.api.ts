import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { z, ZodError } from "zod";
import { createUser } from "./interactions";

const postUser = z.object({
  username: z.string(),
  telegramId: z.string(),
  image: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type PostUser = z.infer<typeof postUser>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    }
    if (req.method === "POST") {
      const data = JSON.parse(req.body);
      const foundUser = await prisma.user.findUnique({
        where: { telegramId: data.telegramId },
      });
      if (!foundUser) {
        postUser.parse(data);
        // const data = PrismaClient.parse(req.body);

        const user = await createUser(data);

        res.status(201).json(user);
      } else {
        res.status(200).json(foundUser);
      }
    }
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(422).send({
        message: "invalid user.",
        error: err,
      });
    }
    console.log(err);
    res.status(400).send({
      message: "The server encountered an error",
      error: err,
    });
  }
}
