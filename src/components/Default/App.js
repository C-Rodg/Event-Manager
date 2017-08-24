import React, { Component } from "react";

import Header from "./Header";
import Content from "./Content";

// TESTING
import { config } from "../../config/config";
import { eventName, agendaItems } from "../../config/mock";

class App extends Component {
	constructor(props) {
		super(props);

		const lang = detectSupportedLanguage();
		const isLTR = languageIsLeftToRight(lang);

		this.state = {
			activeTab: "qr",
			tabs: config.tabs,
			lang,
			isLTR
		};
	}

	// Change selected tab
	onTabSelect(tab) {
		this.setState({ activeTab: tab });
	}

	render() {
		return (
			<div className={["default-app", this.state.isLTR ? "" : "rtl"].join(" ")}>
				<Header
					eventTitle={eventName}
					activeTab={this.state.activeTab}
					onTabSelect={this.onTabSelect.bind(this)}
					tabs={this.state.tabs}
					lang={this.state.lang}
				/>
				<Content
					activeTab={this.state.activeTab}
					agendaItems={agendaItems}
					lang={this.state.lang}
				/>
			</div>
		);
	}
}

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
