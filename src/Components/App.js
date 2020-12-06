import '../style/App.css';
import CurrentWeather from './CurrentWeather';
import WeatherHistory from './WeatherHistory';
import Headlines from './Headlines';

function App() {
	return (
		<div className='App'>
			<CurrentWeather />
			<WeatherHistory />
			<Headlines />
		</div>
	);
}

export default App;
