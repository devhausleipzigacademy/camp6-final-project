import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// check if books in general query are liked by a specific user
prisma.book.findMany({
	where: {
		title: {
			contains: "example"
		}
	},
	select: {
		likedBy: {
			where: {
				identifier: userId
			}
		}
	}
});

// disconnect liked book
prisma.user.update({
	where: {
        identifier: userId;
    },
	data: {
        likedBooks: { disconnect: { identifier: bookId}}}
});

// connect liked book
prisma.user.update({
	where: {
        identifier: userId;
    },
	data: {
        likedBooks: { connect: { identifier: bookId}}}
});
