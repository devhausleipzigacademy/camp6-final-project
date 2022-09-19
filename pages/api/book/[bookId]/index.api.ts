import { Book } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { z, ZodError } from "zod";
import { LANGUAGES, GENRES } from "../index.api";

// Zod Model for Updating Book
const putBook = z.object({
	title: z.string().optional(),
	author: z.string().optional(),
	language: z.enum(LANGUAGES).optional(),
	description: z.string().optional(),
	isbn: z.string().optional(),
	publishYear: z.date().optional(),
	genres: z
		.enum(GENRES)
		.array()
		.refine((arg) => JSON.stringify(arg)),
	tags: z
		.string()
		.array()
		.refine((arg) => JSON.stringify(arg)),
	isReserved: z.boolean().optional(),
});

const getBook = putBook.extend({
	genres: z.string().refine((arg) => JSON.parse(arg)),
	tags: z.string().refine((arg) => JSON.parse(arg)),
	identifier: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	borrowerId: z.string(),
});

type PostBook = z.infer<typeof putBook>;

type GetBook = z.infer<typeof getBook>;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		GetBook | { id: string } | { message: string; error: any }
	>
) {
	try {
		if (req.method === "GET") {
			const bookId = req.query.bookId as string;

			const book = await prisma.book.findFirstOrThrow({
				where: { identifier: bookId },
			});
			const parsedBook = getBook.parse(book);
			res.status(200).json(parsedBook);
		}
		if (req.method === "PUT") {
			const data = putBook.parse(req.body);
			const bookId = req.query.bookId as string;

			const updatedBook = await prisma.book.update({
				where: {
					identifier: bookId,
				},
				data: { ...data },
			});

			res.status(202).json({ id: bookId });
		}
		if (req.method === "DELETE") {
			const bookId = req.query.bookId as string;

			const deletedBook = await prisma.book.delete({
				where: {
					identifier: bookId,
				},
			});
			const parsedBook = getBook.parse(deletedBook);
			res.status(200).json(parsedBook);
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
