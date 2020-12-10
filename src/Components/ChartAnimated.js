import React from 'react';
import { VictoryChart, VictoryStack, VictoryArea,
	VictoryTheme, VictoryAxis, VictoryLine } from 'victory';

class ChartAnimated extends React.Component {
	constructor(props) {
		super(props);
		this.state = { highs: this.props.highs, lows: this.props.lows };
	}

	componentDidUpdate (prevProps) {
		if (this.props.highs[0] !== prevProps.highs[0]) {
			this.setState({highs: this.props.highs, lows: this.props.lows})
		}
	}

	render() {
		return (

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
					<VictoryAxis
					style={{
			 grid: { stroke: "white"},
			 tickLabels: { fontSize: 8, fill: "white" },

	 }}/>
        <VictoryAxis dependentAxis
				style={{
		 grid: { stroke: "white"},
		 tickLabels: { fontSize: 8, fill: "white" },

 }}/>
				</VictoryChart>

		);
	}
}

export default ChartAnimated;
