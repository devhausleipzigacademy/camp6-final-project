import { prisma } from "../../../prisma/db";

export async function createUser(data) {
	const user = await prisma.user.create({
		data: {
			...data,
		},
	});
	return user;
}

// export async function getUsers(data) {
// 	const userId = req.query.userId as string;
// 	const singleUser = await prisma.user.findFirst({
// 		where: {
// 			identifier: data.id,
// 		},
// 	});
// }
