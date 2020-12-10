/** @format */

import '../style/App.css';
import ChartAnimated from './ChartAnimated';

import React, { Component } from 'react';

class WeatherHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			highs: [],
			lows: [],
			showChart: false,
			average: 0,
		};
		this.getHistory = this.getHistory.bind(this);
	}
	//idea: possibly pay a service to demonstrate for one location how climate has changed over 50+ years?? or find climate change models that make predictions?

	getHistory() {
		this.setState({ average: 0 });
		let highArr = [];
		let lowArr = [];
		let sum = 0;
		let total = 0;

		try {
			let day = new Date();
			let years = [];

			// push years since 2008 into an array
			const makeYears = () => {
				for (let i = 1; i < 13; i++) {
					years.push(day.getFullYear() - i);
				}
			};
			makeYears();

			let [month, date] = day.toLocaleDateString('en-US').split('/');
			let dateString = `-${month}-${date}`;

			const requestUrl = `https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${
				this.props.location.data.name
					? this.props.location.data.name.split(' ').join('+')
					: `${this.props.location.data.coord.lat},${this.props.location.data.coord.lng}`
			}&tp=24&format=json&key=${process.env.REACT_APP_api_weatherHistory}`;

			// make API requests for each year since 2008
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
				sum +=
					Number(data.data.weather[0].maxtempF) +
					Number(data.data.weather[0].mintempF);
				total += 2;
				this.setState({ average: sum / total });
			});
		} catch (err) {
			console.log(err);
		}

		this.setState({ showChart: true, highs: highArr, lows: lowArr });
	}

	componentDidMount() {
		this.getHistory();
	}

	componentDidUpdate(prevProps) {
		if (this.props.temp !== prevProps.temp) {
			this.getHistory();
		}
	}

	render() {
		return (
			<>
				<div className='weatherHistory'>
					{this.state.showChart ? (
						<ChartAnimated highs={this.state.highs} lows={this.state.lows} />
					) : (
						''
					)}
					{this.state.average > 0 && this.state.average < this.props.temp && (
						<div id='historicalStats'>
							Today is{' '}
							{(
								((this.props.temp - this.state.average) / this.state.average) *
								100
							).toFixed(2)}
							% warmer <br />
							than the average temperature ({this.state.average.toFixed(
								2
							)}) <br />
							on this day since 2008.
						</div>
					)}
				</div>
			</>
		);
	}
}

export default WeatherHistory;
