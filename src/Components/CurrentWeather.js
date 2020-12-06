/** @format */

import '../style/App.css';
import React, { Component } from 'react';

// require('dotenv').config();

const api_weather = 'e707b58c89718134c069cbb85065ffc4';

class CurrentWeather extends Component {
	constructor(props) {
		super(props);

		this.getWeather = this.getWeather.bind(this);
		this.calculateTemp = this.calculateTemp.bind(this);
	}

	async getWeather() {
		try {
			//get their current weather data
			const api_call = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${this.props.lat}&lon=${this.props.lng}&APPID=${api_weather}`
			);

			const data = await api_call.json();

			this.setState({ data });
		} catch (err) {
			//need better error handling if the api key fails
			console.log(err);
		}
	}

	//temp conversion from kelvin
	calculateTemp(degreesK, displayUnits) {
		if (displayUnits === 'C') return Math.floor(degreesK - 273);
		else return Math.floor(((degreesK - 273) * 9) / 5 + 32);
	}

	render() {
		return (
			<>
				<div className="currentWeather">Current Weathers</div>

				<p>2.</p>
				<button onClick={this.getWeather}>Get Weather</button>

				{this.state && this.state.data ? (
					<>
						<p>The weather in {this.state.data.name} is:</p>
						<p>{this.calculateTemp(this.state.data.main.temp, 'F')} degrees</p>
					</>
				) : (
					''
				)}
			</>
		);
	}
}

export default CurrentWeather;
