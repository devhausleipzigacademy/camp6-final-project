import { Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaAdn } from "react-icons/fa";
import exampleJSON from "../../languages/ISO-languages.json";
import languagesJSON from "../../languages/ISO-languages.json";
import { Button } from "../button/Button";
// import languagesJSON from "../languages/ISO-languages.json";

export function SearchBar() {
	const [selectedLang, setSelectedLang] = useState("");
	const [selectedLangCode, setSelectedLangCode] = useState("");
	const [query, setQuery] = useState("");
	function setUseStates(a, b): any {
		setSelectedLang(a), setSelectedLangCode(b);
	}
	const languageList = Object.entries(languagesJSON).reduce((acc, value) => {
		const [isoCode, langNames] = value;
		langNames.forEach((langName) => {
			if (langName.toLowerCase().includes(query.toLowerCase())) {
				acc.push(
					<Combobox.Options>
						<Combobox.Option
							onSelect={(langName) => setSelectedLang(langName)}
							onClick={(langName) => setSelectedLang(langName)}
							key={isoCode}
							value={langName}
						>
							<button
								onClick={(e) => setSelectedLang()}
								key={isoCode}
								value={langName}
							>
								{langName}
							</button>
						</Combobox.Option>
					</Combobox.Options>
				);
			}
		});
		return acc;
	}, []);

	console.log("lang", selectedLang, "code", selectedLangCode, "query", query);

	return (
		<div>
			<Combobox value={selectedLangCode} onChange={setSelectedLangCode}>
				<Combobox.Input onChange={(event) => setQuery(event.target.value)} />
				<div className="flex max-h-52  w-mobile  flex-col overflow-auto bg-green-300 ">
					{languageList}
				</div>
			</Combobox>
		</div>
	);
}
