import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const maxScaleFactor = 1.2; // A safe maximum for scaling fonts

function GetFontSize(size) {
  const scale = width / guidelineBaseWidth;
  // Cap the scale to prevent oversized fonts on tablets
  const newSize = size * Math.min(scale, maxScaleFactor);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export default GetFontSize;