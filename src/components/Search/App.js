import React from "react";
import Header from "./Header";
import Content from "./Content";

const App = () => {
	const lang = detectSupportedLanguage();

	return (
		<div
			className={["search-app", languageIsLeftToRight(lang) ? "" : "rtl"].join(
				" "
			)}
		>
			<Header eventTitle="Salesforce World Tour - Toronto 2017" />
			<Content lang={lang} />
		</div>
	);
};

// Detect Languages
const detectSupportedLanguage = () => {
	const originalLang = (window.navigator.userLanguage ||
		window.navigator.language)
		.toUpperCase();
	const lang = originalLang.split("-")[0];
	switch (lang) {
		case "AR":
			return "arabic";
		case "CS":
			return "czech";
		case "DE":
			return "german";
		case "ES-ES":
			return "spain";
		case "ES":
			return "spanish";
		case "FI":
			return "finnish";
		case "FR":
			return "french";
		case "HE":
			return "hebrew";
		case "IT":
			return "italian";
		case "JA":
			return "japanese";
		case "PL":
			return "polish";
		case "PT":
			return "portuguese";
		case "RU":
			return "russian";
		case "SV":
			return "sweedish";
		case "TR":
			return "turkish";
		case "UK":
			return "ukranian";
		default:
			return "english";
	}
};

// Detect Language Direction
const languageIsLeftToRight = lang => {
	if (lang === "arabic" || lang === "hebrew") {
		return false;
	}
	return true;
};

export default App;
