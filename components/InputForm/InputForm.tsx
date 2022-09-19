import { AiOutlineClose } from "react-icons/ai";

function InputForm() {
	return (
		<>
			<div className="flex flex-col p-10 text-center min  ">
				<button className="self-end">
					<AiOutlineClose className="text-slate-400" />
				</button>
				<p className="my-4 text-slate-400">###Book info</p>
				<form className="">
					<div className="flex  flex-col">
						<input
							type="text"
							placeholder="###Title"
							className="py-2 pl-2 outline-none border-gray-300 shadow shadow-slate-300 border rounded-md my-2 placeholder-slate-400"
						/>
						<input
							type="text"
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

						<select className="py-2 pl-2 text-slate-400 outline-none border-gray-300 shadow shadow-slate-300 border rounded-md my-2">
							<option>###Language</option>
							<option>Option 2</option>
							<option>Option 3</option>
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
