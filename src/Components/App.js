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
			city: '',
			// state: '',
		};
		this.findMe = this.findMe.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	async findMe() {
		try {
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

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(e) {
		let city = this.state.cityInput;
		// let state = this.state.stateInput;
		e.preventDefault();
		this.setState({
			cityInput: '',
			// stateInput: '',
			city: city,
			// state: state,
		});
	}

	render() {
		return (
			<div className="App">
				<button onClick={this.findMe}>Find Me</button>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="cityInput">
						<small>City</small>
					</label>
					<input
						name="cityInput"
						type="text"
						value={this.state.cityInput}
						onChange={this.handleChange}
						required
					/>
					{/* <label htmlFor="stateInput">
						<small>State</small>
					</label>
					{/* make this a state dropdown */}
					{/* <input
						name="stateInput"
						type="text"
						value={this.state.stateInput}
						onChange={this.handleChange}
						required
					/> */}{' '}
					<button type="submit">Submit</button>
				</form>
				<CurrentWeather location={this.state} />
				<WeatherHistory location={this.state} />
				<Headlines />
			</div>
		);
	}
}

export default App;
