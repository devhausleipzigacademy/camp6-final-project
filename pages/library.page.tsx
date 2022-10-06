// package imports
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";

// local imports
import { Book } from "@prisma/client";
import { BookPreview } from "../components/bookPreview/BookPreview";
import fetchBooks, { useUpdateBook } from "../utils/fetchBooks";
import { ToggleSwitch } from "../components/toggleSwitch/ToggleSwitch";
import { CustomButton } from "../components/button/Button";

export default function Library() {
	const { data: books, isLoading: booksLoading } = useQuery<Book[]>(
		["books"],
		() => fetchBooks({})
	);

	function addBookhandler() {
		return;
	}

	if (booksLoading) return <p>Loading...</p>;

	if (!booksLoading && books === undefined) return <p>no books found</p>;

	return (
		<>
			{/* TODO: add functionality to addButton */}
			{/* <div className="fixed right-0 z-20 mt-[87vh] pr-5">
				<CustomButton
					functionality={"AddBook"}
					onClick={() => {
						addBookhandler();
					}}
				></CustomButton>
			</div> */}

			<h2 className="pageTitle">
				Library
				<Link href="/loans">
					<a className="pl-12 text-grey">Loans at a Glance</a>
				</Link>
			</h2>
			{books.map((book) => (
				<LibraryItem key={book.identifier} book={book} />
			))}
		</>
	);
}

interface LibraryItemProps {
	book: Book;
}

function LibraryItem({ book }: LibraryItemProps) {
	const { mutate } = useUpdateBook(book.identifier);

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
				{/* TODO: add functionality to Edit Button */}
				{/* <FiEdit className="text-brown" /> */}

				<ToggleSwitch
					value={book.isAvailable}
					toggleHandler={() => mutate({ isAvailable: !book.isAvailable })}
				></ToggleSwitch>
			</div>
		</div>
	);
}
