import InputForm from "../components/InputForm/InputForm";

import type { NextPage } from "next";
import Header from "../components/header";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
const Home: NextPage = (props) => {
	return (
		<>
			{/* <PlaceHolder /> */}
			<Header />
			<HomeSearchBar />

			<InputForm />
			{/* <LanguageSearchBar /> */}
		</>
	);
};

export default Home;
