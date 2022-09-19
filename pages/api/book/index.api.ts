import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import * as languagesJSON from "../../../languages/ISO-languages.json";
import { z, ZodError } from "zod";

export const LANGUAGES = [
	...Object.keys(languagesJSON),
] as unknown as readonly [string, ...string[]];

export const GENRES = [
	"Fantasy",
	"Adventure",
	"Romance",
	"Contemporary",
	"Dystopian",
	"Mystery",
	"Horror",
	"Thriller",
	"Paranormal",
	"Historical fiction",
	"Science Fiction",
	"Children\u2019s",
	"Memoir",
	"Cookbook",
	"Art",
	"Self-help",
	"Development",
	"Motivational",
	"Health",
	"History",
	"Travel",
	"Guide / How-to",
	"Families & Relationships",
	"Humor",
] as const;

// Zod Model for Posting Book
const postBook = z.object({
	title: z.string(),
	author: z.string(),
	language: z.enum(LANGUAGES),
	ownerId: z.string(),
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

const getBook = postBook.extend({
	genres: z.string().refine((arg) => JSON.parse(arg)),
	tags: z.string().refine((arg) => JSON.parse(arg)),
	identifier: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	borrowerId: z.string(),
});

type PostBook = z.infer<typeof postBook>;

type GetBook = z.infer<typeof getBook>;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		GetBook[] | { id: string } | { message: string; error: any }
	>
) {
	try {
		if (req.method === "GET") {
			// space to add search filters at some later stage in time

			const books = await prisma.book.findMany();
			const parsedBooks = books.map((book) => getBook.parse(book));

			res.status(200).json(parsedBooks);
		}
		if (req.method === "POST") {
			const data = postBook.parse(req.body);

			const book = await prisma.book.create({
				// fix problem with data and also check what we do with the ownerId here
				data: {
					...data,
				},
			});

			res.status(201).json({ id: book.identifier });
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
