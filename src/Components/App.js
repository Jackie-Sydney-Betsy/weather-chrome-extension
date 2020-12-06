/** @format */

import '../style/App.css';
import CurrentWeather from './CurrentWeather';
import WeatherHistory from './WeatherHistory';
import Headlines from './Headlines';
import React, { Component } from 'react';

class App extends Component {
	constructor() {
		super();
		this.state = {
			//dummy data, coordinates for LIC
			lat: 40.72683,
			lng: -73.943512,
		};
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

	render() {
		return (
			<div className="App">
				<button onClick={this.findMe}>Find Me</button>
				<CurrentWeather lat={this.state.lat} lng={this.state.lng} />
				<WeatherHistory />
				<Headlines />
			</div>
		);
	}
}

export default App;
