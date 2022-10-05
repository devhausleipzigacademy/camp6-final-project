// package imports
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";

// local imports
import { Book } from "@prisma/client";
import { BookPreview } from "../components/bookPreview/BookPreview";
import fetchBooks from "../utils/fetchBooks";
import { ToggleSwitch } from "../components/toggleSwitch/ToggleSwitch";
import { useQuery } from "@tanstack/react-query";

export default function Library() {
	const { data: books, isLoading: booksLoading } = useQuery<Book[]>(
		["getBooks"],
		() => fetchBooks({})
	);
	//TODO: need to check that we can pull both available and unavailable books

	if (booksLoading) return <p>Loading...</p>;

	if (!booksLoading && books === undefined) return <p>no books found</p>;

	return (
		<>
			<h2 className="pageTitle">
				Library
				<Link href="/loans">
					<a className="pl-12 text-grey">Loans at a Glance</a>
				</Link>
			</h2>
			{books.map((book) => (
				<LibraryItem key={book.identifier} book={book} />
			))}
			{/* const library item = book listitem - authors, title - edit button, toggle
			switch overlay over book to make it unavailable
 border-b border-grey pb-4
			pt-7 text-center font-arnoPro text-2xl font-bold text-dustyRose */}
		</>
	);
}

interface LibraryItemProps {
	book: Book;
	key: string;
}

function LibraryItem({ book }: LibraryItemProps) {
	const [isAvailable, setIsAvailable] = useState<boolean>(true);

	function toggleAvailablity(availability: boolean) {
		return setIsAvailable(!availability);
	}
	return (
		<div className="flex cursor-pointer justify-evenly border-b-0.75 border-grey p-5">
			<BookPreview
				isAvailable={book.isAvailable}
				bookTitle={book.title}
				bookAuthor={book.author}
				imgSrc={book.image}
				linkHref={`/book/${book.identifier}`}
				bookSize={"listItem"}
			/>
			<Link href={`/book/${book.identifier}`}>
				<a className="ml-7 flex w-full flex-col justify-center font-montserrat text-sm font-normal text-textBlack">
					<p>{book.author}</p>
					<p>{book.title}</p>
				</a>
			</Link>
			<div className="flex items-center gap-3">
				{/* TODO: add functionality to buttons */}
				<FiEdit className="text-brown" />
				<ToggleSwitch
					value={book.isAvailable}
					toggleHandler={() => toggleAvailablity(isAvailable)}
				></ToggleSwitch>
			</div>
		</div>
	);
}
