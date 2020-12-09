/** @format */

import '../style/App.css';
import React, { Component } from 'react';
import Location from './Location';
import WeatherHistory from './WeatherHistory'

// require('dotenv').config();

const api_weather = 'e707b58c89718134c069cbb85065ffc4';
//might not need this second one but haven;t tested bc too lazy lol
const api_weather2 = 'e9446f061bceb277c12cd5a91fe25e16';
const api_weather3 = 'e85282415ad04fe926b501b1b9888316';
let colorClass = '';

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
			//console.log('weather data: ', this.state.data);
		} catch (err) {
			//need better error handling if the api key fails
			console.log(err);
		}
	}

	//temp conversion from kelvin
	calculateTemp(degreesK, displayUnits) {
		let degrees;
		if (displayUnits === 'C') {
			degrees = Math.floor(degreesK - 273);
		} else {
			degrees = Math.floor(((degreesK - 273) * 9) / 5 + 32);
		}
		return degrees;
	}

	render() {
		this.state ? console.log(this.state) : console.log('');
		return (
			<>
				<div className='currentLeft '>
					{this.state && this.state.data.name ? (
						<>
							<div id='temp'>
								<div>
									<div>{this.state.data.name}</div>
								</div>
								<div id='degrees-icon'>
									<img
										id='icon'
										src={`http://openweathermap.org/img/wn/${this.state.data.weather[0].icon}@2x.png`}
									/>
									<div id='degrees'>
										{this.calculateTemp(this.state.data.main.temp, 'F')} º
										<small>{this.state.data.weather[0].description}</small>
									</div>
								</div>
							</div>
						</>
					) : (
						'Loading...'
					)}
				</div>
				{this.state && this.state.data && <WeatherHistory location={this.state} temp={Math.floor(((this.state.data.main.temp - 273) * 9) / 5 + 32)}/>}
			</>
		);
	}
}

export default CurrentWeather;
