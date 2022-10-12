import { User, Book } from "@prisma/client";

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

export function fetchLikedBooks(userId: string): Promise<Book[]> {
  console.log(userId);
  return fetch(`http://${host}/api/user/${userId}/likes`, {
    method: "GET",
  }).then((res) => {
    if (!res.ok) throw Error;

    return res.json();
  });
}
