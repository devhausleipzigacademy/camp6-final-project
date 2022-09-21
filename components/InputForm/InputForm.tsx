import { AiOutlineClose } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import languagesJSON from "../../languages/ISO-languages.json";
import { Button } from "../button/Button";
function InputForm() {
	return (
		<>
			<div className="min flex flex-col p-10 text-center  ">
				<button className="self-end">
					<AiOutlineClose className="text-slate-400" />
				</button>

				<p className="my-4 text-slate-400">@</p>
				<form className="">
					<div className="flex  flex-col">
						<input
							type="text"
							placeholder="###Title"
							className="my-2 rounded-md border border-gray-300 py-2 pl-2 placeholder-slate-400 shadow shadow-slate-300 outline-none"
						/>
						<input
							type="number"
							placeholder="###Author"
							className="outline-noneplaceholder-slate-400 my-2 rounded-md border border-gray-300 py-2 pl-2 shadow shadow-slate-300 "
						/>
						<input
							type="text"
							placeholder="###Postal Code"
							className="my-2 rounded-md border border-gray-300 py-2 pl-2 placeholder-slate-400 shadow shadow-slate-300 outline-none "
						/>
						<input
							type="text"
							placeholder="###Telegram Handle"
							className="my-2 rounded-md border border-gray-300 py-2 pl-2 placeholder-slate-400 shadow shadow-slate-300 outline-none "
						/>

						<select
							value={undefined}
							placeholder="Langugae"
							className="my-2 rounded-md border border-gray-300 py-2 pl-2 text-slate-400 shadow shadow-slate-300 outline-none"
						>
							<option disabled hidden value="">
								Language
							</option>
							{Object.entries(languagesJSON).reduce((acc, value) => {
								const [isoCode, langNames] = value;
								langNames.forEach((langName) => {
									if (langName !== "") {
										// @ts-ignore
										acc.push(<option value={isoCode}>{langName}</option>);
									}
								});
								return acc;
							}, [])}
						</select>
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
