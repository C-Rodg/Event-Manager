import React, { Component } from "react";
import axios from "axios";

import {
	detectSupportedLanguage,
	languageIsLeftToRight,
	returnEncodedQueryString
} from "../../helpers";
import Header from "./Header";
import Content from "./Content";

class App extends Component {
	constructor(props) {
		super(props);
		const lang = detectSupportedLanguage();
		const isLTR = languageIsLeftToRight(lang);
		this.state = {
			eventTitle: "",
			lang,
			isLTR,
			quickContactEnabled: true
		};
	}

	componentDidMount() {
		const query = returnEncodedQueryString();
		axios
			.get(`Info?${query}`)
			.then(resp => {
				console.log(resp);
				const { Name, EnableContactQuickCode } = resp.data.Info;
				this.setState({
					eventName: Name,
					quickContactEnabled: EnableContactQuickCode
				});
			})
			.catch(err => {
				console.log("ERROR");
				console.log(err);
			});
	}

	render() {
		return (
			<div className={["search-app", this.state.isLTR ? "" : "rtl"].join(" ")}>
				<Header eventTitle={this.state.eventTitle} />
				<Content
					lang={this.state.lang}
					quickContactEnabled={this.state.quickContactEnabled}
				/>
			</div>
		);
	}
}

export default App;
