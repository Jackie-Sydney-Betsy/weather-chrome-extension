/** @format */

import '../style/App.css';
import React, { Component } from 'react';

// require('dotenv').config();

const api_weather = 'e707b58c89718134c069cbb85065ffc4';
//might not need this second one but haven;t tested bc too lazy lol
const api_weather2 = 'e9446f061bceb277c12cd5a91fe25e16';
const api_weather3 = 'e85282415ad04fe926b501b1b9888316';

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
				<div className="currentWeather">
					<h1>
						Current Weather in
						{this.state && this.state.data.name
							? this.state.data.name
							: `Long Island City`}
					</h1>

					{this.state && this.state.data.name ? (
						<>
							<p>The weather in {this.state.data.name} is:</p>
							<p>
								{this.calculateTemp(this.state.data.main.temp, 'F')} degrees
							</p>
						</>
					) : (
						'Loading'
					)}
				</div>
			</>
		);
	}
}

export default CurrentWeather;
