import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const AlertCircleIcon = ({width, height}) => (
  <Svg
    width={width || 12}
    height={height || 12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#clip0_4056_17417)">
      <Path
        d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
        stroke="#696969"
        strokeWidth={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 4V6"
        stroke="#696969"
        strokeWidth={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 8H6.00607"
        stroke="#696969"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4056_17417">
        <Rect width={12} height={12} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default AlertCircleIcon;
