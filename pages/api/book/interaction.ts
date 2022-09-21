import { prisma } from "../../../prisma/db";

export async function createBook(data) {
    const bookModel = await prisma.book.create({
        // fix problem with data and also check what we do with the ownerId here
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
