import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "../../../../prisma/db";

const putUser = z.object({
  image: z.string().optional(),
  name: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  try {
    if (req.method === "PUT") {
      putUser.parse(req.body);

      const user = await prisma.user.update({
        where: {
          identifier: userId,
        },
        data: { ...req.body },
      });
      res.status(201).json(user);
    }
    if (req.method === "GET") {
      const user = await prisma.user.findFirst({
        where: { identifier: userId },
      });
      res.status(200).json(user);
    }
    if (req.method === "DELETE") {
      const deleteUser = await prisma.user.delete({
        where: {
          identifier: userId,
        },
      });
      res.status(200).json(deleteUser);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(422).send({
        message: "User doesnt exist",
        error: err,
      });
    }
    res.status(404).send({
      message: "Looks like something went wrong. Please try again.",
      error: err,
    });
  }
}
