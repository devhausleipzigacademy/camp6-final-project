import { Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
// import languagesJSON from "../languages/ISO-languages.json";
import exampleJSON from "../languages/ISO-languages.json";
import { Button } from "./button/Button";

const people = [
	"Durward Reynolds",
	"Kenton Towne",
	"Therese Wunsch",
	"Benedict Kessler",
	"Katelyn Rohan",
];

export function PlaceHolder() {
	// const [selectedPerson, setSelectedPerson] = useState(langList);
	const [query, setQuery] = useState("");
	const langList = Object.entries(exampleJSON);
	const listing = Object.entries(exampleJSON).reduce((acc, value) => {
		const [isoCode, langNames] = value;
		langNames.forEach((langName) => {
			if (langName !== "") {
				// @ts-ignore
				acc.push(
					<Combobox.Option key={isoCode} value={langNames}>
						{langNames}
					</Combobox.Option>
				);
			}
		});
		return acc;
	}, []);
	console.log(exampleJSON);
	console.log(listing);
	const filteredPeople =
		query === ""
			? Object.entries(exampleJSON)
			: Object.entries(exampleJSON).reduce((acc, value) => {
					const [code, lang] = value;
					lang.filter((x) => {
						return x.toLowerCase().includes(query.toLowerCase());
					});
			  });

	return (
		<div className="absolute left-[40%] top-4 border border-black outline-none">
			<Combobox value={query}>
				<Combobox.Input onChange={(event) => setQuery(event.target.value)} />
				<Combobox.Options>
					{Object.entries(exampleJSON).reduce((acc, value) => {
						const [isoCode, langNames] = value;
						langNames.forEach((langName) => {
							if (langName !== "") {
								// @ts-ignore
								acc.push(
									<Combobox.Option key={isoCode} value={isoCode}>
										{langNames}
									</Combobox.Option>
								);
							}
						});
						return acc;
					}, [])}
				</Combobox.Options>
			</Combobox>
		</div>
	);
}
