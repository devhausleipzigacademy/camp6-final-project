import "@splidejs/react-splide/css";
import type { NextPage } from "next";
import SubHeading2 from "../components/Subheading/Subheading";
import Carousel from "../components/carousel/Carousel";
import fetchBooks from "../utils/fetchBooks";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@prisma/client";
import { orderBy } from "lodash";
import {
	HomeSearchBar,
	SearchParams,
} from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import { useEffect, useState } from "react";

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
	const categories = ["Cookbooks", "Fantasy"];

	return (
		<>
			<HomeSearchBar
				// onSubmit={() => {}}
				searchParams={searchParams}
				setSearchParams={setSearchParams}
			/>
		</>
	);
};

export default Home;
