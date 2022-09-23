import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { z, ZodError } from "zod";

const ACTIONS = ["borrow", "return"] as const;

// Zod Model for Updating Book
const putBook = z.object({
	borrowerId: z.string(),
	bookId: z.string(),
	action: z.enum(ACTIONS),
});

type PutBook = z.infer<typeof putBook>;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		{ id: string } | { message: string } | { message: string; error: any }
	>
) {
	try {
		if (req.method === "PUT") {
			const { bookId, borrowerId, action } = putBook.parse(req.query);

			const users = await prisma.user.findMany();
			const book = await prisma.book.findFirstOrThrow({
				where: { identifier: bookId },
			});

			// check that borrower is valid user
			if (!users.find((user) => user.identifier === borrowerId)) {
				return res.status(404).send({ message: "Borrower not a valid user." });
			}

			// check that action 'borrow' is valid, i.e. book not already on loan
			if (action === "borrow") {
				if (book.borrowerId !== undefined) {
					return res.status(404).send({ message: "Book already on loan." });
				}

				// borrow action here
				const borrowedBook = await prisma.book.update({
					where: {
						identifier: bookId,
					},
					data: {
						borrowerId: borrowerId,
					},
				});

				res.status(202).json({ id: bookId });
			}

			// check that action 'return' is valid, i.e. book has borrowerId that matches borrower

			if (action === "return") {
				if (book.borrowerId !== borrowerId) {
					return res
						.status(404)
						.send({ message: "Book is on loan by another user." });
				}

				// return action here
				const borrowedBook = await prisma.book.update({
					where: {
						identifier: bookId,
					},
					data: {
						borrowerId: null,
					},
				});

				res.status(202).json({ id: bookId });
			}
		}
	} catch (err) {
		if (err instanceof ZodError) {
			res.status(422).send({
				message: "Invalid book.",
				error: err,
			});
		}
		res.status(400).send({
			message: "Looks like something went wrong. Please try again.",
			error: process.env.NODE_ENV == "development" ? err : undefined,
		});
	}
}
