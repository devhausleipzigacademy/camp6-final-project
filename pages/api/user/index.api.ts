import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { z, ZodError } from "zod";
import { createUser } from "./interactions";

const postUser = z.object({
	username: z.string(),
	telegramId: z.string(),
	image: z.string().optional(),
	name: z.string().optional(),
	createdAt: z.date(),
	uptadedAt: z.date(),
});

export type PostUser = z.infer<typeof postUser>;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const users = await prisma.user.findMany();
		res.status(200).json(users);
	}
	try {
		if (req.method === "POST") {
			postUser.parse(req.body);
			// const data = PrismaClient.parse(req.body);

			const user = await createUser(req.body);

			res.status(201).json({ id: user.identifier });
		}
	} catch (err) {
		if (err instanceof ZodError) {
			res.status(422).send({
				message: "invalid user.",
				error: err,
			});
		}
		res.status(400).send({
			message: "The server encountered an error",
			error: err,
		});
	}
}
