import React, { Component } from 'react';
import Slider from 'react-native-slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import moment from 'moment';

import {
  View,
  Text,
  Dimensions
} from 'react-native';

const {
  height,
  width
} = Dimensions.get('window')

class SliderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [
        4,5
      ],
      height: 0,
      width: 0,
      rightThumbMargin: 0,
      leftThumbMargin: 0,
      totalMin: 0,
      from: 0,
      rightTotalMin: 0,
      to: 0
    }
    // this.valuesChangeStart = this.valuesChangeStart.bind(this);
    this.multiSliderValuesChange = this.multiSliderValuesChange.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.calculateDimensions = this.calculateDimensions.bind(this);
  }

  calculateDimensions(value) {
    const  { width } = this.state;
    const totalRange = 24;
    console.log(value[0],'value..........................................');
    const rightThumbMargin = Math.trunc(value[1] * (width/totalRange));
    const leftThumbMargin = Math.trunc(value[0] * (width/totalRange));
    const leftT = (1440/260)*leftThumbMargin;
    const leftTotalMin = moment.utc().startOf('day').add(leftT, 'minutes').format('hh:mm A');
    const rightT = (1440/260)*rightThumbMargin;
    const rightTotalMin = moment.utc().startOf('day').add(rightT, 'minutes').format('hh:mm A');
    // console.log(leftThumbMargin,'left..................');
    // const totalMilliSeconds = 24*60*60*
    // console.log(totalMilliSeconds,'llllllllll@@@@@@@@@@@@@@');
    // const tempDuration = moment.duration(totalMilliSeconds);
    // const from =`${tempDuration.hours()}: ${tempDuration.minutes()}`
    this.props.editLog(leftT,rightT);
    this.setState({ rightThumbMargin, leftThumbMargin,rightTotalMin ,leftTotalMin})
  }

  onLayout(e) {
    const {height, width} = e.nativeEvent.layout;
    this.setState({height, width});
  }

  multiSliderValuesChange(values) {
    console.log('on value change', values);
    this.setState({
      values
    });
    this.calculateDimensions(values);
  }

  // valuesChange(values) {
  //   this.setState({values: [...values]})
  // }
  // valuesChangeStart(values) {
  //   if (values) {
  //     this.setState({values: [...values]})
  //   } else {
  //     this.setState({values: [0,0]})
  //   }
  // }
  onValuesChangeFinish(values) {
    this.setState({values: [...values]})
  }
  render() {
    return (
      <View style={{marginHorizontal:50, height:10, marginTop:0}}>
        <View onLayout={this.onLayout}  style={{paddingTop:10}}>

        <MultiSlider
              values={[this.state.values[0], this.state.values[1]]}
              onValuesChange={this.multiSliderValuesChange.bind(this)}
              min={0}
              max={24}
              step={0.01}
              sliderLength={this.state.width}
              allowOverlap
              snapped
            />

        </View>
        {this.state.leftThumbMargin !=0 &&
          <View style={{height:150, position:'absolute', backgroundColor:'#516a66', width:1,marginLeft:this.state.leftThumbMargin, marginTop:10}}>
          </View>
        }
        {this.state.rightThumbMargin != 0 &&
          <View style={{height:150, position:'absolute', backgroundColor:'#516a66', width:1,marginLeft:this.state.rightThumbMargin, marginTop:10}}>
          </View>
        }
      </View>
    )
  }
}

export default SliderComponent;
