import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const ReportIcon = ({width, height}) => (
  <Svg
    width={width || 14}
    height={height || 15}
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#clip0_1066_15052)">
      <Path
        d="M7 12.7048C9.8995 12.7048 12.25 10.267 12.25 7.25988C12.25 4.25273 9.8995 1.81494 7 1.81494C4.10051 1.81494 1.75 4.25273 1.75 7.25988C1.75 10.267 4.10051 12.7048 7 12.7048Z"
        stroke="#E34F57"
        strokeWidth={1.12}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.5625 6.80664C6.67853 6.80664 6.78981 6.85445 6.87186 6.93954C6.95391 7.02463 7 7.14005 7 7.26039V9.52911C7 9.64945 7.04609 9.76486 7.12814 9.84996C7.21019 9.93505 7.32147 9.98286 7.4375 9.98286"
        stroke="#E34F57"
        strokeWidth={1.12}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.78125 5.44498C7.14369 5.44498 7.4375 5.14025 7.4375 4.76436C7.4375 4.38846 7.14369 4.08374 6.78125 4.08374C6.41881 4.08374 6.125 4.38846 6.125 4.76436C6.125 5.14025 6.41881 5.44498 6.78125 5.44498Z"
        fill="#E34F57"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1066_15052">
        <Rect width={14} height={14.5198} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ReportIcon;
