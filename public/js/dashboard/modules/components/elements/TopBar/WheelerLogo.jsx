import React from 'react';

export default class WheelerLogo extends React.Component {
	render() {
		return (
			<div id="page-logo">
				<a href="/dashboard">
					<img id="wheeler-logo" src="/public/images/wheeler-logo.png"/>
					<div id="wheeler-label">Wheeler</div>
				</a>
			</div>
		)
	}
}