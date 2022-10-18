import { Book } from "@prisma/client";
import Link from "next/link";
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
  return (
    <div className="grid grid-cols-1 gap-3 px-8 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <Link href={`/book/${book.identifier}`} key={book.identifier}>
          <a className="flex flex-col items-center text-center">
            <BookPreview book={book} bookSize={"previewGrid"} isFaved={false} />
            <p className="w-full truncate font-arno text-xs font-bold text-textGrey">
              {book.author}
            </p>
            <p className="w-full truncate font-montserrat text-xs font-normal text-textGrey">
              {book.title}
            </p>
          </a>
        </Link>
      ))}
    </div>
  );
}
