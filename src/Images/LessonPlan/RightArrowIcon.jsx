import * as React from "react";
import Svg, { Path } from "react-native-svg";
const RightArrowIcon = ({ width, height, color }) => (
  <Svg
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M9 18L15 12L9 6"
      stroke={color || "#FFFFFF"}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default RightArrowIcon;
