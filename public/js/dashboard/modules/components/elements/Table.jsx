import React from 'react';

export default class Table extends React.Component {
	constructor(props) {
		super(props);
	}

	getHeaders() {
		return (
			<tr>
				{this.props.headers.map((key, i) => <th key={i}>{key}</th>)}
			</tr>
		)
	}

	getRows() {
		console.log(this.props.data);
		return this.props.data.map((obj, i) => <tr key={i}>
				{Object.values(obj).map((val, i) => <td key={i}>{val}</td>)}
			</tr>);
	}

	render() {
		return (
			<table>
				<tbody>
					{this.getHeaders()}
					{this.getRows()}
				</tbody>
			</table>
		)
	}
}