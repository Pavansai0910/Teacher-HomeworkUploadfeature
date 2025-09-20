import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SubscriptionIcon = ({size}) => (
  <Svg
    width={size || 32}
    height={size || 29}
    viewBox="0 0 32 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#clip0_4079_679)" filter="url(#filter0_d_4079_679)">
      <Path
        d="M6.25 9H25.75L16 3L6.25 9Z"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.25 9V16.5"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.75 9V16.5"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.25 9V16.5"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.75 9V16.5"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 16.5H25"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.5 19.5H26.5"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4079_679">
        <Rect width={24} height={24} fill="white" transform="translate(4)" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SubscriptionIcon;
