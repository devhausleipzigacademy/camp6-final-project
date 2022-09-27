import { prisma } from "../../../../prisma/db";

export async function retrieveBook(bookId) {
	const bookModel = await prisma.book.findFirstOrThrow({
		where: { identifier: bookId },
	});
	return bookModel;
}

export async function updateBook(bookId, data) {
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
