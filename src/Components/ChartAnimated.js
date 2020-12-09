import React from 'react';
import { VictoryChart, VictoryStack, VictoryArea, VictoryTheme } from 'victory';

class ChartAnimated extends React.Component {
	constructor(props) {
		super(props);
		this.state = { highs: this.props.highs, lows: this.props.lows };
	}

	render() {
		console.log('STATE', this.state.lows, this.state.highs);
		return (
			<svg viewBox='100 100 100 100'>
				<VictoryChart
					id='chart'
					theme={VictoryTheme.material}
					animate={{ duration: 2000 }}
					scale={{ x: 'time' }}
					domain={{
						x: [new Date(2008, 11, 1), new Date(2020, 0, 1)],
						y: [0, 100],
					}}
				>
					<VictoryStack colorScale={'blue'}>
						<VictoryArea data={this.state.lows} interpolation={'natural'} />
						<VictoryArea data={this.state.highs} interpolation={'natural'} />
					</VictoryStack>
				</VictoryChart>
			</svg>
		);
	}
}

export default ChartAnimated;
