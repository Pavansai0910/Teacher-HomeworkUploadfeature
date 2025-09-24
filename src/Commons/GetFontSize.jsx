import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const maxScaleFactor = 1.2; 

function GetFontSize(size) {
  const scale = width / guidelineBaseWidth;
  const newSize = size * Math.min(scale, maxScaleFactor);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export default GetFontSize;