/** @format */

import '../style/App.css';
import React, { Component } from 'react';

class WeatherHistory extends Component {
	//idea: possibly pay a service to demonstrate for one location how climate has changed over 50+ years?? or find climate change models that make predictions?

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
