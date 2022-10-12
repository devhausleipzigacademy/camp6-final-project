import { Combobox } from "@headlessui/react";
import { useMemo, useState } from "react";

import languagesJSON from "../../enums/ISO-languages.json";
const languageList: { code: string; name: string }[] = Object.entries(
	languagesJSON
).map(([key, value]) => ({
	code: key,
	name: value[0],
}));

export function LanguageSearchBar() {
	const [selectedLangCode, setSelectedLangCode] = useState("");
	const [query, setQuery] = useState("");

	const filteredLanguages = useMemo(
		() =>
			languageList.filter((language) =>
				language.name.toLowerCase().includes(query.toLowerCase())
			),
		[query]
	);

	return (
		<div>
			<Combobox value={selectedLangCode} onChange={setSelectedLangCode}>
				<Combobox.Input
					className="outline-none"
					onChange={(event) => setQuery(event.target.value)}
				/>
				<div className=" flex max-h-52  w-mobile  flex-col overflow-auto bg-green-300 ">
					<Combobox.Options>
						{filteredLanguages.map((language) => (
							<Combobox.Option
								onSelect={(language) => setSelectedLangCode(language.code)}
								key={language.code}
								value={language.code}
							>
								<span>{language.name}</span>
							</Combobox.Option>
						))}
					</Combobox.Options>
				</div>
			</Combobox>
		</div>
	);
}
