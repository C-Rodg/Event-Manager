import React from "react";
import { languageStrings } from "../../config/defaultLanguageStrings";

const Header = ({ eventTitle, activeTab, onTabSelect, tabs, lang }) => {
	return (
		<div className="header">
			<div className="event-title">
				{eventTitle}
			</div>
			<div className="tabs">
				{tabs && tabs.indexOf("qr") > -1
					? <div
							className={
								"tab tab-qr " + (activeTab === "qr" ? "tab-active" : "")
							}
							onClick={() => onTabSelect("qr")}
						>
							<span className="tab-icon">
								<i className="material-icons">filter_center_focus</i>
							</span>
							<span className="tab-title">
								{languageStrings[lang].tabQR}
							</span>
						</div>
					: ""}
				{tabs && tabs.indexOf("agenda") > -1
					? <div
							className={
								"tab tab-agenda " + (activeTab === "agenda" ? "tab-active" : "")
							}
							onClick={() => onTabSelect("agenda")}
						>
							<span className="tab-icon">
								<i className="material-icons">event</i>
							</span>
							<span className="tab-title">
								{languageStrings[lang].tabAgenda}
							</span>
						</div>
					: ""}
				{tabs && tabs.indexOf("feedback") > -1
					? <div
							className={
								"tab tab-feedback " +
								(activeTab === "feedback" ? "tab-active" : "")
							}
							onClick={() => onTabSelect("feedback")}
						>
							<span className="tab-icon">
								<i className="material-icons">feedback</i>
							</span>
							<span className="tab-title">
								{languageStrings[lang].tabFeedback}
							</span>
						</div>
					: ""}
			</div>
		</div>
	);
};

export default Header;
