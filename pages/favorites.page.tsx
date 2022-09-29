import { BookGrid } from "../components/bookGrid/BookGrid";
import { useBooks } from "../hooks/useBooks";

export default function Favorites() {
	const { data: books, isLoading: booksLoading } = useBooks();

	if (booksLoading) return <p>Loading...</p>;

	if (!booksLoading && books === undefined) return <p>no books found</p>;

	return (
		<>
			<h2 className="pageTitle">Favorites</h2>
			<BookGrid books={books} booksLoading={booksLoading} />
		</>
	);
}
