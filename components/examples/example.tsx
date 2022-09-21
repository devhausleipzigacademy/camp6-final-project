import { Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import exampleJSON from "../../languages/ISO-languages.json";
import languagesJSON from "../../languages/ISO-languages.json";
import { Button } from "../button/Button";
// import languagesJSON from "../languages/ISO-languages.json";
export function Example() {
	// const langListObj = Object.entries(exampleJSON);
	// const langList = langListObj.reduce((acc, value) => {
	// 	const [isoCode, langNames] = value;
	// 	langNames.forEach((langName) => {
	// 		if (langName !== "") {
	// 			acc.push({ code: isoCode, lang: langName });
	// 			return acc;
	// 		}
	// 	});

	// 	return acc;
	// }, []);
	// const [selectedLang, setSelectedLang] = useState(langList[0].lang);
	// const [query, setQuery] = useState("");

	return (
		<>
			<form action="">
				<select name="" id="">
					<ul>s</ul>
					<ul>sss</ul>
				</select>
			</form>
		</>
	);
}
