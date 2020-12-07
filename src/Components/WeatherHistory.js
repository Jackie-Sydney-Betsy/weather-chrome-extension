/** @format */

import '../style/App.css';
import React, { Component } from 'react';

const api_weatherHistory = '5c22c30e40de4f8787010138200712';

class WeatherHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hi: 'hi',
		};
		this.getHistory = this.getHistory.bind(this);
	}
	//idea: possibly pay a service to demonstrate for one location how climate has changed over 50+ years?? or find climate change models that make predictions?

	async getHistory() {
		try {
			//determine if we're using lat/long or city
			//if it's a city, check that it's one word
			//if it's 2 words, split it, join it with a +
			//if it's lat/lng, concat with a ,

			//get date from 10 yrs ago
			let day = new Date();
			let tenAgo = day.getFullYear() - 10;
			let fiveAgo = day.getFullYear() - 5;
			day.setFullYear(tenAgo);
			let [month, date, year] = day.toLocaleDateString('en-US').split('/');
			// let dateTenPrev = `${year}-${month}-${date}`;

			let years = [fiveAgo, tenAgo];
			let results = [];
			let dateString = `-${month}-${date}`;

			const requestUrl = `https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${this.props.location.city}&tp=24&format=json&key=${api_weatherHistory}`;

			years.forEach((year, index) => {
				let currentUrl = requestUrl + '&date=' + year + dateString;

				fetch(currentUrl, function (error, response, body) {
					if (!error && response.statusCode === 200) {
						let result = JSON.parse(body);
						results[index] = result.data.weather[0];
					} else {
						console.log(error, response);
					}
				});
			});

			//not working rn
			console.log(results);

	

			// this.setState({ data });
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		console.log('state', this.state, 'props', this.props);
		return (
			<>
				<div className="weatherHistory">Weather History</div>
				<button onClick={this.getHistory}>Get History</button>
			</>
		);
	}
}

export default WeatherHistory;
