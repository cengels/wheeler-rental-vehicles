import React from 'react';

export default class Input extends React.Component {
	constructor(props) {
		super(props);

		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	render() {
		return (
			<input id={this.props.id} name={this.props.id} type={this.props.type} value={this.state.value}
				   placeholder={this.props.placeholder} onChange={this.handleChange} />
		)
	}
}