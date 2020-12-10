/** @format */

import '../style/App.css';
import CurrentWeather from './CurrentWeather';
import Headlines from './Headlines';
import React, { Component } from 'react';

class App extends Component {
	constructor() {
		super();
		this.state = {
			//dummy data, coordinates for Times Sq
			lat: 40.758896,
			lng: -73.98513,
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
						<h2>☀️ ☔ ☁️ Weather Watcher ❄️ ⚡ 🌀</h2>
					</div>
					<div className='currentContainer'>
						<CurrentWeather
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
							findMe={this.findMe}
							location={this.state}
						/>
					</div>
					<hr />
					<div id='form'>
						<form onSubmit={this.handleSubmit}>
							<div id='inputBox'>
								<input
									placeholder='Enter city!'
									name='cityInput'
									type='text'
									value={this.state.cityInput}
									onChange={this.handleChange}
									required
								/>
							</div>
							<button type='submit'>ENTER</button>
						</form>
						<div id='findMe'>
							<div> Or click Find Me! </div>
							<button id='findMe' onClick={this.findMe}>
								FIND ME
							</button>
						</div>
					</div>
				</div>

				<hr />
				<Headlines />
			</div>
		);
	}
}

export default App;
