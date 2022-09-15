import { NextApiRequest, NextApiResponse } from "next";
import { User, Prisma } from "@prisma/client";
import { prisma } from "../../../../prisma/db";
import { z, ZodError } from "zod";

const putUser = z.object({
	image: z.string().optional(),
	name: z.string().optional(),
});
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method === "PUT ") {
			const data = putUser.parse(req.body);
			const userId = req.query.userId as string;
			const user = await prisma.user.update({
				where: {
					id: userId,
				},
				data: { image: req.body.image, name: req.body.name },
			});
			res.status(201).json(user);
		}
		if (req.method === "GET") {
			const userId = req.query.userId as string;
			const user = await prisma.user.findFirst({
				where: { id: userId },
			});
			res.status(200).json(user);
		}
		if (req.method === "DELETE") {
			const userId = req.query.userId as string;
			const deleteUser = await prisma.user.delete({
				where: {
					id: userId,
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
