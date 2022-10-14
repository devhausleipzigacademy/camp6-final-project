import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useBooks() {
	return useQuery<Book[]>(["books"], () =>
		fetch("http://localhost:3000/api/book", { method: "GET" }).then((res) =>
			res.json()
		)
	);
}
