import { Book } from "@prisma/client";

export function fetchBook(bookId: string): Promise<Book> {
    return fetch(`http://localhost:3002/api/book/${bookId}`, {
        method: "GET",
    }).then((res) => {
        return res.json();
    });
}
