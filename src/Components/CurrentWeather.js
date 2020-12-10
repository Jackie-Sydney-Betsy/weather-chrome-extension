/** @format */

import '../style/App.css';
import React, { Component } from 'react';
import WeatherHistory from './WeatherHistory';

class CurrentWeather extends Component {
	constructor(props) {
		super(props);
		this.calculateTemp = this.calculateTemp.bind(this);
	}

	async componentDidMount() {
		try {
			const api_call = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${this.props.location.lat}&lon=${this.props.location.lng}&APPID=${process.env.REACT_APP_api_weather}`
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
					`https://api.openweathermap.org/data/2.5/weather?q=${this.props.location.city}&APPID=${process.env.REACT_APP_api_weather}`
				);
				const data = await api_call.json();
				this.setState({ data });
			} else if (prevProps.location.lat !== this.props.location.lat) {
				//get their current weather based on lat/lng
				const api_call = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${this.props.location.lat}&lon=${this.props.location.lng}&APPID=${process.env.REACT_APP_api_weather}`
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
		console.log('current weather state: ', this.state);
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
							<div id='statsContainer'>
								<div id='statsItem'>
									Feels like:{' '}
									{this.calculateTemp(this.state.data.main.feels_like, 'F')} º
								</div>
								<div id='statsItem'>
									Humidity: {this.state.data.main.humidity} %
								</div>
								<div id='statsItem'>
									Low: {this.calculateTemp(this.state.data.main.temp_min, 'F')}{' '}
									º <br></br>
									High: {this.calculateTemp(
										this.state.data.main.temp_max,
										'F'
									)}{' '}
									º
								</div>
							</div>
						</>
					) : (
						'Loading...'
					)}
				</div>
				<div id='currentRight'>
					{this.state && this.state.data && (
						<WeatherHistory
							location={this.state}
							temp={Math.floor(
								((this.state.data.main.temp - 273) * 9) / 5 + 32
							)}
						/>
					)}
				</div>
			</>
		);
	}
}

export default CurrentWeather;
