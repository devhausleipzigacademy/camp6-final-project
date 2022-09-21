import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import languagesJSON from "../../languages/ISO-languages.json";
import { Button } from "../button/Button";
import { SearchBar } from "../SearchBar/example";
function InputForm() {
	const [selectedLang, setSelectedLang] = useState(null);
	const [queryy, setQuerry] = useState("");
	// const filter=querty===''?
	return (
		<>
			<div className="flex w-mobile flex-col p-10 outline-none  ">
				<div className=" grid grid-flow-col      ">
					<button className="">
						<AiOutlineClose className="self-center text-center text-slate-400" />
					</button>
					<p className=" my-4  text-2xl text-pink-300">###Book Info</p>
				</div>
				<form className="">
					<div className="flex  flex-col">
						<p className="text-start">###Title</p>
						<input
							type="text"
							placeholder=""
							className="my-2 rounded-md border-b-2 border-yellow-300 py-2 pl-2 placeholder-slate-400 shadow shadow-slate-300 outline-none"
						/>
						<p className="text-start">###Author</p>
						<input
							type="text"
							placeholder=""
							className="my-2 rounded-md border-b-2 border-yellow-300 py-2 pl-2 placeholder-slate-400 shadow shadow-slate-300 outline-none"
						/>
						<p className="text-start">###PostalCode</p>
						<input
							type="number"
							placeholder=""
							className="my-2 rounded-md border-b-2 border-yellow-300 py-2 pl-2 placeholder-slate-400 shadow shadow-slate-300 outline-none"
						/>
						<p className="text-start">###TelegramHandle</p>
						<input
							type="text"
							placeholder=""
							className="my-2 rounded-md border-b-2 border-yellow-300 py-2 pl-2 placeholder-slate-400 shadow shadow-slate-300 outline-none"
						/>

						<form className="my-2 rounded-md border-b-2 border-yellow-300 py-4 pl-2 placeholder-slate-400 shadow shadow-slate-300 outline-none">
							<SearchBar />
						</form>
					</div>
				</form>
				<button className="text-end text-xs text-slate-400 underline">
					###additional info
				</button>
				<button className="mt-10 rounded-md border bg-[#b5c285] py-3 font-semibold  text-white">
					###Submit Book
				</button>
				<Button functionality="FormSubmit">###Submit Book</Button>
			</div>
		</>
	);
}

export default InputForm;
