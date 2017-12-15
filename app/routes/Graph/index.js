import React, {
  Component,
} from 'react';
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'

import SliderComponent from './SliderComponent';

import {
  View,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window')


const Data = [{
  time: 1,
  status: 4
},
{
  time: 4,
  status: 3
},
{
  time: 24,
  status: 4
},
{
  time: 15,
  status: 4
},
{
  time: 21,
  status: 4
}
]
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Text as Tct,
    Defs,
    Stop
} from 'react-native-svg';

class Axis extends Component {
  constructor(props){
    super(props);
    this.getTickPoints = this.getTickPoints.bind(this);
  }

  getTickPoints (vertical, start, end, numTicks) {
    let res = []
    let ticksEvery = Math.floor(this.props.width / (numTicks - 1))
    if (vertical) {
      for (let cur = start; cur >= end; cur -= ticksEvery) res.push(cur)
    } else {
      for (let cur = start; cur <= end; cur += ticksEvery) res.push(cur)
    }
    return res
  }
  render() {
    let { width, ticks, x, y, startVal, endVal, vertical } = this.props
    console.log(width, ticks,x,y,startVal,endVal, vertical);
    const TICKSIZE = width / 150
    x = x || 0
    y = y || 0
    let endX = vertical ? x : x + width
    let endY = vertical ? y - width : y
    let scale = this.props.scale
    if (!scale) {
      scale = typeof startVal === 'number' ? d3scale.scaleLinear() : d3scale.scaleTime()
      scale.domain(vertical ? [y, endY] : [x, endX]).range([startVal, endVal])
    }
    let tickPoints = vertical ? this.getTickPoints(vertical, y, endY, ticks)
      : this.getTickPoints(vertical, x, endX, ticks)
      console.log(tickPoints, 'tick points..');
    return (
      <G fill='none'>
            <Line
              stroke='#000'
              strokeWidth='3'
              x1={x}
              x2={endX}
              y1={y}
              y2={endY} />
            {tickPoints.map(
               pos => <Line
                        key={pos}
                        stroke='#000'
                        strokeWidth='3'
                        x1={pos}
                        y1={y}
                        x2={pos}
                y2={y + TICKSIZE} />
             )}
            {tickPoints.map((pos, i) => {
               return (<Tct
                        key={i}
                        fill='#000'
                        stroke='green'
                        fontSize='8'
                        textAnchor='middle'
                        x={vertical ? x - 6 * TICKSIZE : pos}
                        y={vertical ? pos-10 : y + 2 * TICKSIZE}>

                        {i}
                      </Tct>)
             })}
        </G>
    )
  }
}
class GraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculating: true,
      dimensions: undefined
    }
    this.padding = 50;
    this.createScales = this.createScales.bind(this);
    this.renderAxis = this.renderAxis.bind(this);
    this.slider = this.slider.bind(this);
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout(event) {
    if (this.state.dimensions) return // layout was already called
    console.log(event.nativeEvent.layout, 'layout...........................');
    let {width, height} = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

  slider(e) {
    console.log(e.nativeEvent);
  }

  createScales(dataPoints, width, height, padding) {
    let xScale = d3scale.scaleLinear()
    .domain([padding, width - padding])
    .range([0, 24]);
    let yScale = d3scale.scaleLinear().domain([height - padding, padding]).range([0, 4]);
    return {xScale, yScale}
  }

  renderAxis() {
    let xScale;
    let yScale;
    let width;
    let height;
    let lineGenerator;
    let data;
    if (this.state.dimensions) {
      width = this.state.dimensions.width;
      height = this.state.dimensions.height;
      xScale = this.createScales(Data, width, height, this.padding).xScale;
      yScale = this.createScales(Data, width, height, this.padding).yScale;
      lineGenerator = d3shape.line().curve(d3shape.curveStep)
        .x(d => {
          return xScale.invert(d.time)
        })
        .y(d => yScale.invert(d.status))
      data = lineGenerator(Data);
    }
    return (
      <View style={{flex: 1,alignItems:'center'}}>
      <View style={{width: window.width, height:200}} onLayout={this.onLayout} >

        {this.state.dimensions ?
          <Svg width={width} height={height}>
          <Axis
            width={width - 2 * this.padding}
            x={this.padding}
            y={height - this.padding}
            ticks={24}
            startVal={0}
            endVal={24}
            scale={xScale} />
            <Axis
            width={height - 2 * 50}
            x={this.padding}
            y={height - this.padding}
            ticks={4}
            startVal={0}
            endVal={4}
            scale={yScale}
            vertical={true} />
                      <Path
                                fill='none'
                                stroke="red"
                                strokeWidth='2'
                                d={data}
                                onPressIn={(e) => this.slider(e)}
                                />
             </Svg>: null
        }
      </View>
      {/*<Svg width={width} height={height}>
      <Axis
        width={width - 2 * this.padding}
        x={this.padding}
        y={height - 50}
        ticks={24}
        startVal={0}
        endVal={24}
        scale={xScale} />
        <Axis
        width={height - 2 * 50}
        x={this.padding}
        y={height - 50}
        ticks={4}
        startVal={0}
        endVal={4}
        scale={yScale}
        vertical={true} />
                  <Path
                            fill='none'
                            stroke="red"
                            strokeWidth='5'
                            d={data}
                            onPressIn={(e) => this.slider(e)}
                            />
         </Svg>*/}
      </View>
    )
  }

  render() {
    return(
      <View style={{flex:1}}>
      <SliderComponent/>

          {this.renderAxis()}
      </View>
    )
  }
}

export default GraphComponent;
