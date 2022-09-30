import { Book } from "@prisma/client";
import { BookGrid } from "../components/bookGrid/BookGrid";
import useGetBooks from "../hooks/useGetBooks";

export default function Favorites() {
	const { data: books, isLoading: booksLoading, isError } = useGetBooks({});
	console.log(books);

	if (booksLoading) return <p>Loading...</p>;

	if (!booksLoading && books === undefined) return <p>no books not found</p>;
	console.log(books);
	return (
		<>
			<h2 className="font-arnoPro border-b border-grey pb-4 pt-7 text-center text-2xl font-bold text-dustyRose">
				Favorites
			</h2>
			<BookGrid books={books} booksLoading={booksLoading} />
		</>
	);
}
