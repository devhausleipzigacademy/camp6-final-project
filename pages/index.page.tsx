import InputForm from "./InputForm.page";

import type { NextPage } from "next";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import Header from "../components/Header/Header";
import { Settings } from "../components/Settings/Settings";
import Head from "next/head";
const Home: NextPage = (props) => {
	return (
		<>
			<Header />
			<HomeSearchBar />
		</>
	);
};

export default Home;
