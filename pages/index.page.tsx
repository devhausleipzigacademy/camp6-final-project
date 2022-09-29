import InputForm from "../components/InputForm/InputForm";
import { generateBook } from "./api/book/generator";
import { LanguageSearchBar } from "../components/SearchBars/LanguageSearchBar";

import type { NextPage } from "next";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
const Home: NextPage = (props) => {
	return (
		<>
			<p className="font-extrabold">book share</p>
		</>
	);
};

export default Home;
