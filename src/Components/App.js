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
			lat: 40.72683,
			lng: -73.943512,
			city: '',
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
		e.preventDefault();
		this.setState({
			cityInput: '',
			city: city,
		});
	}

	render() {
		return (
			<div className='App'>
				<div className='currentWeather'>
					<div id='heading'>
						<h2>
							{`Current Weather`}
						</h2>
					</div>

					<div className='currentContainer'>
						<CurrentWeather
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
							findMe={this.findMe}
							location={this.state}
						/>
						<div className='currentRight'>
							<div id='form'>
								<form onSubmit={this.handleSubmit}>
									<label htmlFor='cityInput'>
										<small>City</small>
									</label>
									<input
										name='cityInput'
										type='text'
										value={this.state.cityInput}
										onChange={this.handleChange}
										required
									/>
									<button type='submit'>Submit</button>
								</form>
							</div>
							<div>
								<button id='findMe' onClick={this.findMe}>
									Find Me
								</button>
							</div>
						</div>
					</div>
				</div>
				<hr />
				<WeatherHistory location={this.state} />
				<hr />
				<Headlines />
			</div>
		);
	}
}

export default App;
