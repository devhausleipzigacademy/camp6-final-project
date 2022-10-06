import { User } from "@prisma/client";

const host =
	process.env.NODE_ENV == "production"
		? process.env.NEXT_PUBLIC_PROD_HOST
		: process.env.NEXT_PUBLIC_DEV_HOST;

export function fetchUser(userId: string): Promise<User> {
	return fetch(`http://${host}/api/user/${userId}`, {
		method: "GET",
	}).then((res) => {
		return res.json();
	});
}
