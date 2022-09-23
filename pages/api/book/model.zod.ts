import { z } from "zod";
import GENRES from "../../../enums/genres";
import LANGUAGES from "../../../enums/languages";

// Zod Model for Posting Book
export const postBook = z.object({
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

export const getBook = postBook.extend({
	genres: z.string().refine((arg) => JSON.parse(arg)),
	tags: z.string().refine((arg) => JSON.parse(arg)),
	identifier: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	borrowerId: z.string(),
});

export type PostBook = z.infer<typeof postBook>;

export type GetBook = z.infer<typeof getBook>;
