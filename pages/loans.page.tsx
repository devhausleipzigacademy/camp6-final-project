// package imports
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// local imports
import { Book, User } from "@prisma/client";
import { BookPreview } from "../components/bookPreview/BookPreview";
import fetchBooks from "../utils/fetchBooks";
import { useUpdateBook } from "../utils/fetchBook";
import { CustomButton } from "../components/button/Button";
import { FaTelegram } from "react-icons/fa";
import { fetchUser } from "../utils/fetchUser";
import { checkPreferredLanguage } from "../utils/checkPreferredLanguage";

export default function Loans() {
	const { data: books, isLoading: booksLoading } = useQuery<Book[]>(
		["books"],
		() => fetchBooks({ borrowed: true })
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
	const { mutate: updateBook } = useUpdateBook(book.identifier);
	const { data: borrower, isLoading: borrowerIsLoading } = useQuery<User>(
		["users"],
		() => fetchUser(book.borrowerId)
	);

	if (borrowerIsLoading) return <p>Loading...</p>;

	if (!borrowerIsLoading && borrower === undefined)
		return <p>no borrowed book found</p>;

	const [year, month, rest] = book.borrowDate.toString().split("-");
	const [day, time] = rest.split("T");

	// const preferredLanguage = checkPreferredLanguage()
	let date = `${day}/${month}/${year}`;

	// if (preferredLanguage == 'English') date =
	// if (preferredLanguage == 'German')
	// if (preferredLanguage == 'unkown')

	function clickhandler() {
		return;
	}

	return (
		<div className="flex cursor-pointer  justify-evenly border-b-0.75 border-grey p-5">
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
					<a className="flex w-full flex-col justify-center font-montserrat text-sm font-normal text-textBlack">
						<p>{book.author}</p>
						<p>{book.title}</p>
					</a>
				</Link>
				<p className=" py-2  font-arno text-2xs font-semibold text-textGrey">
					{borrower.name} has borrowed this on {date}
				</p>
				<div className="flex gap-2">
					<CustomButton
						functionality={"LibraryMessage"}
						onClick={() => {
							// TODO: add functionality to messenger button
							clickhandler();
						}}
					>
						<FaTelegram /> Send message
					</CustomButton>
					<CustomButton
						functionality={"LibraryReturned"}
						onClick={() => updateBook({ borrowerId: null, borrowDate: null })}
					></CustomButton>
				</div>
			</div>
		</div>
	);
}
