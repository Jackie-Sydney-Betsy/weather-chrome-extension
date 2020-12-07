import React from 'react';
import {VictoryChart, VictoryStack, VictoryArea, Area, VictoryVoronoiContainer} from 'victory'


const CustomArea = props => {
  if (!props.active) {
    return <Area {...props} />;
  } else {
    const { data, activeX, scale, style } = props;
    const index = data.findIndex(val => val._x.getTime() === activeX.getTime());
    const previousPoint = index === 0 ? activeX : data[index - 1]._x;
    const nextPoint = index === data.length - 1 ? activeX : data[index + 1]._x;
    // create a copy of the x dimension scale, and set the range to [0, 100] to easily calculate a percentage for the gradient offsets
    const percentScale = scale.x.copy().range([0, 100]);
    // calculate the percentages for current, previous, and next points
    const currentPercent = percentScale(activeX);
    const previousPercent = percentScale(previousPoint);
    const nextPercent = percentScale(nextPoint);
    const minPercent = currentPercent - (currentPercent - previousPercent) / 2;
    const maxPercent = currentPercent + (nextPercent - currentPercent) / 2;

    const gradientId = Math.random();
    const isBrowser =
      typeof window !== "undefined" && window.__STATIC_GENERATOR !== true;
    const loc = isBrowser ? window.location.href : "";
    const newStyle = Object.assign({}, style, {
      fill: `url(${loc}#${gradientId})`,
      stroke: "none"
    });

    return (
      <g>
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="0%" stopColor={style.fill} />
            <stop offset={`${minPercent}%`} stopColor={style.fill} />
            <stop offset={`${minPercent}%`} stopColor={"tomato"} />
            <stop offset={`${maxPercent}%`} stopColor={"tomato"} />
            <stop offset={`${maxPercent}%`} stopColor={style.fill} />
            <stop offset="100%" stopColor={style.fill} />
          </linearGradient>
        </defs>
        <Area {...props} style={newStyle} />
      </g>
    );
  }
};

class Chart extends React.Component {
  constructor() {
    super();
    this.state = {
      activeX: null
    };
    this.setActiveX = this.onActivated.bind(this);
  }

  onActivated(points, props) {
    this.setState({ activeX: points[0]._x });
  }

  render() {
    return (
      <VictoryChart
        height={400}
        width={400}
        scale={{ x: "time" }}
        domain={{y: [0, 100]}}
        containerComponent={
          <VictoryVoronoiContainer onActivated={this.setActiveX} />
        }
      >
        <VictoryStack colorScale="blue">
        <VictoryArea
          data={[
            { x: new Date(2015, 12, 6), y: 41 },
            { x: new Date(2016, 12, 6), y: 42 },
            { x: new Date(2017, 12, 6), y: 41 },
            { x: new Date(2018, 12, 6), y: 32 },
            {x: new Date(2019, 12, 6), y: 36 }
          ]}
          dataComponent={<CustomArea activeX={this.state.activeX} />}
        />
          <VictoryArea
            data={[
              { x: new Date(2015, 12, 6), y: 53-41 },
              { x: new Date(2016, 12, 6), y: 47-42 },
              { x: new Date(2017, 12, 6), y: 58-41 },
              { x: new Date(2018, 12, 6), y: 40-32 },
              {x: new Date(2019, 12, 6), y: 50-36 }
            ]}
            dataComponent={<CustomArea activeX={this.state.activeX} />}
          />

        </VictoryStack>
      </VictoryChart>
    );
  }
}


export default Chart;
