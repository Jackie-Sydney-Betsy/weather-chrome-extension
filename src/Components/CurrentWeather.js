/** @format */

import '../style/App.css';
import React, { Component } from 'react';

// require('dotenv').config();

const api_weather = 'e707b58c89718134c069cbb85065ffc4';

class CurrentWeather extends Component {
	constructor() {
		super();
		this.state = {
			//dummy data, coordinates for LIC
			lat: 40.72683,
			lng: -73.943512,
		};
		this.getWeather = this.getWeather.bind(this);
		this.calculateTemp = this.calculateTemp.bind(this);
		this.findMe = this.findMe.bind(this);
	}

	async findMe() {
		try {
			//find the user's location
			navigator.geolocation.getCurrentPosition(async (position) => {
				this.setState({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
			//should probably include something if the geolocation is not successful
		} catch (err) {
			console.log(err);
		}
	}

	async getWeather() {
		try {
			//get their current weather data
			const api_call = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&APPID=${api_weather}`
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
				<div className='currentWeather'>Current Weathers</div>

				<p>1.</p>
				<button onClick={this.findMe}>Find Me</button>
				{/* probs also want a way for users to type location into a form */}

				<p>2.</p>
				<button onClick={this.getWeather}>Get Weather</button>

				{this.state.data ? (
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
