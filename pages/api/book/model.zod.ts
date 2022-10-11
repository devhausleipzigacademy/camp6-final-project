import { z } from "zod";
import GENRES from "../../../enums/genres";
import LANGUAGES from "../../../enums/languages";

// Zod Model for updating books
export const putBook = z.object({
	title: z.string().optional(),
	author: z.string().optional(),
	language: z.enum(LANGUAGES).optional(),
	image: z.string().optional(),
	description: z.string().optional(),
	isbn: z.string().optional(),
	publishYear: z.date().optional(),
	borrowerId: z.string().optional(),
	borrowDate: z.date().optional(),
	genres: z
		.enum(GENRES)
		.array()
		.refine((arg) => JSON.stringify(arg))
		.optional(),
	tags: z
		.string()
		.array()
		.refine((arg) => JSON.stringify(arg))
		.optional(),
	isAvailable: z.boolean().optional(),
	isReserved: z.boolean().optional(),
});

// Zod Model for Posting Book
export const postBook = putBook.extend({
	title: z.string(),
	author: z.string(),
	language: z.enum(LANGUAGES),
	ownerId: z.string(),
});

export const getBook = postBook.extend({
	identifier: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),

	// optional values are returned as null from prisma hence getBook model needs to account for that
	borrowerId: z.union([z.string(), z.null()]),
	image: z.union([z.string(), z.null()]),
	description: z.union([z.string(), z.null()]),
	isbn: z.union([z.string(), z.null()]),
	publishYear: z.union([z.date(), z.null()]),
	borrowDate: z.union([z.date(), z.null()]),
});

export type PutBook = z.infer<typeof putBook>;

export type PostBook = z.infer<typeof postBook>;

export type GetBook = z.infer<typeof getBook>;
