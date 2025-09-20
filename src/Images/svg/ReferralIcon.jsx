import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const ReferralIcon = ({size}) => (
  <Svg
    width={size || 22}
    height={size || 22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#clip0_4077_13465)">
      <Path
        d="M11 19.25C11 19.25 2.0625 14.4375 2.0625 8.76562C2.0625 7.53485 2.55142 6.35449 3.42171 5.48421C4.29199 4.61392 5.47235 4.125 6.70312 4.125C8.64445 4.125 10.3073 5.18289 11 6.875C11.6927 5.18289 13.3555 4.125 15.2969 4.125C16.5276 4.125 17.708 4.61392 18.5783 5.48421C19.4486 6.35449 19.9375 7.53485 19.9375 8.76562C19.9375 14.4375 11 19.25 11 19.25Z"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4077_13465">
        <Rect width={22} height={22} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ReferralIcon;
