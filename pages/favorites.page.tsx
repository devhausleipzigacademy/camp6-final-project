import { Book } from "@prisma/client";
import { useBooks } from "../hooks/useBooks";

interface gef {
    key1: string, 
    key2: Book
}

export default function Favorites() {
	const { data: books, isLoading: booksLoading } = useBooks();
	console.log(books);

	const gridItem = <>{/*  map over books  */}</>;

	return (
		<>
			<h2 className="border-b border-grey pb-4 pt-7 text-center font-arnoPro text-2xl font-bold text-dustyRose">
				Favorites
			</h2>
			<div className="grid-cols-2 "></div>
		</>
	);
}
