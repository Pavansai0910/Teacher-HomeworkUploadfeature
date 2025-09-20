import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";
const CircleTick = ({width, height}) => (
  <Svg
    width={width || 15}
    height={height || 15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect
      x={0.5}
      y={0.5}
      width={14}
      height={14}
      rx={1.5}
      fill="#1D5AD5"
      stroke="#4473D3"
    />
    <G clipPath="url(#clip0_2855_11416)">
      <Path
        d="M5.78125 7.84375L6.8125 8.875L9.21875 6.46875"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 11.625C9.77817 11.625 11.625 9.77817 11.625 7.5C11.625 5.22183 9.77817 3.375 7.5 3.375C5.22183 3.375 3.375 5.22183 3.375 7.5C3.375 9.77817 5.22183 11.625 7.5 11.625Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2855_11416">
        <Rect width={11} height={11} fill="white" transform="translate(2 2)" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CircleTick;
