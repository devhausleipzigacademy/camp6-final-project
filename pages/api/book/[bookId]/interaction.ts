import { prisma } from "../../../../prisma/db";
import { PutBook } from "../model.zod";

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
