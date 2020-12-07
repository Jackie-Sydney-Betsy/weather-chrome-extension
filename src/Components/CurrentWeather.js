/** @format */

import '../style/App.css';
import React, { Component } from 'react';

// require('dotenv').config();

const api_weather = 'e707b58c89718134c069cbb85065ffc4';
//might not need this second one but haven;t tested bc too lazy lol
const api_weather2 = 'e9446f061bceb277c12cd5a91fe25e16';

class CurrentWeather extends Component {
	constructor(props) {
		super(props);
		this.getWeather = this.getWeather.bind(this);
		this.calculateTemp = this.calculateTemp.bind(this);
	}

	async getWeather() {
		try {
			//if the user input a city/state
			if (this.props.location.city.length) {
				const api_call = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${this.props.location.city}&APPID=${api_weather2}`
				);
				const data = await api_call.json();
				this.setState({ data });
			} else {
				//get their current weather based on lat/lng
				const api_call = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${this.props.location.lat}&lon=${this.props.location.lng}&APPID=${api_weather}`
				);
				const data = await api_call.json();
				this.setState({ data });
			}
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
