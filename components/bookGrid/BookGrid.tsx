import { Book } from "@prisma/client";
import { BookPreview } from "../bookPreview/BookPreview";

interface BookGridProps {
	/**
	 * The books to be displayed
	 */
	books: Book[];
}

/**
 * Book Grid Component to use on favorites or library page. Only optimized for iphone8 screens
 */
export function BookGrid({ books }: BookGridProps) {
	if (!books || books.length === 0) {
		return (
			<div className="flex items-center justify-center">
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFgCFmiB0pQYHGDklq0EZX35hq-EuOP7N8Xg&usqp=CAU" />
			</div>
		);
	} else
		return (
			<div className="grid grid-cols-1 justify-items-center gap-3 px-8 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
				{books.map((book) => (
					<div key={book.identifier}>
						<BookPreview
							isAvailable={book.isAvailable}
							bookTitle={book.title}
							imgSrc={book.image}
							bookAuthor={book.author}
							linkHref={`/book/${book.identifier}`}
							bookSize={"previewGrid"}
						/>
						<p className="w-full truncate font-arno text-xs font-bold uppercase text-textGrey">
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
