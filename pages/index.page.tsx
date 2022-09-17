import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import BookDescription from "../components/BookDescription/BookDescription";
import Header from "../components/header";
import { HamburgerMenu } from "../components/HanburgerMenu/HambuergerMenu";
import DropdownMenu from "../components/DropdownMenu/DropdownMenu";

const Home: NextPage = (props) => {
	return (
		<>
			{/* <HamburgerMenu /> */}
			<DropdownMenu />
		</>
	);
};

export default Home;
