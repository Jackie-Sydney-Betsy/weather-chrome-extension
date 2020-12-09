/** @format */

import '../style/App.css';
import React, { Component } from 'react';
import Location from './Location';
const api_weather = 'e707b58c89718134c069cbb85065ffc4';
const api_weather2 = 'e9446f061bceb277c12cd5a91fe25e16';

class CurrentWeather extends Component {
	constructor(props) {
		super(props);
		this.calculateTemp = this.calculateTemp.bind(this);
	}

	async componentDidMount() {
		try {
			const api_call = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${this.props.location.lat}&lon=${this.props.location.lng}&APPID=${api_weather}`
			);
			const data = await api_call.json();
			this.setState({ data });
		} catch (err) {
			console.log(err);
		}
	}

	//component did update
	async componentDidUpdate(prevProps) {
		try {
			//if the user clicks find me or enters a city name
			if (prevProps.location.city !== this.props.location.city) {
				const api_call = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${this.props.location.city}&APPID=${api_weather2}`
				);
				const data = await api_call.json();
				this.setState({ data });
			} else if (prevProps.location.lat !== this.props.location.lat) {
				//get their current weather based on lat/lng
				const api_call = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${this.props.location.lat}&lon=${this.props.location.lng}&APPID=${api_weather}`
				);
				const data = await api_call.json();
				this.setState({ data });
			}
			console.log('weather data: ', this.state.data);
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
				<div className="currentLeft">
					{this.state && this.state.data.name ? (
						<>
							<div id="temp">
								<div>
									<p>{this.state.data.name}</p>
									<p>{this.calculateTemp(this.state.data.main.temp, 'F')} º</p>
								</div>
								<img
									id="icon"
									src="https://img.icons8.com/carbon-copy/100/000000/fog-night.png"
									alt="No Image"
								/>
							</div>
						</>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</>
		);
	}
}

export default CurrentWeather;
