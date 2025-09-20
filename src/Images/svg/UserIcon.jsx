import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const UserIcon = ({size}) => (
  <Svg
    width={size || 19}
    height={size || 19}
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#clip0_4077_13412)">
      <Path
        d="M9.5 11.875C12.1234 11.875 14.25 9.74835 14.25 7.125C14.25 4.50165 12.1234 2.375 9.5 2.375C6.87665 2.375 4.75 4.50165 4.75 7.125C4.75 9.74835 6.87665 11.875 9.5 11.875Z"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.375 16.0312C3.81262 13.5471 6.42363 11.875 9.5 11.875C12.5764 11.875 15.1874 13.5471 16.625 16.0312"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4077_13412">
        <Rect width={19} height={19} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default UserIcon;
