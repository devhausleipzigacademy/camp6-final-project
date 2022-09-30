import { prisma } from "../../../prisma/db";

export async function createBook(data) {
	const bookModel = await prisma.book.create({
		data: {
			...data,
		},
	});

	return bookModel;
}

export async function retrieveBooks() {
	const bookModels = await prisma.book.findMany();
	return bookModels;
}
