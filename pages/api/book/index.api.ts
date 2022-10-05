// package imports
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

// local imports
import { postBook, getBook, GetBook } from "./model.zod";
import { createBook, retrieveBooks } from "./interaction";
import { Prisma } from "@prisma/client";

export type ErrorResponse = {
	message: string;
	error?: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GetBook[] | { identifier: string } | ErrorResponse>
) {
	try {
		if (req.method === "GET") {
			// Search parameters (we could add more, e.g. orderBy)
			const { availability, title, author, language, genres } =
				req.query as Record<string, string>;

			const clauses: Array<Prisma.BookWhereInput> = [];

			if (availability !== undefined) {
				clauses.push({
					isAvailable:
						availability == "true"
							? true
							: availability == "false"
							? false
							: undefined,
				});
			}

			if (title !== undefined) {
				clauses.push({
					title: { contains: title, mode: "insensitive" },
				});
			}

			if (author !== undefined) {
				clauses.push({
					author: { contains: author, mode: "insensitive" },
				});
			}

			if (language !== undefined) {
				clauses.push({
					language: { contains: language, mode: "insensitive" },
				});
			}

			if (genres !== undefined) {
				clauses.push({ genres: { array_contains: genres } });
			}

			const books = await retrieveBooks(clauses);
			const parsedBooks = books.map((book) => getBook.parse(book));

			res.status(200).json(parsedBooks);
		}
		if (req.method === "POST") {
			const data = postBook.parse(req.body);
			const book = await createBook(data);

			res.status(201).json({ identifier: book.identifier });
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
