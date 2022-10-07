export function checkPreferredLanguage() {
	const languagePreferences = navigator.languages;

	if (languagePreferences[0] === "en-US") return "English";

	if (languagePreferences[0] === "de-DE") return "German";

	return "unknown";
}
