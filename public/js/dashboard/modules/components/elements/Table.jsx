import React from 'react';
import { applyThousandSeparator } from '../../format-helpers';

function getStandardizedValue(value) {
	if (typeof value === 'boolean') {
		return value ? '✔' : '';
	}

	if (typeof value === 'number') {
		return applyThousandSeparator(value);
	}

	return value;
}

export default class Table extends React.Component {
	constructor(props) {
		super(props);
	}

	getRows() {
		return this.props.data.map((row, rowIndex) => {
			return (
				<tr key={rowIndex}>
					{Object.values(row).map((val, columnIndex) => {
						return rowIndex === 0
							? <th key={columnIndex}>{val}</th>
							: <td key={columnIndex}>{getStandardizedValue(val)}</td>;
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