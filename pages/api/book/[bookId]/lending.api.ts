// package imports
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";

//local imports
import { ErrorResponse } from "../index.api";
import { prisma } from "../../../../prisma/db";
import { retrieveBook } from "./interaction";

// Borrow Actions
const ACTIONS = ["borrow", "return"] as const;

// Zod Model for Borrowing Book
const borrowBook = z.object({
	borrowerId: z.string(),
	bookId: z.string(),
	action: z.enum(ACTIONS),
});

type BorrowBook = z.infer<typeof borrowBook>;

export default async function borrowHandler(
	req: NextApiRequest,
	res: NextApiResponse<
		{ identifier: string } | { message: string } | ErrorResponse
	>
) {
	try {
		if (req.method === "PUT") {
			const { bookId, borrowerId, action } = borrowBook.parse(req.query);

			// TODO: update line 33 with custom function once Furkan has added user interactions
			const users = await prisma.user.findMany();
			const book = await retrieveBook(bookId);

			// check that borrower is valid user
			if (!users.find((user) => user.identifier === borrowerId)) {
				return res.status(404).send({ message: "Borrower not a valid user." });
			}

			// check that action 'borrow' is valid, i.e. book not already on loan
			if (action === "borrow") {
				if (book.borrowerId !== null) {
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

				res.status(202).json({ identifier: bookId });
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

				res.status(202).json({ identifier: bookId });
			}
		}
	} catch (err) {
		if (err instanceof ZodError) {
			const errorResponse: ErrorResponse = {
				message: "Invalid book.",
			};
			if (["development", "test"].includes(process.env.NODE_ENV)) {
				errorResponse.error = err;
			}

			res.status(422).send(errorResponse);
		}

		const errorResponse: ErrorResponse = {
			message: "Looks like something went wrong. Please try again.",
		};
		if (["development", "test"].includes(process.env.NODE_ENV)) {
			errorResponse.error = err;
		}

		res.status(400).send(errorResponse);
	}
}
