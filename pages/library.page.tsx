// import { Book } from "@prisma/client";
// import { useState } from "@storybook/addons";
// import { FiEdit } from "react-icons/fi";
// import { BookPreview } from "../components/bookPreview/BookPreview";
// import { CustomButton } from "../components/button/Button";
// import { ToggleSwitch } from "../components/toggleSwitch/ToggleSwitch";
// import { useBooks } from "../hooks/useBooks";

// export default function Library() {
// 	const { data: books, isLoading: booksLoading } = useBooks();

// 	if (booksLoading) return <p>Loading...</p>;

// 	if (!booksLoading && books === undefined) return <p>no books found</p>;

// 	return (
// 		<>
// 			<h2 className="pageTitle">
// 				{/* TODO: add Link to "Loans at a Glance" */}
// 				Library <span className="pl-12 text-grey">Loans at a Glance</span>
// 			</h2>
// 			{books.map((book) => (
// 				<LibraryItem book={book} />
// 			))}
// 			{/* const library item = book listitem - authors, title - edit button, toggle
// 			switch overlay over book to make it unavailable
//             border-b border-grey pb-4
// 			pt-7 text-center font-arnoPro text-2xl font-bold text-dustyRose */}
// 		</>
// 	);
// }

// interface LibraryItemProps {
// 	book: Book;
// }
// const [isAvailable, setIsAvailable] = useState(true)
// isAvailable
// const toggleAvailablity(availability:boolean) {
//     return
// }

// function LibraryItem({ book }: LibraryItemProps) {
// 	return (
// 		<div className="flex justify-evenly border-b-0.75 border-grey p-5 font-montserrat text-sm font-normal">
// 			<BookPreview
// 				bookTitle={book.title}
// 				bookAuthor={book.author}
// 				imgSrc={book.image}
// 				linkHref={`/book/${book.identifier}`}
// 				bookSize={"listItem"}
// 			/>
// 			<div className="flex w-full flex-col justify-center">
// 				<p>{book.author}</p>
// 				<p>{book.title}</p>
// 			</div>
// 			<div className="flex gap-3">
// 				<FiEdit />
// 				<ToggleSwitch
// 					value={isAvailable}
// 					toggleHandler={toggleAvailablity()}
// 				></ToggleSwitch>
// 			</div>
// 		</div>
// 	);
// }
