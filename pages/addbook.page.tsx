import router from "next/router";
import { VscChromeClose } from "react-icons/vsc";
import InputForm from "../components/inputForm/InputForm";

export default function AddBook() {
	const ownerId = "0293df67-60f8-446e-a7cd-70844e8768ea";

	return (
		<>
			<div className="-top-4 border-b-0.75 border-grey bg-white pb-4">
				<button onClick={() => router.back()}>
					<VscChromeClose className="absolute mt-1 ml-7 h-6 w-6 text-textGrey" />
				</button>

				<h2 className="text-center font-arno text-2xl font-semibold text-dustyRose">
					New Book Information
				</h2>
			</div>
			<InputForm formType={"create"} ownerId={ownerId} />;
		</>
	);
}
