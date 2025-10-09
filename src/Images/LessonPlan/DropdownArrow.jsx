import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DropdownArrow = ({ width, height, color }) => (
  <Svg
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color || "#000000"}
  >
    <Path
      d="M6 9L12 15L18 9"
      stroke={color || "#FFFFFF"}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default DropdownArrow;
