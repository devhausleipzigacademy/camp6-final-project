import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import BookDescription from "../components/BookDescription/BookDescription";
import Header from "../components/header";
import { HamburgerMenu } from "../components/HanburgerMenu/HambuergerMenu";

const Home: NextPage = (props) => {
	return (
		<>
			<HamburgerMenu />
		</>
	);
};

export default Home;
