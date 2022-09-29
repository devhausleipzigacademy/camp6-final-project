import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { Button } from "../components/button/Button";
import { LanguageSearchBar } from "../components/SearchBars/LanguageSearchBar";

function InputForm() {
	const [selectedLang, setSelectedLang] = useState(null);
	const [queryy, setQuerry] = useState("");

	// const filter=querty===''?

	return (
		<>
			<div className="flex w-mobile flex-col p-10 outline-none  ">
				<div className=" mb-10 grid    grid-flow-col  border-b-2   ">
					<button onClick={() => console.log("triggered")} className="outline-none">
						<AiOutlineClose className="self-center text-center text-slate-400" />
					</button>
					<p className=" mb-4 text-2xl text-pink-400">New Book Information</p>
				</div>
				<form className="px-4">
					<div className="flex  flex-col">
						<p className=" text-start text-slate-400">Title</p>
						<input
							type="text"
							placeholder=""
							className="mb-2 border-b-2 outline-none"
						/>
						<p className=" text-start text-slate-400">Author</p>
						<input
							type="text"
							placeholder=""
							className="mb-2 border-b-2 outline-none"
						/>
						<p className=" text-start text-slate-400">Postal Code</p>
						<input
							type="text"
							placeholder=""
							className="mb-2 border-b-2 outline-none"
						/>
						<p className=" text-start text-slate-400">Telegram</p>
						<input
							type="text"
							placeholder=""
							className="mb-2 border-b-2 outline-none"
						/>

						<form className="mb-2 border-b-2 outline-none">
							<p className="text-slate-400">Language</p>
							<LanguageSearchBar />
						</form>
					</div>
				</form>
				<button className="text-end text-xs text-slate-400 underline">
					additional info
				</button>

				<Button functionality="FormSubmit">Submit Book</Button>
			</div>
		</>
	);
}

export default InputForm;
