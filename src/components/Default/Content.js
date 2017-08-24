import React from "react";
import Agenda from "./Agenda";
import { languageStrings } from "../../config/defaultLanguageStrings";

// TESTING
import { secrets } from "../../config/secrets";

const Content = ({ activeTab, agendaItems, lang }) => {
	return (
		<div className="content">
			{renderContent(lang, activeTab, agendaItems)}
		</div>
	);
};

const renderContent = (lang, tab, agenda) => {
	if (tab === "feedback") {
		return (
			<div className="content-feedback">
				<iframe src={secrets.evalUrl} frameBorder="no" />
			</div>
		);
	} else if (tab === "agenda") {
		return (
			<div className="content-agenda">
				{agenda && agenda.length > 0
					? renderAgenda(agenda)
					: <div className="no-agenda card">
							<div className="card-content">
								{languageStrings[lang].noAgendaText}
							</div>
						</div>}
			</div>
		);
	} else {
		return (
			<div className="content-qr">
				<div className="card">
					<div className="card-content">
						<div className="qr-image">
							<img src={secrets.qrCodeUrl} />
						</div>
						<div className="qr-text">
							{languageStrings[lang].qrText}
						</div>
						<div className="qr-footer">
							<a href={secrets.qrAddToWallet}>
								<i className="material-icons">get_app</i>
								{languageStrings[lang].walletButton}
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

const renderAgenda = agenda => {
	console.log(agenda);
	return <Agenda agenda={agenda} />;
};

export default Content;
