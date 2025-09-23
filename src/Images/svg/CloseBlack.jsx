import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CloseBlack = ({width, height}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24 || width}
    height={24 || height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#333333"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-x-icon lucide-x"
  >
    <Path d="M18 6 6 18" />
    <Path d="m6 6 12 12" />
  </Svg>
);
export default CloseBlack;
