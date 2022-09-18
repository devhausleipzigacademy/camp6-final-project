import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import BookDescription from "../components/BookDescription/BookDescription";
import Header from "../components/header";
import { HamburgerMenu } from "../components/DropdownMenu/HanburgerMenu/HambuergerMenu";
import DropdownMenu from "../components/DropdownMenu/DropdownMenu";
import { ExampleTags } from "../components/BookDescription/BookDescribtion.story";

const Home: NextPage = (props) => {
	return (
		<>
			<div className="">
				<ExampleTags />
			</div>
		</>
	);
};

export default Home;
