import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ScrollUpArrow = ({ width, height, color }) => (
  <Svg
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M16.4443 16.8889L11.9999 12.4445L7.55545 16.8889M16.4443 11.5556L11.9999 7.11114L7.55545 11.5556"
      fill={color || "#FFFFFF"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ScrollUpArrow;
