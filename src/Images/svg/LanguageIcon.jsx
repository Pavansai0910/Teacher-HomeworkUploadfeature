import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const LanguageIcon = ({size}) => (
  <Svg
    width={size || 22}
    height={size || 22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#clip0_4077_13422)">
      <Path
        d="M11 19.25C15.5563 19.25 19.25 15.5563 19.25 11C19.25 6.44365 15.5563 2.75 11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 15.5563 6.44365 19.25 11 19.25Z"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.4375 11C14.4375 16.5 11 19.25 11 19.25C11 19.25 7.5625 16.5 7.5625 11C7.5625 5.5 11 2.75 11 2.75C11 2.75 14.4375 5.5 14.4375 11Z"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.21875 8.25H18.7803"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.21875 13.75H18.7803"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4077_13422">
        <Rect width={22} height={22} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default LanguageIcon;
