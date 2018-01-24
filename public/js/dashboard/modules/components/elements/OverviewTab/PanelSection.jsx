import React from 'react';

function getWordsFromKey(key) {
	return key.split(/(?=[A-Z])/);
}

function getHtmlIdFromWords(words) {
	return words.join('-').toLowerCase();
}

function getHeadingFromWords(words) {
	return words.join(' ').toUpperCase();
}

export default class PanelSection extends React.Component {
	constructor(props) {
		super(props);

		const words = getWordsFromKey(this.props.name);
		this.htmlId = getHtmlIdFromWords(words);
		this.heading = getHeadingFromWords(words);
	}

	render() {
		return (
			<div id={this.htmlId + '-section'} className="content-section">
				<div id={this.htmlId + '-heading'} className="section-heading">{this.heading}</div>
				<div id={this.htmlId + '-content'} className="section-content">
					{this.props.value}
				</div>
			</div>
		)
	}
}