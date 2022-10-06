import {
	HomeSearchBar,
	SearchParams,
} from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import fetchBooks from "../utils/fetchBooks";
import { generateFakeBook } from "./api/book/generator";
import { createBook } from "./api/book/interaction";
import genres from "../enums/genres";
import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState, SetStateAction } from "react";
import { BookGrid } from "../components/bookGrid/BookGrid";
import clsx from "clsx";

export default function Favorites(props) {
	const [selectedGenres, setSelectedGenres] = useState("Actions");
	const query = useQuery<Book[]>(["getBooks"], () => fetchBooks({}));
	const fakeBooks: ReturnType<typeof generateFakeBook>[] = [];
	const book = async () => {
		for (let index = 0; index < 100; index++) {
			const book = generateFakeBook();
			fakeBooks.push(book);
		}
		return fakeBooks;
	};
	book();
	console.log(fakeBooks);

	const filteredBooks = fakeBooks.filter((book, idx) => {
		const { genres } = book;
		return genres.includes(selectedGenres);
	});

	console.log("furkan", filteredBooks);

	function genrePick(genres: string, event) {
		event.preventDefault();
		setSelectedGenres(genres);
	}

	return (
		<div className="flex flex-col gap-0">
			<HomeSearchBar
				searchParams={undefined}
				setSearchParams={function (value: SetStateAction<SearchParams>): void {
					throw new Error("Function not implemented.");
				}}
			/>
			<div className="-mt-5 flex flex-col justify-center  gap-0">
				<p className="mx-10 -mb-2 font-arno text-3xl">Books In Your Area</p>
				<div className="flex  gap-4 overflow-x-scroll px-4 text-grey">
					<p className="self-center font-bold text-black underline decoration-yellow">
						All
					</p>
					{genres.map((genres, x) => (
						<button
							onClick={() => setSelectedGenres(genres)}
							className={clsx(
								genres === selectedGenres ? "font-bold text-black" : "",
								"w-fit px-4 outline-none "
							)}
						>
							{genres}
						</button>
					))}
				</div>
			</div>

			{query.isLoading ? (
				<p>Loading...</p>
			) : (
				<BookGrid books={filteredBooks as Array<Book>} />
			)}
		</div>
	);
}
