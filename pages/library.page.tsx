// package imports
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// local imports
import { Book, User } from "@prisma/client";
import { BookPreview } from "../components/bookPreview/BookPreview";
import fetchBooks from "../utils/fetchBooks";
import { ToggleSwitch } from "../components/toggleSwitch/ToggleSwitch";
import { CustomButton } from "../components/button/Button";
import { updateBook } from "../utils/updateBook";
import checkQuery from "../utils/checkQuery";
import { FiEdit } from "react-icons/fi";
import router from "next/router";
import { useState, useEffect } from "react";
import { fetchUser } from "../utils/fetchUser";

export default function Library() {
	const { data: books, status: booksStatus } = useQuery<Book[]>(["books"], () =>
		fetchBooks({ orderBy: "title" })
	);

	if (booksStatus === "loading")
		return (
			<p className="mt-10 flex justify-center font-montserrat text-base text-textGrey">
				Loading...
			</p>
		);

	if (booksStatus === "error")
		return (
			<div className="flex h-screen w-full flex-col items-center justify-center">
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFgCFmiB0pQYHGDklq0EZX35hq-EuOP7N8Xg&usqp=CAU" />
				<p className="mt-10 flex justify-center font-montserrat text-base text-textGrey">
					Something went wrong. Please try again later.
				</p>
			</div>
		);

	if (books === undefined)
		return (
			<p className="mt-10 flex justify-center font-montserrat text-base text-textGrey">
				Something went wrong. Please try again later.
			</p>
		);

	if (books.length === 0)
		return (
			<div className="mb-16 ">
				<div className="fixed top-[88vh] right-4 z-10">
					<CustomButton
						functionality={"AddBook"}
						onClick={() => router.push("/addbook/")}
					></CustomButton>
				</div>
				<h2 className="pageTitle">
					Library
					<Link href="/loans">
						<a className="pl-12 text-grey">Loans at a Glance</a>
					</Link>
				</h2>
				<p className="mt-10 flex justify-center font-montserrat text-base text-textGrey">
					No books found.
				</p>
			</div>
		);

	return (
		<div className="mb-16 ">
			<div className="fixed top-[88vh] right-4 z-10">
				<CustomButton
					functionality={"AddBook"}
					onClick={() => router.push("/addbook/")}
				></CustomButton>
			</div>
			<h2 className="pageTitle">
				Library
				<Link href="/loans">
					<a className="pl-12 text-grey">Loans at a Glance</a>
				</Link>
			</h2>
			{books.map((book) => (
				<LibraryItem key={book.identifier} book={book} />
			))}
		</div>
	);
}
interface LibraryItemProps {
	key: string;
	book: Book;
}

function LibraryItem({ book }: LibraryItemProps) {
	const queryClient = useQueryClient();

	const mutation = useMutation(updateBook, {
		onSuccess: () => {
			queryClient.invalidateQueries(["books"]);
		},
	});

	const bookUrl = book.title.replaceAll(" ", "-");

	return (
		<div className="flex cursor-pointer justify-evenly border-b-0.75 border-grey p-5">
			<BookPreview
				// TODO: fix isFaved input
				isFaved={false}
				isAvailable={book.isAvailable}
				bookTitle={book.title}
				bookAuthor={book.author}
				imgSrc={book.image}
				linkHref={`/book/${book.identifier}`}
				bookSize={"listItemSmall"}
			/>
			<Link href={`/book/${book.identifier}`}>
				<a className="ml-7 flex w-full flex-col justify-center font-montserrat text-sm font-normal text-textBlack">
					<p>{book.author}</p>
					<p>{book.title}</p>
				</a>
			</Link>
			<div className="flex items-center gap-3">
				<button onClick={() => router.push(`/book/${book.identifier}/edit`)}>
					<FiEdit className="text-brown" />
				</button>

				<ToggleSwitch
					value={book.isAvailable}
					toggleHandler={() =>
						mutation.mutate({
							bookId: book.identifier,
							book: { isAvailable: !book.isAvailable },
						})
					}
				></ToggleSwitch>
			</div>
		</div>
	);
}
