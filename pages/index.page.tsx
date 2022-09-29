import { generateFakeBook } from "./api/book/generator";
import { LanguageSearchBar } from "../components/SearchBars/LanguageSearchBar";

import type { NextPage } from "next";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import Header from "../components/Header/Header";
import { Settings } from "../components/Settings/Settings";
import Head from "next/head";

const Home: NextPage = (props) => {
	return (
		<>
			{/* <PlaceHolder /> */}

			{/* <LanguageSearchBar /> */}

			<p className="font-arno font-extrabold ">book share</p>
			<p className="font-arnobold font-extrabold  ">book share</p>
			<p className="font-montserrat font-normal  ">book share</p>
			<p className="font-sora font-normal  ">book share</p>
		</>
	);
};

export default Home;
