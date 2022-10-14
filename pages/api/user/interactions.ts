import { prisma } from "../../../prisma/db";

export async function createUser(data) {
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
}
