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
import { ALL } from "dns";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";

export default function Favorites(props) {
	const [selectedGenres, setSelectedGenres] = useState("All");
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

	const topTenGenres = genres.slice(0, 10).sort();
	const filteredBooks = fakeBooks.filter((book, idx) => {
		const { genres } = book;
		return genres.includes(selectedGenres);
	});

	function genrePick(genres: string, event) {
		event.preventDefault();
		setSelectedGenres(genres);
	}

	return (
		<>
			<div className="flex flex-col gap-0">
				<HomeSearchBar
					searchParams={undefined}
					setSearchParams={function (value: SetStateAction<SearchParams>): void {
						throw new Error("Function not implemented.");
					}}
					placeHodlerText={undefined}
				/>
				<div className="-mt-5 flex flex-col justify-center  gap-0">
					<p className="mx-8 -mb-2 font-arnobold text-3xl">Books In Your Area</p>
					<div className="flex gap-2 overflow-x-scroll px-4 font-arnobold text-base text-grey">
						<button
							onClick={() => setSelectedGenres("All")}
							className={clsx(
								selectedGenres === "All"
									? "font-arnobold  text-black underline decoration-yellow decoration-2 underline-offset-2"
									: "",
								"w-fit px-4   outline-none "
							)}
						>
							All
						</button>
						{topTenGenres.map((genres, x) => (
							<button onClick={() => setSelectedGenres(genres)}>
								<p
									className={clsx(
										genres === selectedGenres
											? "my-2 inline-block whitespace-nowrap font-arnobold text-black underline decoration-yellow  decoration-2 underline-offset-2"
											: "",
										"my-2 inline-block whitespace-nowrap font-arnobold ",
										"w-fit px-4   outline-none "
									)}
								>
									{genres}
								</p>
							</button>
						))}
					</div>
					{query.isLoading ? (
						<p>Loading...</p>
					) : (
						<BookGrid books={filteredBooks as Array<Book>} />
					)}
				</div>
			</div>
		</>
	);
}

// {selectedGenres === "All" ? (
// 	query.isLoading ? (
// 		<p>Loading...</p>
// 	) : (
// 		<BookGrid books={fakeBooks as Array<Book>} />
// 	)
// ) : query.isLoading ? (
// 	<p>Loading...</p>
// ) : (
// 	<BookGrid books={filteredBooks as Array<Book>} />
// )}
