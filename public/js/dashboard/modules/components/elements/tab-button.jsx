import React from 'react';

export default class TabButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.callback(this.props.id);
	}

	render() {
		return (
			<button
				id={this.props.id}
				className={"tab" + (this.props.currentTab === this.props.id ? " active" : "")}
				onClick={this.handleClick}
			>
				<i
					className={"fa " + this.props.icon}
					aria-hidden="true"
				/>
				{this.props.label}
			</button>
		)
	}
}