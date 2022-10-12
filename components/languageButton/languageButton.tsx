import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { HiChevronDown, HiCheck } from "react-icons/hi";
import { languageItem } from "../SearchBars/HomeSearchbar/HomeSearchBar";

export interface LanguageButtonProps {
	languages: languageItem[];
	onClickhandler: () => void;
}

export default function LanguageButton({
	languages,
	onClickhandler,
}: LanguageButtonProps) {
	const [selected, setSelected] = useState(languages[0]);
	const [query, setQuery] = useState("");

	while (languages.length === 0)
		return (
			<select>
				<option>Loading...</option>
			</select>
		);

	const filteredLanguages =
		query === ""
			? languages
			: languages.filter((language) =>
					language.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	return (
		// <select
		// 	name="Languages"
		// 	onMouseDown={() => {}}
		// 	onChange={() => {
		// 		onClickhandler();
		// 	}}
		// >
		// 	<BiSliderAlt />
		// 	<option disabled value="default">
		// 		Select language
		// 	</option>
		// 	{languages.map((language, idx) => (
		// 		<option key={idx} value={language.code}>
		// 			{`${language.name} (${language})`}
		// 		</option>
		// 	))}
		// </select>

		<div className="fixed top-16 w-72">
			<Combobox value={selected} onChange={setSelected}>
				<div className="relative mt-1">
					<div className="focus-visible:ring-offset-teal-300 relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
						<Combobox.Input
							className="text-gray-900 w-full border-none py-2 pl-3 pr-10 text-sm leading-5 focus:ring-0"
							displayValue={(language) => language.name}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
							<HiChevronDown
								className="text-gray-400 h-5 w-5"
								aria-hidden="true"
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery("")}
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{filteredLanguages.length === 0 && query !== "" ? (
								<div className="text-gray-700 relative cursor-default select-none py-2 px-4">
									Nothing found.
								</div>
							) : (
								filteredLanguages.map((language) => (
									<Combobox.Option
										key={language.code}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-teal-600 text-white" : "text-gray-900"
											}`
										}
										value={language.code}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}
												>
													{language.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? "text-white" : "text-teal-600"
														}`}
													>
														<HiCheck className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
}
