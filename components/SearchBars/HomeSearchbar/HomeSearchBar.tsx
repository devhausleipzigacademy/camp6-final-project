// package imports

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useMemo, Fragment, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdOptions } from "react-icons/io";
import { BiSliderAlt } from "react-icons/bi";
import Router from "next/router";

import { Combobox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronDown } from "react-icons/hi";

// local imports
import { SearchParams } from "../../../pages/index.page";
import { countLanguages } from "../../../utils/fetchBooks";
import Link from "next/link";
import languagePicker, { languageModel } from "../../../utils/languagePicker";
import LanguageButton from "../../languageButton/languageButton";

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

export interface languageItem {
	code: string;
	name: string;
}

type HomeSearchBarProps = {
	// onChange: () => void;
	searchParams: SearchParams;
	setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
};

export function HomeSearchBar({
	searchParams,
	setSearchParams,
}: HomeSearchBarProps) {
	const [error, SetError] = useState("");
	const [languageArray, setLanguageArray] = useState([]);

	const { data: languages, status: languageStatus } = useQuery<languageModel[]>(
		["languages"],
		() => countLanguages(),
		{
			onSuccess: (data) => {
				const results = languagePicker(data);
				setLanguageArray(results);
			},
		}
	);

	// // // // Furkan // // // // // // // //

	const [book, setBook] = useState("");
	const [zipCode, setZipCode] = useState("");

	const [query, setQuery] = useState("");

	const [isActive, setIsActive] = useState(false);

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

	// // // // // // // // // // // // // // // //

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (query.length === 0) {
			SetError("Please enter a search term");
		} else {
			Router.push(`/search/${query}`);
			SetError("");
		}
	}

	if (languageStatus === "loading") {
		return <p>Loading...</p>;
	}
	if (languageStatus === "error") {
		return <p>Error...</p>;
	}

	return (
		<div className="mt-5 mb-10 flex h-9 justify-center self-center font-montserrat text-sm font-light text-textGrey">
			<form
				onSubmit={handleSubmit}
				className="flex h-full w-80 rounded-lg border-2 border-searchBar pr-1"
			>
				<Link
					href={`/search/${query}`}
					className=" flex aspect-square h-full justify-center self-start"
				>
					<FiSearch className="h-full w-12  stroke-2 p-1 pl-3 text-searchBar" />
				</Link>
				<input
					className="w-full focus:outline-none"
					onChange={(event) => {
						SetError("");
						setQuery(event.target.value);
					}}
					type="text"
				/>
				<input type="submit" hidden />
				<input
					id="search-form-button"
					type="text"
					className="h-full  w-20 border-l-2 border-searchBar pl-2 placeholder-textGrey 
                    placeholder:underline  placeholder:decoration-1 focus:placeholder-opacity-0 focus:outline-none"
					placeholder="in 04103"
				/>
				{/* <LanguageButton
					languages={languageArray}
					onClickhandler={() => {}}
				></LanguageButton> */}
				{/* <Combobox
					value={searchParams.zipCode}
					onChange={(value) =>
						setSearchParams({ ...searchParams, zipCode: value })
					}
				>
					<div className="relative border-l-2 border-t-0 border-grey ">
						<Combobox.Input
							type="text"
							placeholder="in 04103"
							className="  w-20 pt-1 pl-4 outline-none"
							onChange={(event) => setQuery(event.target.value)}
						/>
						<div className=" absolute mt-2 flex  max-h-36 flex-col  gap-1  bg-white px-2 font-sora text-xl">
							<Combobox.Options>
								{filteredZip.map((zip) => (
									<Combobox.Option key={zip} value={zip}>
										<span> {zip}</span>
									</Combobox.Option>
								))}
							</Combobox.Options>
						</div>
					</div>
				</Combobox> */}
			</form>
			{error && <p className="error text-red-500">{error}</p>}
			{/* <div>
				<div id="search-form-button" className="">
					<button
						type="button"
						className="    rounded-lg border-2  border-grey  bg-white p-2 text-grey outline-none"
					>
						<BiSliderAlt className="h-4 w-5 " />
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
			</div> */}
		</div>
	);
}
