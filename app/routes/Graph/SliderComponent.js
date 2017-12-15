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
      from: 0,
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
    const rightThumbMargin = Math.trunc(value[1] * (width/totalRange));
    const leftThumbMargin = Math.trunc(value[0] * (width/totalRange));
    // console.log(leftThumbMargin,'left..................');
    // const totalMilliSeconds = 24*60*60*
    // console.log(totalMilliSeconds,'llllllllll@@@@@@@@@@@@@@');
    // const tempDuration = moment.duration(totalMilliSeconds);
    // const from =`${tempDuration.hours()}: ${tempDuration.minutes()}`

    this.setState({ rightThumbMargin, leftThumbMargin })
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
      <View style={{marginHorizontal:50, height:10, marginTop:20}}>
        <View onLayout={this.onLayout}  style={{paddingTop:8}}>
        <MultiSlider
              values={[this.state.values[0], this.state.values[1]]}
              onValuesChange={this.multiSliderValuesChange}
              min={0}
              max={24}
              step={0.01}
              sliderLength={this.state.width}
              allowOverlap
            />
        </View>
        {this.state.leftThumbMargin !=0 &&
          <View style={{flex:1, height:144, position:'absolute', backgroundColor:'blue', width:1,marginLeft:this.state.leftThumbMargin, marginTop:10}}>
          </View>
        }
        {this.state.rightThumbMargin != 0 &&
          <View style={{flex:1, height:144, position:'absolute', backgroundColor:'blue', width:1,marginLeft:this.state.rightThumbMargin, marginTop:10}}>
          </View>
        }
      </View>
    )
  }
}

export default SliderComponent;
