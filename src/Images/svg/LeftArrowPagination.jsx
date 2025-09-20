import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#33569F"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-arrow-left-icon lucide-arrow-left"
    {...props}
  >
    <Path d="m12 19-7-7 7-7" />
    <Path d="M19 12H5" />
  </Svg>
);
export default SVGComponent;
