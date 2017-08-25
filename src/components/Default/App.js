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
import { agendaItems } from "../../config/mock";

class App extends Component {
	constructor(props) {
		super(props);

		const lang = detectSupportedLanguage();
		const isLTR = languageIsLeftToRight(lang);

		this.state = {
			activeTab: "qr",
			eventName: "",
			tabs: ["qr", "feedback", "agenda"],
			lang,
			isLTR,
			evalUrl: ""
		};
	}

	// Get Event Configuration
	componentDidMount() {
		const query = returnEncodedQueryString();
		axios
			.get(`Info?${query}`)
			.then(resp => {
				console.log(resp);
				const {
					Name,
					Agenda,
					EvaluationUrl,
					PkPassUrl,
					Attended,
					Feedback
				} = resp.data.Info;
				const tabs = this.getTabConfiguration(PkPassUrl, EvaluationUrl, Agenda);
				const activeTab = this.getActiveTab(tabs, Feedback, Attended);
				this.setState({
					eventName: Name,
					tabs,
					activeTab,
					evalUrl: EvaluationUrl
				});
			})
			.catch(err => {
				console.log("ERROR:");
				console.log(err);
			});
	}

	// Get First tab to display
	getActiveTab(tabs, feedback, attended) {
		// TODO: TAKE FEEDBACK PROP AND PARSE DATE TO USE TO DETERMINE IF FEEDBACK SHOULD BE MOVED TO #1
		// If not attended default to 1.) QR 2.) Agenda 3.) Feedback
		if (!attended) {
			if (tabs.indexOf("qr") > -1) {
				return "qr";
			} else if (tabs.indexOf("agenda") > -1) {
				return "agenda";
			} else if (tabs.indexOf("feedback") > -1) {
				return "feedback";
			}
		} else {
			// If attended default to 1.) Agenda 2.) Feedback
			if (tabs.indexOf("agenda") > -1) {
				return "agenda";
			} else if (tabs.indexOf("feedback") > -1) {
				return "feedback";
			}
		}
		// Backup Default
		return "qr";
	}

	// Get Tab Configuration
	getTabConfiguration(reg, feedback, agenda) {
		// TODO: HIDE PASS TAB if no reg?
		const tabs = ["qr"];
		if (feedback) {
			tabs.push("feedback");
		}
		if (agenda) {
			tabs.push("agenda");
		}
		return tabs;
	}

	// Change selected tab
	onTabSelect(tab) {
		this.setState({ activeTab: tab });
	}

	render() {
		return (
			<div className={["default-app", this.state.isLTR ? "" : "rtl"].join(" ")}>
				<Header
					eventTitle={this.state.eventName}
					activeTab={this.state.activeTab}
					onTabSelect={this.onTabSelect.bind(this)}
					tabs={this.state.tabs}
					lang={this.state.lang}
				/>
				<Content
					activeTab={this.state.activeTab}
					agendaItems={agendaItems}
					lang={this.state.lang}
					evalUrl={this.state.evalUrl}
				/>
			</div>
		);
	}
}

export default App;
