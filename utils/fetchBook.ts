import { Book } from "@prisma/client";

export function fetchBook(bookId: string): Promise<Book> {
    const host =
        process.env.NODE_ENV == "production"
            ? process.env.NEXT_PUBLIC_PROD_HOST
            : process.env.NEXT_PUBLIC_DEV_HOST;

    return fetch(`http://${host}/api/book/${bookId}`, {
        method: "GET",
    }).then((res) => {
        return res.json();
    });
}
