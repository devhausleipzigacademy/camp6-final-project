import { prisma } from "../../../prisma/db";

export async function createUser(data) {
	const user = await prisma.user.create({
		data: {
			...data,
		},
	});
	return user;
}
