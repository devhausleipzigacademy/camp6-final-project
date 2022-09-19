import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/header";
import { HamburgerMenu } from "../components/DropdownMenu/HanburgerMenu/HambuergerMenu";
import DropdownMenu from "../components/DropdownMenu/DropdownMenu";
import { ExampleTags } from "../components/bookDescription/BookDescribtion.story";
import InputForm from "../components/InputForm/InputForm";
import { InputFormProps } from "../components/InputForm/InputForm";

const Home: NextPage = (props) => {
	return (
		<>
			<div className="">
				<InputForm {...props} />
			</div>
		</>
	);
};

export default Home;
