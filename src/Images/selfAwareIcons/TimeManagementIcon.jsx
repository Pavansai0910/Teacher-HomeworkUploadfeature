import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const TimeManagementIcon = (props) => (
  <Svg
    width={68}
    height={68}
    viewBox="0 0 68 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_3779_12393)">
      <Path
        d="M34 59.5C46.9097 59.5 57.375 49.0347 57.375 36.125C57.375 23.2153 46.9097 12.75 34 12.75C21.0903 12.75 10.625 23.2153 10.625 36.125C10.625 49.0347 21.0903 59.5 34 59.5Z"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.875 8.5L6.375 17"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M53.125 8.5L61.625 17"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M34 21.25V36.125H48.875"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3779_12393">
        <Rect width={68} height={68} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default TimeManagementIcon;
