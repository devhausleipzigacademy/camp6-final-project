import InputForm from "../components/InputForm/InputForm";
import { generateBook } from "./api/book/generator";

import type { NextPage } from "next";
const Home: NextPage = (props) => {
	console.log(generateBook());

	return (
		<>
			{/* <PlaceHolder /> */}

			<InputForm />
			{/* <SearchBar /> */}
		</>
	);
};

export default Home;
