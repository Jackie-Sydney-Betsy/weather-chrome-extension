/** @format */

import '../style/App.css';
import React, { Component } from 'react';

const api_weatherHistory = '5c22c30e40de4f8787010138200712';

class WeatherHistory extends Component {
	constructor(props) {
		super(props);
	}
	//idea: possibly pay a service to demonstrate for one location how climate has changed over 50+ years?? or find climate change models that make predictions?

	async componentDidMount() {
		try {
			//determine if we're using lat/long or city
			//if it's a city, check that it's one word
			//if it's 2 words, split it, join it with a +
			//if it's lat/lng, concat with a ,
			//get today's date from 2008

			const data = await fetch(
				`https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${this.props.location.city}&tp=24&format=json&key=${api_weatherHistory}&date=2008-12-25`
			);
			//can also repeat this call for multiple dates???

			this.setState({ data });
		} catch (err) {
			console.log(err);
		}
	}

	// https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=new+york&tp=24&format=json&key=ourApiKey&date=2008-12-25

	render() {
		return (
			<>
				<div className="weatherHistory">Weather History</div>
			</>
		);
	}
}

export default WeatherHistory;
