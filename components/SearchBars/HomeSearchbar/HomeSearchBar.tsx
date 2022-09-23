import { match } from "assert";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdOptions } from "react-icons/io";

export function HomeSearchBar() {
	const placeHolderLang = ["English", "Turkish", "French", "Texas"];
	const [isActive, setIsActive] = useState(false);
	const [isChecked, setIsChecked] = useState(
		placeHolderLang.reduce((acc, current) => {
			acc[current] = false;
			return acc;
		}, {})
	);
	function handler(event) {
		console.log(event.target);
		const isButton = event.target.matches("#search-form-button *");
		const isMenu = event.target.matches("#search-form *");
		console.log(isActive);
		console.log(isButton, isMenu);
		if (isButton || (!(isButton || isMenu) && isActive)) {
			setIsActive((prev) => !prev);
		}
	}
	// #search - form,
	useEffect(() => {
		document.addEventListener("click", handler);
		return () => {
			document.removeEventListener("click", handler);
		};
	}, [isActive]);

	return (
		<div>
			<div className="min-w-mobile  flex w-mobile justify-center gap-6  py-2">
				<div className="flex flex-wrap rounded-xl border-2 border-slate-300">
					<button className="rounded-l-lg bg-white pl-2 outline-none">
						<BsSearch className=" text-slate-300" />
					</button>
					<input
						type="text"
						className=" py-1 pl-3 outline-none"
						placeholder="Search"
					/>
					<input
						type="text"
						className="w-24 rounded-r-lg border-l-2 border-slate-300 pl-2 text-xs outline-none "
						placeholder="#in 04179"
					/>
				</div>
				<div>
					<div id="search-form-button" className="">
						<button
							// onClick={() => setIsActive((prev) => !prev)}
							type="button"
							className="    rounded-lg border-2  border-slate-200  bg-white p-2 text-slate-400 outline-none"
						>
							<IoMdOptions className="h-4 w-5 " />
						</button>
					</div>
					<div id="search-form">
						<form
							className={clsx(
								isActive ? "opacity-100" : "invisible opacity-0 ",
								"absolute  flex transform flex-col  rounded-lg border-2 border-gray-400 bg-white py-2 px-4 text-start text-sm font-medium text-black  duration-500"
							)}
						>
							{placeHolderLang.map((language, idx) => (
								<label key={language} className="flex gap-1">
									<input
										type="checkbox"
										name=""
										checked={isChecked[language]}
										onChange={(event) =>
											setIsChecked({
												...isChecked,
												[language]: event.target.checked,
											})
										}
										className="mr-1 rounded outline-none focus:ring-0"
									/>
									{language}
								</label>
							))}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
