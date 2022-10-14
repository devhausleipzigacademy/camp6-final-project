import router from "next/router";
import { VscChromeClose } from "react-icons/vsc";
import InputForm from "../components/inputForm/InputForm";

export default function UpdateBook() {
	return (
		<>
			<div className="sticky -top-4 z-10 border-b-0.75 border-grey bg-white pb-4">
				<button onClick={() => router.back()}>
					<VscChromeClose className="absolute mt-1 ml-7 h-6 w-6 text-textGrey" />
				</button>

				<h2 className="text-center font-arno text-2xl font-semibold text-dustyRose">
					Edit Book Information
				</h2>
			</div>
			<InputForm formType={"update"} />;
		</>
	);
}
