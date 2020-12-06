/** @format */

import '../style/App.css';
import React, { Component } from 'react';
// require('dotenv').config();

const api_news = 'ea82cee3b4344c309e5736689b7aef0e';

class Headlines extends Component {
	constructor() {
		super();
		this.getTopEnvironmentHeadlines = this.getTopEnvironmentHeadlines.bind(
			this
		);
	}

	async getTopEnvironmentHeadlines() {
		try {
			//get top environment news articles using NewsAPI
			const api_call = await fetch(
				`https://newsapi.org/v2/top-headlines?q=climate&apiKey=${api_news}`
			);
			let enviroNews = await api_call.json();
			this.setState({ enviroNews });
		} catch (err) {
			console.log(err);
			console.log('hi');
		}
	}

	render() {
		console.log(this.state);
		return (
			<>
				<div className="headlines">Headlines</div>
				<button onClick={this.getTopEnvironmentHeadlines}>
					Get Top Enviro News
				</button>
			</>
		);
	}
}

export default Headlines;
