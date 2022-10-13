// package imports
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";

// local imports
import { Book } from "@prisma/client";
import { searchBooks } from "../../utils/fetchBooks";
import { BookGrid } from "../../components/bookGrid/BookGrid";
import checkQuery from "../../utils/checkQuery";
import { useEffect } from "react";

export async function getStaticProps({ params }) {
	const { searchParams } = params;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		["books", "search"],
		() => searchBooks(searchParams),
		{
			staleTime: 360000,
		}
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking",
	};
}

export default function SearchResults() {
	const router = useRouter();
	const { searchParams } = router.query;

	let query = Array.isArray(searchParams)
		? searchParams.join(" ")
		: searchParams;

	const { data: searchResults, status: searchStatus } = useQuery<Book[]>(
		["books", "search"],
		() => searchBooks(query)
	);

	console.log(searchResults, searchStatus);

	const searchPage = (
		<>
			<div className="sticky -top-4 z-10 border-b-0.75 border-grey bg-white pb-4">
				<button onClick={() => router.back()}>
					<VscChromeClose className="absolute mt-1 ml-7 h-6 w-6 stroke-0 text-textGrey" />
				</button>

				<h2 className="text-center font-arno text-2xl font-semibold text-dustyRose">
					Search Results
				</h2>
			</div>

			<BookGrid books={searchResults} />
		</>
	);

	const queryCheck = checkQuery({
		queryStatus: searchStatus,
		queryItem: searchResults,
		queryName: "search results",
		successReturn: searchPage,
	});
	return queryCheck;
}
