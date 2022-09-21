import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/header";
import { HamburgerMenu } from "../components/DropdownMenu/HanburgerMenu/HambuergerMenu";
import DropdownMenu from "../components/DropdownMenu/DropdownMenu";
import { ExampleTags } from "../components/bookDescription/BookDescribtion.story";
import InputForm from "../components/InputForm/InputForm";
import { PlaceHolder } from "../components/placeholder";
import { Button } from "../components/button/Button";
import { FaTelegram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

const Home: NextPage = (props) => {
	return (
		<>
			{/* <PlaceHolder /> */}

			<InputForm />
			{/* <SearchBar /> */}
		</>
	);
};

export default Home;
