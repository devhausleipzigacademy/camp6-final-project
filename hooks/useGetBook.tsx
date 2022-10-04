import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useGetBook(bookId: string) {
    return useQuery<Book>([bookId], () =>
        fetch(`http://localhost:3002/api/book/${bookId}`, {
            method: "GET",
        }).then((res) => {
            console.log(res.body);
            return res.json();
        })
    );
}
