import React from 'react';
import PanelSection from './PanelSection';

export default class SuperSection extends React.Component {
	constructor(props) {
		super(props);

		this.id = this.props.name.toLowerCase();
	}

	render() {
		return (
			<div id={this.id + "-section"} className="super-section">
				<div id={this.id + "-heading"} className="super-heading">{this.props.name}</div>

				<div id={this.id + "-section-content"} className="super-section-content">
					{Object.keys(this.props.data).map(key =>
						<PanelSection key={key} name={key} value={this.props.data[key]} />
					)}
				</div>
			</div>
		)
	}
}