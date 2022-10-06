import { Book } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BookPreview } from "../components/bookPreview/BookPreview";
import { ToggleSwitch } from "../components/toggleSwitch/ToggleSwitch";
import { useBooks } from "../hooks/useBooks";

export default function Loans() {
	const { data: books, isLoading: booksLoading } = useBooks();

	if (booksLoading) return <p>Loading...</p>;

	if (!booksLoading && books === undefined) return <p>no books found</p>;

	return (
		<>
			<h2 className="pageTitle">
				{/* TODO: add Link to "Loans at a Glance" */}
				<Link href="/library">
					<a className="pr-12 text-grey">Library</a>
				</Link>
				Loans at a Glance
			</h2>
			loans
			{/* {books.map((book) => (
				<LibraryItem key={book.identifier} book={book} />
			))} */}
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
	console.log(isAvailable);
	return (
		<Link href={`/book/${book.identifier}`}>
			<div className="flex cursor-pointer justify-evenly border-b-0.75 border-grey p-5 font-montserrat text-sm font-normal   ">
				<BookPreview
					isAvailable={book.isAvailable}
					bookTitle={book.title}
					bookAuthor={book.author}
					imgSrc={book.image}
					linkHref={`/book/${book.identifier}`}
					bookSize={"listItem"}
				/>
				<div className="flex w-full flex-col justify-center">
					<p>{book.author}</p>
					<p>{book.title}</p>
				</div>
				<div className="flex gap-3">
					<FiEdit />
					<ToggleSwitch
						value={isAvailable}
						toggleHandler={() => toggleAvailablity(isAvailable)}
					></ToggleSwitch>
				</div>
			</div>
		</Link>
	);
}
