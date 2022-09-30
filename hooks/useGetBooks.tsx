import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type UseGetBooksProps = {
    category?: string;
    orderBy?: "createdAt";
    availability?: boolean;
};

export default function useGetBooks({
    category,
    orderBy,
    availability = true,
}: UseGetBooksProps) {
    return useQuery<Book[]>(["books"], () =>
        fetch(
            `http://localhost:3002/api/book?availability=${availability}&category=${category}&orderBy=${orderBy}`,
            {
                method: "GET",
            }
        ).then((res) => {
            console.log(res.body);
            return res.json();
        })
    );
}
