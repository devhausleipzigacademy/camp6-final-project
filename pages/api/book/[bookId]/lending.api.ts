import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { z, ZodError } from "zod";

// Zod Model for Updating Book
const putBook = z.object({
	borrowerId: z.string(),
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
			const data = putBook.parse(req.body);
			const bookId = req.query.bookId as string;
			const borrower = req.query.borrowerId as string;
			const action = req.query.action as string;
			const users = await prisma.user.findMany();
			const book = await prisma.book.findFirstOrThrow({
				where: { identifier: bookId },
			});

			// check that borrower is valid user
			if (!users.find((user) => user.identifier === borrower)) {
				return res.status(404).send({ message: "Borrower not a valid user." });
			}

			// check that action 'borrow' is valid, i.e. book not already on loan
			if (action === "borrow" && book.borrowerId !== undefined) {
				return res.status(404).send({ message: "Book already on loan." });
			}

			// check that action 'return' is valid, i.e. book has borrowerId that matches borrower

			if (action === "return" && book.borrowerId !== borrower) {
				return res
					.status(404)
					.send({ message: "Book is on loan by another user." });
			}

			const borrowedBook = await prisma.book.update({
				where: {
					identifier: bookId,
				},
				data: { ...data },
			});

			res.status(202).json({ id: bookId });
		}
	} catch (err) {
		if (err instanceof ZodError) {
			res.status(422).send({
				message: "Invalid book.",
				error: err,
			});
		}
		res.status(404).send({
			message: "Looks like something went wrong. Please try again.",
			error: err,
		});
	}
}
