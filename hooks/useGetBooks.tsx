import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type UseGetBooksProps = {
    category?: string;
    orderBy?: "createdAt";
};

export default function useGetBooks({ category, orderBy }: UseGetBooksProps) {
    return useQuery<Book[]>(["books"], () =>
        fetch(
            `http://localhost:3002/api/book?category=${category}&orderBy=${orderBy}`,
            {
                method: "GET",
            }
        ).then((res) => {
            console.log(res.body);
            return res.json();
        })
    );
}
