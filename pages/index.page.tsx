import InputForm from "../components/InputForm/InputForm";

import type { NextPage } from "next";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import Header from "../components/Header/Header";
import { Settings } from "../components/Settings/Settings";
const Home: NextPage = (props) => {
	return (
		<>
			<Header />
			<Settings />
		</>
	);
};

export default Home;
