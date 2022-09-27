import { z } from "zod";
import GENRES from "../../../../enums/genres";
import LANGUAGES from "../../../../enums/languages";

// Zod Model for Updating Book
// not tested
export const putBook = z.object({
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

// Zod Model for retrievung single book
export const getBook = putBook.extend({
	// genres: z.string().refine((arg) => JSON.parse(arg)),
	// tags: z.string().refine((arg) => JSON.parse(arg)),
	identifier: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	borrowerId: z.union([z.string(), z.null()]),
});

export type PostBook = z.infer<typeof putBook>;

export type GetBook = z.infer<typeof getBook>;
