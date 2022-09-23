import InputForm from "../components/InputForm/InputForm";

import type { NextPage } from "next";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import Header from "../components/Header/Header";
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
