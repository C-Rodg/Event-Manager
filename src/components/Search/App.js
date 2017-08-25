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
				console.log("ERROR");
				console.log(err);
			});
	}

	render() {
		return (
			<div className={["search-app", this.state.isLTR ? "" : "rtl"].join(" ")}>
				<Header eventTitle={this.state.eventTitle} />
				<Content lang={this.state.lang} />
			</div>
		);
	}
}

export default App;
