import { Book } from "@prisma/client";
import { FiBookOpen } from "react-icons/fi";
import { BookPreview } from "../bookPreview/BookPreview";

interface BookGridProps {
	/**
	 * The books to be displayed
	 */
	books: Book[];

	/**
	 * Query indicator telling you whether books have finished loading yet
	 */
	booksLoading: boolean;
}

/**
 * Book Grid Component to use on favorites or library page. Only optimized for iphone8 screens
 */
export function BookGrid({ books, booksLoading }: BookGridProps) {
	if (booksLoading)
		return (
			<div className="flex h-screen flex-col items-center justify-center ">
				<FiBookOpen className="h-12 w-12  " />
				<p>books loading...</p>
			</div>
		);

	return (
		<div className="grid grid-cols-2 justify-items-center gap-3 px-8 pt-4">
			{books.map((book) => (
				<div>
					<BookPreview
						bookTitle={book.title}
						imgSrc={book.image}
						bookAuthor={book.author}
						linkHref={`/book/${book.identifier}`}
						bookSize={"previewGrid"}
					/>
					<p className="w-full truncate font-arnoPro text-xs font-bold text-textGrey">
						{book.author}
					</p>
					<p className="w-full truncate font-montserrat text-xs font-normal text-textGrey">
						{book.title}
					</p>
				</div>
			))}
		</div>
	);
}
