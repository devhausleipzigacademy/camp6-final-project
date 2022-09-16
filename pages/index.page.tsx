import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import BookDescription from "../components/bookDescription";
import Header from "../components/header";

const Home: NextPage = () => {
	return (
		<div>
			<Header />
			<BookDescription />
		</div>
	);
};

export default Home;
