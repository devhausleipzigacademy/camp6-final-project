import languagesJSON from "../enums/ISO-languages.json";

export interface LanguageModel {
	_count: Object;
	language: string;
}

export interface LanguageListItem {
	code: string;
	name: string;
}

export const languageList: LanguageListItem[] = Object.entries(
	languagesJSON
).map(([key, value]) => ({
	code: key,
	name: value[0],
}));

export default function languagePicker(languages: LanguageModel[]) {
	const languageArray = [];
	languages.map((language) => {
		const selectedLanguage = languageList.find(
			(languageItem) => languageItem.code === language.language
		);
		languageArray.push(selectedLanguage);
	});
	return languageArray;
}
