import React, { Component } from 'react';
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  Button,
  Dimensions,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  Linking
} from 'react-native';

const { width } = Dimensions.get('window');
let window = Dimensions.get("window");

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


const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec" ];

class Axis extends Component {
  constructor(props){
    super(props);
    this.state = {
      secondPointer: 1
    }
    this.getTickPoints = this.getTickPoints.bind(this);
    this.renderAxisPoint = this.renderAxisPoint.bind(this);
    this.renderXAxisPoint = this.renderXAxisPoint.bind(this);
    this.secondPointer = 1;
  }

  renderAxisPoint(i) {
    if (i === 1) {
      return 'SL';
    }
    if (i === 2) {
      return 'D';
    }
    if (i === 3) {
      return 'OFF';
    }
    if (i === 4) {
      return 'ON';
    }
  }

  renderXAxisPoint(i) {
    let pointer;
    if (i == 0) {
      pointer = 'M';
    } else if (i == 12) {
      pointer = 'N';
    }  else if (i > 12) {
      if (i == 24) {
        pointer = 'M';
      } else {
        pointer = i-12;

      }

    }
    else {
      pointer = i
    }
    return pointer;
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
                        stroke='#000'
                        fontSize='8'
                        textAnchor='middle'
                        x={vertical ? x - 14 * TICKSIZE : pos}
                        y={vertical ? pos-10 : y + 2 * TICKSIZE}>

                        {vertical ? this.renderAxisPoint(i): this.renderXAxisPoint(i)}
                      </Tct>)
             })}
        </G>
    )
  }
}

export default class GraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculating: true,
      dimensions: undefined,
      startTime:'',
      endTime: ''
    }
    this.padding = 46;
    this.createScales = this.createScales.bind(this);
    this.renderAxis = this.renderAxis.bind(this);
    this.slider = this.slider.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.editLog = this.editLog.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
  }

  editLog(startTime, endTime) {
    this.setState({startTime, endTime})
  }

  clickEdit() {
    const {navigate, state} = this.props.navigationValue;
    navigate('AddEvent',{day:state.params.day,startTime: this.state.startTime, endTime: this.state.endTime})
  }

  onLayout(event) {
    if (this.state.dimensions) return // layout was already called
    let {width, height} = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

  slider(e) {
    console.log(e.nativeEvent);
  }

  createScales(dataPoints, width, height, padding) {
    let xScale = d3scale.scaleLinear()
    .domain([padding, width - padding])
    .range([0, 24])
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
    console.log(this.props.data, 'props data.................................................');
    if (this.state.dimensions) {
      width = this.state.dimensions.width;
      height = this.state.dimensions.height;
      xScale = this.createScales(this.props.data, width, height, this.padding).xScale;
      yScale = this.createScales(this.props.data, width, height, this.padding).yScale;
      lineGenerator = d3shape.line().curve(d3shape.curveStep)
        .x(d => xScale.invert(d.time))
        .y(d => yScale.invert(d.status))
      data = lineGenerator(this.props.data);
    }
    return (
      <View style={{flex: 1,alignItems:'center'}}>
      <View style={{width: window.width, height:200,paddingLeft:14}} onLayout={this.onLayout} >
        {this.state.startTime && this.state.endTime ?
          <TouchableHighlight style={{backgroundColor:'white', borderWidth:4, padding:4, width:40}} onPress={() => this.clickEdit()}><Text>Edit</Text></TouchableHighlight>:
          null
        }
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
            ticks={5}
            startVal={0}
            endVal={4}
            scale={yScale}
            vertical={true} />
                      <Path
                                fill='none'
                                stroke="#9eb068"
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
      <View style={{flex:1, backgroundColor:'white'}}>
      {/*<SliderComponent editLog={this.editLog}/>*/}

          {this.renderAxis()}
      </View>
    )
  }
}
