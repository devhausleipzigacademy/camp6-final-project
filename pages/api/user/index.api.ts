import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { z, ZodError } from "zod";
//TODO:POST at '/user/' should contain:

const postUser = z.object({
	identifier: z.string(),
	username: z.string(),
	telegramId: z.string(),
	image: z.string().optional(),
	name: z.string().optional(),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method === "POST") {
			const data = postUser.parse(req.body);
			// const data = PrismaClient.parse(req.body);

			const user = await prisma.user.create({
				data: {
					...data,
				},
			});

			res.status(201).json({ identifier: user.id });
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
