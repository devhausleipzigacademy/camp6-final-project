import languagesJSON from "../enums/ISO-languages.json";

export interface languageModel {
	_count: Object;
	language: string;
}

export default function languagePicker(languages: languageModel[]) {
	const languageList: { code: string; name: string }[] = Object.entries(
		languagesJSON
	).map(([key, value]) => ({
		code: key,
		name: value[0],
	}));

	const languageArray = [];
	languages.map((language) => {
		const selectedLanguage = languageList.find(
			(languageItem) => languageItem.code === language.language
		);
		languageArray.push(selectedLanguage);
	});
	return languageArray;
}
