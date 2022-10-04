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
		<div>
			<div className="relative mt-10 mb-20 flex  justify-center ">
				<div className="flex  rounded-lg  border-2 border-grey">
					<button className="rounded-l-lg bg-white pl-2 outline-none">
						<BsSearch className=" text-grey" />
					</button>
					<Combobox value={book} onChange={setBook}>
						<Combobox.Input
							type="text"
							className=" outline-none"
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Options
							className={
								" absolute mt-10 flex  max-h-32 flex-col  gap-1 overflow-y-scroll bg-white px-2   font-sora text-xl"
							}
							value={book}
							onChange={setBook}
						>
							{filteredBooks.map((searchedBook) => (
								<Combobox.Option
									onSelect={(searchedBook) => setBook(searchedBook)}
									key={searchedBook}
									value={searchedBook}
								>
									{searchedBook}
								</Combobox.Option>
							))}
						</Combobox.Options>
					</Combobox>
					<Combobox value={zipCode} onChange={setZipCode}>
						<div className="relative border-l-2 border-t-0 border-grey ">
							<Combobox.Input
								type="number"
								placeholder="in 04103"
								className="  pt-1 pl-4 outline-none"
								onChange={(event) => setQuery(event.target.value)}
							/>
							<div className=" absolute mt-2 flex  max-h-32 flex-col  gap-1 overflow-y-scroll bg-white px-10   font-sora text-xl">
								<Combobox.Options>
									{filteredZip.map((zip) => (
										<Combobox.Option
											onSelect={(zip) => setZipCode(zip)}
											key={zip}
											value={zip}
										>
											<span>in {zip}</span>
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
					<div className="ml-2" id="search-form">
						<form
							className={clsx(
								isActive ? "opacity-100" : "invisible opacity-0 ",
								"absolute flex transform flex-col  rounded-lg border-2  border-grey bg-white py-2 px-4 text-start text-sm font-medium text-black  duration-500"
							)}
						>
							{placeHolderLang.map((language, idx) => (
								<label key={language} className="flex gap-1 self-center">
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
