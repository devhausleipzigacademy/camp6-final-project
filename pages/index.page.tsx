// package imports
import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import "@splidejs/react-splide/css";

// local imports
import Carousel from "../components/carousel/Carousel";
import fetchBooks from "../utils/fetchBooks";
import { Book } from "@prisma/client";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import { useState } from "react";
import SubHeading2 from "../components/Subheading/Subheading";
import checkQuery from "../utils/checkQuery";

export interface SearchParams {
	query: string;
	zipCode: string;
	languages: {
		English: boolean;
		German: Boolean;
		French: boolean;
	};
}

const initialSearchParams: SearchParams = {
	query: "",
	zipCode: "",
	languages: {
		English: false,
		German: false,
		French: false,
	},
};

const Home: NextPage = (props) => {
	const [searchParams, setSearchParams] = useState(initialSearchParams);
	const genres = ["Cookbook", "Fiction"];

	const categoryData = Object.fromEntries(
		genres.map((genre) => [
			genre,
			useQuery<Book[]>(["books", genre], () =>
				fetchBooks({
					orderBy: "createdAt",
					isAvailable: true,
					genre,
				})
			),
		])
	);

	const {
		data: recentUploadsQuery,
		status: queryStatus,
		error,
	} = useQuery<Book[]>(["getBooks", "createdAt"], () =>
		fetchBooks({ orderBy: "createdAt", isAvailable: true })
	);

	checkQuery({
		queryStatus: queryStatus,
		queryItem: recentUploadsQuery,
		queryName: "book",
	});

	if (queryStatus === "loading") {
		return <p className="p-6 font-montserrat text-textGrey">Loading...</p>;
	}

	if (queryStatus === "error") {
		return (
			<div className="flex h-screen w-full flex-col items-center justify-center">
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFgCFmiB0pQYHGDklq0EZX35hq-EuOP7N8Xg&usqp=CAU" />
				<p className="font-montserrat text-textGrey">
					Something went wrong. Please try again later.
				</p>
			</div>
		);
	}

	if (recentUploadsQuery.length === 0) {
		return <p className="p-6 font-montserrat text-textGrey">No books found.</p>;
	}

	return (
		<>
			<HomeSearchBar
				searchParams={searchParams}
				setSearchParams={setSearchParams}
			/>
			<div className="pl-6">
				<section id="carousel">
					<div key="0">
						<SubHeading2>Recent Uploads</SubHeading2>

						<Carousel books={recentUploadsQuery} />
					</div>
					{Object.entries(categoryData).map(([category, query], index) => {
						checkQuery({
							queryItem: query.data,
							queryName: "books",
							queryStatus: query.status,
						});
						return (
							<div key={index + 1}>
								<SubHeading2>{category}</SubHeading2>
								<Carousel books={query.data} />
							</div>
						);
					})}
				</section>
			</div>
		</>
	);
};

export default Home;
