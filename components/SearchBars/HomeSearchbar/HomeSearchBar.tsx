import { Combobox } from "@headlessui/react";
import { match } from "assert";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdOptions } from "react-icons/io";
import { string } from "zod";
import { SearchParams } from "../../../pages/index.page";
type HomeSearchBarProps = {
	// onChange: () => void;
	searchParams: SearchParams;
	setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
};

export function HomeSearchBar({
	searchParams,
	setSearchParams,
}: HomeSearchBarProps) {
	// const [book, setBook] = useState("");
	// const [zipCode, setZipCode] = useState("");
	const [query, setQuery] = useState("");
	const books = [
		"Crying in The Titans",
		"Gone Town",
		"Come Town",
		"Away Town",
		"Birth Without Duty",
		"Answering the Titans",
	];

	const locations = [
		"84301",
		"64321",
		"04101",
		"12301",
		"64321",
		"04101",
		"12301",
		"64321",
		"04101",
		"12301",
		"64321",
		"04101",
		"12301",
		"64321",
		"04101",
		"12301",
	];
	const placeHolderLang = ["English", "German", "French"];
	const [isActive, setIsActive] = useState(false);
	const [isChecked, setIsChecked] = useState(
		placeHolderLang.reduce((acc, current) => {
			acc[current] = false;
			return acc;
		}, {})
	);
	function handler(event) {
		const isButton = event.target.matches("#search-form-button *");
		const isMenu = event.target.matches("#search-form *");
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

	const filteredZip = useMemo(
		() =>
			locations.filter((zipCode) =>
				zipCode.toLowerCase().startsWith(query.toLowerCase())
			),
		[query]
	);

	return (
		<div className="relative mt-10 mb-10 flex justify-center gap-4 self-center ">
			<div className="flex  rounded-lg  border-2 border-grey">
				<button className="rounded-l-lg bg-white pl-1 outline-none">
					<BsSearch className=" text-grey" />
				</button>
				<input
					onChange={(event) => {
						setQuery(event.target.value);
						setSearchParams({
							...searchParams,
							query: event.target.value,
						});
					}}
					type="text"
					className=" sm:w-30 pl-2 outline-none"
				/>
				<Combobox
					value={searchParams.zipCode}
					onChange={(value) => setSearchParams({ ...searchParams, zipCode: value })}
				>
					<div className="relative border-l-2 border-t-0 border-grey ">
						<Combobox.Input
							type="text"
							placeholder="in 04103"
							className="  w-20 pt-1 pl-4 outline-none"
							onChange={(event) => setQuery(event.target.value)}
						/>
						<div className=" absolute mt-2 flex max-h-16 flex-col gap-1 overflow-auto  bg-white   px-2 font-sora text-xl">
							<Combobox.Options>
								{query === ""
									? ""
									: filteredZip.map((zip) => (
											<Combobox.Option className={""} key={zip} value={zip}>
												<span> {zip}</span>
											</Combobox.Option>
									  ))}
							</Combobox.Options>
						</div>
					</div>
				</Combobox>
			</div>
			<div>
				<div id="search-form-button" className="">
					<button
						type="button"
						className="    rounded-lg border-2  border-grey  bg-white p-2 text-grey outline-none"
					>
						<IoMdOptions className="h-4 w-5 " />
					</button>
				</div>
				<div className="absolute ml-2" id="search-form">
					<form
						className={clsx(
							isActive ? "opacity-100" : "invisible hidden opacity-0 ",
							" absolute -right-12 flex transform flex-col  rounded-lg border-2  border-grey bg-white py-2 px-4 text-start text-sm font-medium text-black  duration-500"
						)}
					>
						{Object.keys(searchParams.languages).map((language, idx) => (
							<label key={language} className="flex self-start">
								<input
									type="checkbox"
									name=""
									checked={searchParams.languages[language]}
									onChange={(event) =>
										setSearchParams({
											...searchParams,
											languages: {
												...searchParams.languages,
												[language]: event.target.checked,
											},
										})
									}
									className="mr-1 rounded pr-2 outline-none "
								/>
								{language}
							</label>
						))}
					</form>
				</div>
			</div>
		</div>
	);
}
