/** @format */

import '../style/App.css';
import ChartAnimated from './ChartAnimated';

import React, { Component } from 'react';

const api_weatherHistory = '5c22c30e40de4f8787010138200712';

class WeatherHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			highs: [],
			lows: [],
			showChart: false,
		};
		this.getHistory = this.getHistory.bind(this);
	}
	//idea: possibly pay a service to demonstrate for one location how climate has changed over 50+ years?? or find climate change models that make predictions?

	async getHistory() {
		let highArr = [];
		let lowArr = [];

		try {
			//determine if we're using lat/long or city
			//if it's a city, check that it's one word
			//if it's 2 words, split it, join it with a +
			//if it's lat/lng, concat with a ,

			//get date from 10 yrs ago
			let day = new Date();
			let years = [];

			const makeYears = () => {
				for (let i = 1; i < 13; i++) {
					years.push(day.getFullYear() - i);
				}
			};
			makeYears();

			let [month, date] = day.toLocaleDateString('en-US').split('/');
			let dateString = `-${month}-${date}`;

			const requestUrl = `https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${
				this.props.location.city ? this.props.location.city : 'new+york'
			}&tp=24&format=json&key=${api_weatherHistory}`;

			years.forEach(async (year, index) => {
				let currentUrl = requestUrl + '&date=' + year + dateString;

				let data = await fetch(currentUrl).then(function (response) {
					return response.json();
				});

				let thisDate = data.data.weather[0].date.split('-');

				highArr.push({
					x: new Date(
						Number(thisDate[0]),
						Number(thisDate[1]) - 1,
						Number(thisDate[2])
					),
					y: data.data.weather[0].maxtempF - data.data.weather[0].mintempF,
				});

				lowArr.push({
					x: new Date(
						Number(thisDate[0]),
						Number(thisDate[1]) - 1,
						Number(thisDate[2])
					),
					y: Number(data.data.weather[0].mintempF),
				});
			});
		} catch (err) {
			console.log(err);
		}

		this.setState({ showChart: true, highs: highArr, lows: lowArr });
	}

	render() {
		return (
			<>
				<div className='weatherHistory'>
					<div id='heading'>
						<h2>Weather History</h2>
					</div>
					{this.state.showChart ? (
						<ChartAnimated highs={this.state.highs} lows={this.state.lows} />
					) : (
						''
					)}
					<button onClick={this.getHistory}>Get History</button>
				</div>
			</>
		);
	}
}

export default WeatherHistory;
