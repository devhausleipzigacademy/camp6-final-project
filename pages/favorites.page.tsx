import { BookGrid } from "../components/bookGrid/BookGrid";
import { useBooks } from "../hooks/useBooks";

export default function Favorites() {
	const { data: books, isLoading: booksLoading } = useBooks();

	if (booksLoading) return <p>Loading...</p>;

	if (!booksLoading && books === undefined) return <p>no books not found</p>;
	console.log(books);
	return (
		<>
			<h2 className="border-b border-grey pb-4 pt-7 text-center font-arnoPro text-2xl font-bold text-dustyRose">
				Favorites
			</h2>
			<BookGrid books={books} booksLoading={booksLoading} />
		</>
	);
}
