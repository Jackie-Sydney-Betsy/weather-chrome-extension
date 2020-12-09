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
			<div className='App'>
				<div className='currentWeather'>
					<div id='heading'>
						<h2>
							{`Current Weather`}
							{/* {this.state && this.state.data.name
								? this.state.data.name
								: `Long Island City`} */}
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
									{/* <label htmlFor='cityInput'>
										<small>City</small>
									</label> */}
									<p> Enter city! </p>
									<input
										name='cityInput'
										type='text'
										value={this.state.cityInput}
										onChange={this.handleChange}
										required
									/>
									<button type='submit'>ENTER</button>
								</form>
							</div>
							<div>
								<p> Or click Find Me! </p>
								<button id='findMe' onClick={this.findMe}>
									FIND ME
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
