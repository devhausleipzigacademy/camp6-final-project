import InputForm from "../components/InputForm/InputForm";
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
			<HomeSearchBar />

			<InputForm />
			{/* <LanguageSearchBar /> */}
  
      <p className="font-extrabold">book share</p>
		</>
	);
};

export default Home;
