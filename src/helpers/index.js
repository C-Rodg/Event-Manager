// Detect Languages
export const detectSupportedLanguage = () => {
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
export const languageIsLeftToRight = lang => {
	if (lang === "arabic" || lang === "hebrew") {
		return false;
	}
	return true;
};

export const returnEventGuid = () => {
	const path = window.location.pathname;
	const guidRegEx = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
	return guidRegEx.exec(path);
};

export const returnEncodedQueryString = () => {
	return window.location.search.substr(1);
};
