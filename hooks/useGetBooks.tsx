import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type UseGetBooksProps = {
	category?: string;
	orderBy?: "createdAt";
};

export default function useGetBooks({ category, orderBy }: UseGetBooksProps) {
	return useQuery<Book[]>(["books"], () =>
		fetch(
			`http://localhost:3000/api/book?category=${category}&orderBy=${orderBy}`,
			{
				method: "GET",
			}
		).then((res) => {
			return res.json();
		})
	);
}
