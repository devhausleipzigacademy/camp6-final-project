// package imports
import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

// local imports
import { BookGrid } from "../components/bookGrid/BookGrid";
import fetchBooks from "../utils/fetchBooks";

export default function Favorites() {
	const query = useQuery<Book[]>(["books"], () => fetchBooks({}));

	return (
		<>
			<h2 className="pageTitle">Favorites</h2>
			{query.isLoading ? <p>Loading...</p> : <BookGrid books={query.data} />}
		</>
	);
}
