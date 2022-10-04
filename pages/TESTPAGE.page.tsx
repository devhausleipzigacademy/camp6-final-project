import { Combobox } from "@headlessui/react";
import { match } from "assert";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdOptions } from "react-icons/io";
import { string } from "zod";
type HomeSearchBarProps = {
	onChange: () => void;
};

export function HomeSearchBar() {
	const [book, setBook] = useState(undefined);
	const [zipCode, setZipCode] = useState("");
	const [query, setQuery] = useState("");
	const books = [
		"Crying in The Titans",
		"Gone Town",
		"Come Town",
		"Away Town",
		"Birth Without Duty",
		"Answering the Titans",
	];

	const locations = ["84301", "64321", "04101", "12301"];
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
	const filteredBooks = useMemo(
		() =>
			books.filter((bookName) =>
				bookName.toLowerCase().includes(query.toLowerCase())
			),
		[query]
	);
	const filteredZip = useMemo(
		() =>
			locations.filter((zipCode) =>
				zipCode.toLowerCase().includes(query.toLowerCase())
			),
		[query]
	);

	return (
		<div className="mt-10 flex justify-center  self-center border-grey">
			<Combobox value={book} onChange={setBook}>
				<div className="relative rounded-lg  border-2 border-grey   px-2 ">
					<Combobox.Input
						className={"pl-7  outline-none"}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<BsSearch className="text-ce absolute top-2 left-2 justify-center text-grey" />
					<Combobox.Options className={"  border-grey"}>
						{filteredBooks.map((bookName) => (
							<Combobox.Option key={bookName} value={""}>
								{bookName}
							</Combobox.Option>
						))}
					</Combobox.Options>
				</div>
			</Combobox>
			<div className="border-2 border-r-2 border-grey">
				<Combobox value={zipCode} onChange={setZipCode}>
					<div className="relative w-36  border-grey  placeholder:text-grey ">
						<Combobox.Input
							placeholder="04123"
							className={"pl-6  outline-none"}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<Combobox.Options
							className={
								"absolute rounded-lg border border-grey bg-white px-10 text-start"
							}
						>
							{filteredZip.map((zipps) => (
								<Combobox.Option key={zipps} value={""}>
									{zipps}
								</Combobox.Option>
							))}
						</Combobox.Options>
					</div>
				</Combobox>
			</div>
			<div>
				<div id="search-form-button" className="">
					<button
						type="button"
						className="    rounded-lg border-2  border-grey  p-2 text-grey outline-none"
					>
						<IoMdOptions className="h-4 w-5 " />
					</button>
				</div>
				<div id="search-form">
					<form
						className={clsx(
							isActive ? "opacity-100" : "invisible opacity-0 ",
							"absolute flex transform flex-col  rounded-lg border-2 border-grey bg-white py-2 px-4 text-start text-sm font-medium text-black  duration-500"
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
	);
}

export default HomeSearchBar;
