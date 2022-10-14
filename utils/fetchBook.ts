import { Book } from "@prisma/client";

const host =
  process.env.NODE_ENV == "production"
    ? process.env.NEXT_PUBLIC_PROD_HOST
    : process.env.NEXT_PUBLIC_DEV_HOST;

export default function fetchBook(bookId: string): Promise<Book> {
  return fetch(`http://${host}/api/book/${bookId}`, {
    method: "GET",
  }).then((res) => {
    if (!res.ok) throw Error;
    return res.json();
  });
}
