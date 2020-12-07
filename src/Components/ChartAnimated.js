import React from 'react';
import {VictoryChart, VictoryStack, VictoryArea, VictoryTheme} from 'victory'

class ChartAnimated extends React.Component {
  constructor(props) {
    super(props)
    this.state = { highs: [
      { x: new Date(2010, 12, 6), y: 36-32 },
      { x: new Date(2011, 12, 6), y: 61-55},
      { x: new Date(2012, 12, 6), y: 41-32 },
      { x: new Date(2013, 12, 6), y: 55-37 },
      { x: new Date(2014, 12, 6), y: 49-40 },
      { x: new Date(2015, 12, 6), y: 53-41 },
      { x: new Date(2016, 12, 6), y: 47-42 },
      { x: new Date(2017, 12, 6), y: 58-41 },
      { x: new Date(2018, 12, 6), y: 40-32 },
      {x: new Date(2019, 12, 6), y: 50-36 }
    ],
  lows: [
    { x: new Date(2010, 12, 6), y: 32 },
    { x: new Date(2011, 12, 6), y: 55 },
    { x: new Date(2012, 12, 6), y: 32 },
    { x: new Date(2013, 12, 6), y: 37 },
    { x: new Date(2014, 12, 6), y: 40 },
    { x: new Date(2015, 12, 6), y: 41 },
    { x: new Date(2016, 12, 6), y: 42 },
    { x: new Date(2017, 12, 6), y: 41 },
    { x: new Date(2018, 12, 6), y: 32 },
    { x: new Date(2019, 12, 6), y: 36 }
  ]};
  }

  render() {
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        animate={{ duration: 1000 }}
        scale={{x: "time"}}
        domain={{y: [0, 100]}}
      >
        <VictoryStack
          colorScale={"blue"}
        >
              <VictoryArea
                data={this.state.lows}
                interpolation={"natural"}
              />
              <VictoryArea
                data={this.state.highs}
                interpolation={"natural"}
              />
        </VictoryStack>
      </VictoryChart>
    );
  }
}

export default ChartAnimated
