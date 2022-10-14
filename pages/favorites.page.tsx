// package imports
import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

// local imports
import { BookGrid } from "../components/bookGrid/BookGrid";
import checkQuery from "../utils/checkQuery";
import fetchBooks from "../utils/fetchBooks";

export default function Favorites() {
	const query = useQuery<Book[]>(["books"], () =>
		fetchBooks({
			orderBy: "title",
		})
	);

	const favoritesPageContent = (
		<>
			<h2 className="pageTitle">Favorites</h2>
			{query.isLoading ? <p>Loading...</p> : <BookGrid books={query.data} />}
		</>
	);

	const queryCheck = checkQuery({
		queryStatus: query.status,
		queryItem: query.data,
		queryName: "favorites",
		successReturn: favoritesPageContent,
	});
	return queryCheck;
}
