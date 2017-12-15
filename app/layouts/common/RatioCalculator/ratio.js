import {
  Dimensions
} from 'react-native';

// Device Dimensions calculation
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Iphone breakPoints;
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : (x == 414) ? 1.10 : 1 ;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1 ;

// Calculate  size based on ratio
export function getSize(size) {
  return ratioX * size;;
}
