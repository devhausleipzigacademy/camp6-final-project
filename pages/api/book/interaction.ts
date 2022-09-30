import { prisma } from "../../../prisma/db";
import { PutBook } from "./model.zod";

export async function createBook(data) {
	const bookModel = await prisma.book.create({
		data: {
			...data,
		},
	});

	return bookModel;
}

// clauses can be availability or genres, ordering only works for newest books
export async function retrieveBooks(clauses, order) {
	const bookModels = await prisma.book.findMany({
		where: {
			AND: clauses,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return bookModels;
}

export async function retrieveBook(bookId) {
	const bookModel = await prisma.book.findFirstOrThrow({
		where: { identifier: bookId },
	});
	return bookModel;
}

export async function updateBook(bookId: string, data: PutBook) {
	const updatedBook = await prisma.book.update({
		where: {
			identifier: bookId,
		},
		data: { ...data },
	});
	return updatedBook;
}

export async function deleteBook(bookId) {
	const deletedBook = await prisma.book.delete({
		where: {
			identifier: bookId,
		},
	});
	return deletedBook;
}
