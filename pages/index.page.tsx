import type { NextPage } from "next";

const Home: NextPage = (props) => {
	return (
		<>
			<p className="font-arno">This is arno pro</p>
			<p className="font-arnobold font-extrabold  ">
				This is arno pro extra bold
			</p>
			<p className="font-montserrat font-normal  ">This is montserrat</p>
			<p className="font-sora font-normal  ">This is sora</p>
			<p className="pageTitle">
				This is a page title, e.g. <br />
				Favorites
			</p>
		</>
	);
};

export default Home;
