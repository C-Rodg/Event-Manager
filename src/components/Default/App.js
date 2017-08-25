import React, { Component } from "react";
import axios from "axios";

import Header from "./Header";
import Content from "./Content";
import {
	detectSupportedLanguage,
	languageIsLeftToRight,
	returnEncodedQueryString
} from "../../helpers";

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

	componentDidMount() {
		const query = returnEncodedQueryString();
		axios
			.get(`Info?${query}`)
			.then(resp => {
				console.log(resp);
			})
			.catch(err => {
				console.log("ERROR:");
				console.log(err);
			});
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

export default App;
