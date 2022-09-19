import { AiOutlineClose } from "react-icons/ai";
import languagesJSON from "../../languages/ISO-languages.json";
function InputForm() {
	return (
		<>
			<div className="flex flex-col p-10 text-center min  ">
				<button className="self-end">
					<AiOutlineClose className="text-slate-400" />
				</button>

				<p className="my-4 text-slate-400"></p>
				<form className="">
					<div className="flex  flex-col">
						<input
							type="text"
							placeholder="###Title"
							className="py-2 pl-2 outline-none border-gray-300 shadow shadow-slate-300 border rounded-md my-2 placeholder-slate-400"
						/>
						<input
							type="number"
							placeholder="###Author"
							className="py-2 pl-2 outline-noneplaceholder-slate-400 border-gray-300 shadow shadow-slate-300 border rounded-md my-2 "
						/>
						<input
							type="text"
							placeholder="###Postal Code"
							className="py-2 pl-2 outline-none placeholder-slate-400 border-gray-300 shadow shadow-slate-300 border rounded-md my-2 "
						/>
						<input
							type="text"
							placeholder="###Telegram Handle"
							className="py-2 pl-2 outline-none border-gray-300 shadow placeholder-slate-400 shadow-slate-300 border rounded-md my-2 "
						/>

						<select
							value={undefined}
							placeholder="Langugae"
							className="py-2 pl-2 text-slate-400 outline-none border-gray-300 shadow shadow-slate-300 border rounded-md my-2"
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
				<button className="text-slate-400 text-xs text-end underline">
					###additional info
				</button>
				<button className="border rounded-md mt-10 py-3 text-white font-semibold  bg-[#b5c285]">
					###Submit Book
				</button>
			</div>
		</>
	);
}

export default InputForm;
