import React, { Component } from "react";

import { languageStrings } from "../../config/searchLanguageStrings";

class Content extends Component {
	constructor() {
		super();

		this.state = {
			searchTerm: "",
			error: false,
			showManual: false,
			manualEntry: {
				first: "",
				last: "",
				company: "",
				title: "",
				email: "",
				phone: ""
			}
		};

		this.updateFormValues = this.updateFormValues.bind(this);
	}

	// Search for registrant
	onFormSubmit(ev) {
		ev.preventDefault();
		console.log("Searching for... " + this.state.searchTerm);

		if (!this.state.searchTerm) {
			this.setState({ error: true });
		} else {
			this.setState({ error: false });
			window.location.href = "default.html";
		}
	}

	// Submit QR code details to create new QR Code
	onCreateQrSubmit(ev) {
		ev.preventDefault();
		console.log("Creating QR code for...", this.state.manualEntry);
	}

	// Update QR Code form values
	updateFormValues(field, val) {
		const newForm = Object.assign({}, this.state.manualEntry, {
			[field]: val
		});
		this.setState({ manualEntry: newForm });
		window.location.href = "default.html";
	}

	// Render Quick Contact section
	renderQuickContact() {
		// Return nothing if disabled
		if (!this.props.quickContactEnabled) {
			return "";
		}

		const { lang } = this.props;

		// Display Create button
		if (!this.state.showManual) {
			return (
				<div className="more-info">
					<div>
						<div className="more-info-title">
							{languageStrings[lang].notYetRegistered}
						</div>
						<div className="more-info-sub">
							{languageStrings[lang].registerInstructions}
						</div>
					</div>

					<button
						className="create-quickreg"
						onClick={() =>
							this.setState({
								showManual: true,
								error: false,
								searchTerm: ""
							})}
					>
						{languageStrings[lang].createQR}
					</button>
				</div>
			);
		}

		// Return Form
		return (
			<form
				className="quickreg-form"
				onSubmit={this.onCreateQrSubmit.bind(this)}
			>
				<button
					className="create-quickreg"
					onClick={() => this.setState({ showManual: false })}
				>
					{languageStrings[lang].returnToSearch}
				</button>
				<div className="form-instruct">
					{languageStrings[lang].pleaseComplete}
				</div>
				<div className="form-group">
					<i className="material-icons form-icon">account_box</i>
					<input
						type="text"
						className="form-input"
						placeholder={languageStrings[lang].firstName}
						value={this.state.manualEntry.first}
						onChange={val => this.updateFormValues("first", val.target.value)}
					/>
				</div>
				<div className="form-group">
					<i className="material-icons form-icon">account_box</i>
					<input
						type="text"
						className="form-input"
						placeholder={languageStrings[lang].lastName}
						value={this.state.manualEntry.last}
						onChange={val => this.updateFormValues("last", val.target.value)}
					/>
				</div>
				<div className="form-group">
					<i className="material-icons form-icon">assignment</i>
					<input
						type="text"
						className="form-input"
						placeholder={languageStrings[lang].company}
						value={this.state.manualEntry.company}
						onChange={val => this.updateFormValues("company", val.target.value)}
					/>
				</div>
				<div className="form-group">
					<i className="material-icons form-icon">description</i>
					<input
						type="text"
						className="form-input"
						placeholder={languageStrings[lang].title}
						value={this.state.manualEntry.title}
						onChange={val => this.updateFormValues("title", val.target.value)}
					/>
				</div>
				<div className="form-group">
					<i className="material-icons form-icon">email</i>
					<input
						type="email"
						className="form-input"
						placeholder={languageStrings[lang].email}
						value={this.state.manualEntry.email}
						onChange={val => this.updateFormValues("email", val.target.value)}
					/>
				</div>
				<div className="form-group">
					<i className="material-icons form-icon">phone</i>
					<input
						type="tel"
						className="form-input"
						placeholder={languageStrings[lang].phone}
						value={this.state.manualEntry.phone}
						onChange={val => this.updateFormValues("phone", val.target.value)}
					/>
				</div>
				<button type="submit" className="btn-submit-quickreg">
					{languageStrings[lang].createQR}
				</button>
			</form>
		);
	}

	render() {
		const { lang } = this.props;
		return (
			<div className="content">
				<div className="search-container">
					{!this.state.showManual
						? <div className="top-box">
								<div className="search-welcome">
									{languageStrings[lang].welcome}
								</div>
								<div className="search-title">
									{languageStrings[lang].enterEmail}
								</div>
								{this.state.error
									? <div className="error-msg">
											{languageStrings[lang].issueSearching}
										</div>
									: ""}

								<form
									className="search-box"
									onSubmit={this.onFormSubmit.bind(this)}
								>
									<button type="submit" className="search-icon-btn" />
									<i className="material-icons search-icon">search</i>
									<input
										type="text"
										placeholder={languageStrings[lang].search}
										className="search-input"
										autoFocus
										value={this.state.searchTerm}
										onChange={val =>
											this.setState({ searchTerm: val.target.value })}
									/>
								</form>
							</div>
						: ""}

					{this.renderQuickContact()}
				</div>
			</div>
		);
	}
}

export default Content;
