// package imports
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// local imports
import { Book } from "@prisma/client";
import { BookPreview } from "../components/bookPreview/BookPreview";
import fetchBooks, { useUpdateBook } from "../utils/fetchBooks";
import { ToggleSwitch } from "../components/toggleSwitch/ToggleSwitch";
import { CustomButton } from "../components/button/Button";
import { FaTelegram } from "react-icons/fa";

export default function Loans() {
	const { data: books, isLoading: booksLoading } = useQuery<Book[]>(
		["books"],
		() => fetchBooks({})
	);

	if (booksLoading) return <p>Loading...</p>;

	if (!booksLoading && books === undefined) return <p>no books found</p>;

	return (
		<>
			<h2 className="pageTitle">
				<Link href="/library">
					<a className="pr-12 text-grey">Library</a>
				</Link>
				Loans at a Glance
			</h2>

			{books.map((book) => (
				<LoanItem key={book.identifier} book={book} />
			))}
		</>
	);
}
interface LoanItemProps {
	book: Book;
}

function LoanItem({ book }: LoanItemProps) {
	const { mutate } = useUpdateBook(book.identifier);

	function clickhandler() {
		return;
	}

	return (
		<div className="h-justify-evenly flex  cursor-pointer border-b-0.75 border-grey p-5">
			<BookPreview
				isAvailable={book.isAvailable}
				bookTitle={book.title}
				bookAuthor={book.author}
				imgSrc={book.image}
				linkHref={`/book/${book.identifier}`}
				bookSize={"listItemBig"}
			/>
			<div className="flex flex-col">
				<Link href={`/book/${book.identifier}`}>
					<a className="ml-7 flex w-full flex-col justify-center font-montserrat text-sm font-normal text-textBlack">
						<p>{book.author}</p>
						<p>{book.title}</p>
					</a>
				</Link>
				<p className="font-arno text-2xs text-textGrey  ">
					Put your borrow message here
				</p>
				<div className="flex">
					<CustomButton
						functionality={"LibraryMessage"}
						onClick={() => {
							clickhandler();
						}}
					>
						<FaTelegram /> Send message
					</CustomButton>
					<CustomButton
						functionality={"LibraryReturned"}
						onClick={() => {
							clickhandler();
						}}
					></CustomButton>
				</div>
			</div>

			{/* <div className="flex items-center gap-3">
				<FiEdit className="text-brown" />
				<ToggleSwitch
					value={book.isAvailable}
					toggleHandler={() => mutate({ isAvailable: !book.isAvailable })}
				></ToggleSwitch>
			</div> */}
		</div>
	);
}
