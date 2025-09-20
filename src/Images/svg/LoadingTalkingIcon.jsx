import * as React from "react";
import Svg, { Rect } from "react-native-svg";
const LoadingTalkingIcon = ({size}) => (
  <Svg
    width={size || 96}
    height={size || 96}
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect width={96} height={96} rx={48} fill="#5189FC" fillOpacity={0.8} />
    <Rect x={18} y={34} width={12} height={28} rx={6} fill="white" />
    <Rect x={34} y={34} width={12} height={28} rx={6} fill="white" />
    <Rect x={50} y={34} width={12} height={28} rx={6} fill="white" />
    <Rect x={66} y={34} width={12} height={28} rx={6} fill="white" />
  </Svg>
);
export default LoadingTalkingIcon;
