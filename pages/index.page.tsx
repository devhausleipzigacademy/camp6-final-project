import InputForm from "./InputForm.page";

import type { NextPage } from "next";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import Header from "../components/Header/Header";
import { Settings } from "../components/Settings/Settings";
import Head from "next/head";
import { BookPreview } from "../components/bookPreview/BookPreview";
const Home: NextPage = (props) => {
	return (
		<>
			{/* <Header />
			<HomeSearchBar /> */}
			<p>home page</p>
			<BookPreview
				bookTitle={undefined}
				bookAuthor={undefined}
				linkHref={""}
				bookSize={"previewGrid"}
			/>
		</>
	);
};

export default Home;
