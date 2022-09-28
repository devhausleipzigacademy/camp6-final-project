import { Book } from "@prisma/client";
import { BookPreview } from "../components/bookPreview/BookPreview";
import { useBooks } from "../hooks/useBooks";

export default function Favorites() {
	const { data: books, isLoading: booksLoading } = useBooks();

	if (booksLoading) return <p>Loading...</p>;

	if (!booksLoading && books === undefined) return <p>no books not found</p>;

	return (
		<>
			<h2 className="border-b border-grey pb-4 pt-7 text-center font-arnoPro text-2xl font-bold text-dustyRose">
				Favorites
			</h2>
			<div className="grid grid-cols-2 pt-4">
				{books.map((book) => (
					<div className="w-5/12 ">
						<BookPreview
							bookTitle={book.title}
							imgSrc={book.image}
							bookAuthor={book.author}
							linkHref={`/book/${book.identifier}`}
							bookSize={"previewGrid"}
						/>
						<p className="truncate font-arnoPro text-xs font-bold text-textGrey">
							{book.author}
						</p>
						<p className="truncate font-montserrat text-xs font-normal text-textGrey">
							{book.title}
						</p>
					</div>
				))}
			</div>
		</>
	);
}
