import type { NextPage } from "next";

const Home: NextPage = (props) => {
	return (
		<>
			<p className="font-arno">
				This is arno pro <br />
				The quick brown fox jumps over the lazy dog
			</p>
			<p className="font-arnobold font-extrabold  ">
				This is arno pro extra bold
				<br />
				The quick brown fox jumps over the lazy dog
			</p>
			<p className="font-montserrat font-normal  ">
				This is montserrat
				<br />
				The quick brown fox jumps over the lazy dog
			</p>
			<p className="font-sora font-normal  ">
				This is sora <br />
				The quick brown fox jumps over the lazy dog
			</p>
			<p className="pageTitle">
				This is a page title, e.g. <br />
				Favorites
			</p>
		</>
	);
};

export default Home;
