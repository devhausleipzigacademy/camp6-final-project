import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
prisma;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;

  if (req.method === "GET") {
    const likedBooks = await prisma.book.findMany({
      where: {
        likedBy: {
          some: { identifier: userId },
        },
      },
    });
    res.status(200).json(likedBooks);
  }
}
