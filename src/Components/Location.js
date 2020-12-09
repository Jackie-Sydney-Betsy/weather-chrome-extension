import React from 'react';

class Location extends React.Component {
	constructor() {
		super();
		this.state = {
			cityInput: '',
			city: '',
		};
	}
	render() {
		return (
			<div>
				<button onClick={this.props.findMe}>Find Me</button>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<label htmlFor='cityInput'>
						<small>City</small>
					</label>
					<input
						name='cityInput'
						type='text'
						value={this.props.location.cityInput}
						onChange={(e) => this.props.handleChange(e)}
						required
					/>
					<button type='submit'>Submit</button>
				</form>
			</div>
		);
	}
}

export default Location;
