import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const ExamDistraction = (props) => (
  <Svg
    width={68}
    height={68}
    viewBox="0 0 68 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_3779_12353)">
      <Path
        d="M34 59.5C48.0833 59.5 59.5 48.0833 59.5 34C59.5 19.9167 48.0833 8.5 34 8.5C19.9167 8.5 8.5 19.9167 8.5 34C8.5 48.0833 19.9167 59.5 34 59.5Z"
        stroke="white"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <Path
        d="M48.875 25.5L40.375 34"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M48.875 34L40.375 25.5"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27.625 25.5L19.125 34"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27.625 34L19.125 25.5"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M34 51C35.7604 51 37.1875 49.5729 37.1875 47.8125C37.1875 46.0521 35.7604 44.625 34 44.625C32.2396 44.625 30.8125 46.0521 30.8125 47.8125C30.8125 49.5729 32.2396 51 34 51Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3779_12353">
        <Rect width={68} height={68} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ExamDistraction;
