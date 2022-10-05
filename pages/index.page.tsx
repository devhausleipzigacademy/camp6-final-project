// package imports
import type { NextPage } from "next";
import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import "@splidejs/react-splide/css";

// local imports
import Carousel from "../components/carousel/Carousel";
import fetchBooks from "../utils/fetchBooks";
import SubHeading2 from "../components/Subheading/Subheading";

const Home: NextPage = (props) => {
	const genres = ["Cookbooks", "Fantasy"];

	const categoryData = Object.fromEntries(
		genres.map((genre) => [
			genre,
			useQuery<Book[]>(["books", genre], () =>
				fetchBooks({ availability: true, genre })
			),
		])
	);

	const recentUploadsQuery = useQuery<Book[]>(["books", "createdAt"], () =>
		fetchBooks({ availability: true })
	);

	return (
		<>
			{/* <Header /> */}

			<div className="pl-6">
				<h1>Home</h1>
				{/* <HomeSearchBar /> */}

				<section id="carousel">
					<div key="0">
						<SubHeading2>Recent Uploads</SubHeading2>
						{recentUploadsQuery.isLoading ? (
							<p>Loading...</p>
						) : (
							<Carousel books={recentUploadsQuery.data} />
						)}
					</div>
					{Object.entries(categoryData).map(([category, query], index) => {
						return (
							<div key={index + 1}>
								<SubHeading2>{category}</SubHeading2>
								{query.isLoading ? (
									<p>Loading...</p>
								) : (
									<Carousel books={query.data} />
								)}
							</div>
						);
					})}
				</section>
			</div>
		</>
	);
};

export default Home;
