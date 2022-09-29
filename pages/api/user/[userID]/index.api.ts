import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from "../../../../prisma/db";

class IntegrityError extends Error {
	constructor() {
		super();
	}
}

const putUser = z.object({
	image: z.string().optional(),
	name: z.string().optional(),
});
export default async function userIdHandler(
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
			console.log(user);
			res.status(201).json(user);
		}
		if (req.method === "GET") {
			const user = await prisma.user.findFirst({
				where: { identifier: userId },
			});
			res.status(200).json(user);
		}
		if (req.method === "DELETE") {
			const getBooksUserBorrowed = await prisma.book.findFirst({
				where: {
					borrowerId: userId,
				},
			});
			if (getBooksUserBorrowed) {
				throw new IntegrityError();
			}
			const deleteUser = await prisma.user.delete({
				where: {
					identifier: "003b79b4-e232-41ef-a9a4-72dbc1d3cea5",
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
		} else if (err instanceof IntegrityError) {
			res.status(422).send({
				message:
					"You have to return the borrowed books before deleting your account",
				error: err,
			});
		} else {
			res.status(404).send({
				message: "Looks like something went wrong. Please try again.",
				error: err,
			});
		}
	}
}
