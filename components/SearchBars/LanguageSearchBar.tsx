// package imports
import { Combobox } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";

// local imports
import { LanguageListItem, languageList } from "../../utils/languagePicker";

interface LanguageSearchBarProps {
	selectedLanguage: LanguageListItem;
	setSelectedLanguage: Dispatch<SetStateAction<LanguageListItem>>;
}

export function LanguageSearchBar() {
	const [selectedLanguage, setSelectedLanguage] = useState(languageList[0]);
	const [query, setQuery] = useState("");

	const filteredLanguages =
		query === ""
			? languageList
			: languageList.filter((language) => {
					return language.name.toLowerCase().includes(query.toLowerCase());
			  });

	return (
		<Combobox value={selectedLanguage} onChange={setSelectedLanguage}>
			<Combobox.Input
				className={"inputField"}
				onChange={(event) => setQuery(event.target.value)}
				displayValue={(language: LanguageListItem) => language.name}
			/>
			<Combobox.Options
				className="border border-dotted border-grey"
				placeholder="select a language"
			>
				{filteredLanguages.map((language) => (
					<Combobox.Option
						key={language.code}
						value={language}
						className="cursor-pointer text-sm text-textBlack"
						placeholder="select a language"
					>
						{language.name}
					</Combobox.Option>
				))}
			</Combobox.Options>
		</Combobox>
	);
}
