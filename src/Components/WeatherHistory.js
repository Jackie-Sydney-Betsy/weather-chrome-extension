/** @format */

import '../style/App.css';

import Chart from './Chart';
import ChartAnimated from './ChartAnimated';

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

			let years = [fiveAgo, tenAgo];
			let dateString = `-${month}-${date}`;
			console.log(this.props.location.city);
			const requestUrl = `https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${
				this.props.location.city ? this.props.location.city : 'new+york'
			}&tp=24&format=json&key=${api_weatherHistory}`;

			years.forEach(async (year, index) => {
				let currentUrl = requestUrl + '&date=' + year + dateString;
				console.log('currUrl', currentUrl);
				let data = await fetch(currentUrl).then(function (response) {
					return response.json();
				});
				console.log(data);
				//how to store this on state?
			});

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
				<ChartAnimated />
				<button onClick={this.getHistory}>Get History</button>
			</>
		);
	}
}

export default WeatherHistory;
