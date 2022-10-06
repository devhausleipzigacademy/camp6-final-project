import { Combobox } from "@headlessui/react";
import { match } from "assert";
import clsx from "clsx";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdOptions } from "react-icons/io";
import { string } from "zod";

type HomeSearchBarProps = {
	// onChange: () => void;
	searchParams: SearchParams;
	setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
};

export interface SearchParams {
	query: string;
	zipCode: string;
	languages: {
		English: boolean;
		German: Boolean;
		French: boolean;
		Arabic: Boolean;
	};
}

export function HomeSearchBar({
	searchParams,
	setSearchParams,
}: HomeSearchBarProps) {
	// const [book, setBook] = useState("");
	// const [zipCode, setZipCode] = useState("");
	const [zipQuery, setZipQuery] = useState("");
	const [query, setQuery] = useState("");
	const books = [
		"Crying in The Titans",
		"Gone Town",
		"Come Town",
		"Away Town",
		"Birth Without Duty",
		"Answering the Titans",
	];
	console.log("query:", query, "Zip:", zipQuery);
	const locations = [
		"2048",
		"2049",
		"2050",
		"2051",
		"2052",
		"2053",
		"2054",
		"2055",
		"2056",
		"2057",
		"2058",
		"2059",
		"2060",
		"2061",
		"2062",
		"2089",
		"2090",
		"2091",
		"2092",
		"2093",
		"2094",
		"2095",
		"2096",
		"2097",
		"2098",
		"2099",
		"2100",
		"2101",
		"2102",
		"2103",
		"2104",
		"2105",
		"2106",
		"2107",
		"2063",
		"2064",
		"2065",
		"2066",
		"2067",
		"2068",
		"2069",
		"2070",
		"2071",
		"2072",
		"2073",
		"2074",
		"2075",
		"2076",
		"2077",
		"2078",
		"2079",
		"2080",
		"2081",
		"2082",
		"2083",
		"2084",
		"2085",
		"2086",
		"2087",
		"2088",
	];
	const languages = [
		{ langName: "English", langCode: "en" },
		{ langName: "German", langCode: "de" },
		{ langName: "Turkish", langCode: "tr" },
		{ langName: "Arabic", langCode: "ar" },
	];
	const [checkedLanguages, setCheckedLanguages] = useState({
		English: false,
		German: false,
		French: false,
		Arabic: false,
	});
	console.log(searchParams);
	function submitter(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		console.log("sss", query, zipQuery);
		setSearchParams({
			query: query,
			zipCode: zipQuery,
			languages: checkedLanguages,
		});
		return console.log("sss", query, zipQuery);
	}

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
				zipCode.toLowerCase().startsWith(zipQuery.toLowerCase())
			),
		[zipQuery]
	);
	return (
		<form
			onSubmit={submitter}
			className="relative mt-10 mb-10 flex justify-center gap-4 self-center px-1 "
		>
			<div className="flex  rounded-lg  border-2 border-grey">
				<div className="flex flex-row-reverse justify-center">
					<input
						onChange={(event) => {
							setQuery(event.target.value);
						}}
						type="text"
						className="  pl-2 outline-none"
					/>
					<button
						type="submit"
						className="   rounded-l-lg  pl-1 shadow-black outline-none"
					>
						<BsSearch stroke="green" fill="green" className="text-green shadow-xl " />
					</button>
				</div>

				<Combobox
					value={zipQuery}
					onChange={setZipQuery}
					// onChange={(value) => setSearchParams({ ...searchParams, zipCode: value })}
				>
					<div className="relative border-l-2 border-t-0 border-grey ">
						<Combobox.Input
							type="text"
							placeholder="in 04103"
							className="  w-20 pt-2 pl-2 text-sm outline-none"
							onChange={(event) => setZipQuery(event.target.value)}
						/>
						<div className=" absolute mt-2 flex max-h-16 flex-col gap-1 overflow-x-auto  bg-white   px-2 font-sora text-xl">
							<Combobox.Options>
								{zipQuery === ""
									? ""
									: filteredZip.map((zip) => (
											<Combobox.Option
												className={""}
												onClick={() => setZipQuery(zip)}
												key={zip}
												value={zip}
											>
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
						className="  rounded-lg border-2  border-grey  bg-white p-2 text-grey outline-none"
					>
						<IoMdOptions className="h-4 w-5 " />
					</button>
				</div>
				<div className="absolute ml-2" id="search-form">
					<div
						className={clsx(
							isActive ? "opacity-100" : "invisible hidden opacity-0 ",
							" absolute -right-12 flex transform flex-col  rounded-lg border-2  border-grey bg-white py-2 px-4 text-start text-sm font-medium text-black  duration-500"
						)}
					>
						{languages.map(({ langName, langCode }, idx) => (
							<label key={langName} className="flex self-start">
								<input
									value={langCode}
									type="checkbox"
									checked={checkedLanguages[langName]}
									onChange={(event) =>
										setCheckedLanguages({
											...checkedLanguages,
											[langName]: event.target.checked,
										})
									}
									name=""
									className="mr-1 rounded pr-2 outline-none "
								/>
								{langName}
							</label>
						))}
					</div>
				</div>
			</div>
		</form>
	);
}
