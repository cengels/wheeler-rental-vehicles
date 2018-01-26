import React from 'react';

function getStandardizedValue(value) {
	if (typeof value === 'boolean') {
		return value ? '✔' : '';
	}

	return value;
}

export default class Table extends React.Component {
	constructor(props) {
		super(props);
	}

	getRows() {
		return this.props.data.map((row, i) => {
			return (
				<tr key={i}>
					{Object.values(row).map((val, j) => {
						return i === 0 ? <th key={j}>{val}</th> : <td key={j}>{getStandardizedValue(val)}</td>;
					})}
				</tr>
			)
		});
	}

	render() {
		return (
			<table>
				<tbody>
					{this.getRows()}
				</tbody>
			</table>
		)
	}
}